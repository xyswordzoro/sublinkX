package tpl

import (
	"os"
	"strings"
	"testing"
)

const testTplName = "e2e-unit-tpl.yaml"

var testTplBody = `# 单元测试模板注释（应被保留）
mixed-port: 7890

proxy-groups:
  - name: 测试组
    type: select
    proxies:
      - DIRECT
      - 自动选择
    hidden: true # 未识别字段，应被保留

rules:
  - DOMAIN,normal.example,DIRECT
  - MATCH,测试组
`

func TestParseSaveRoundTrip(t *testing.T) {
	path, err := SafeFilePath(testTplName)
	if err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(path, []byte(testTplBody), 0666); err != nil {
		t.Fatal(err)
	}
	defer os.Remove(path)

	// 1. 解析
	res, err := ParseFile(testTplName)
	if err != nil {
		t.Fatal(err)
	}
	if !res.IsYaml || len(res.Groups) != 1 || len(res.Rules) != 2 {
		t.Fatalf("解析结果异常: isYaml=%v groups=%d rules=%d", res.IsYaml, len(res.Groups), len(res.Rules))
	}
	if v, ok := res.Groups[0].Extra["hidden"].(bool); !ok || !v {
		t.Fatal("未识别字段 hidden 丢失")
	}

	// 2. 顶部插入规则后回写
	newRules := append([]string{"DOMAIN-SUFFIX,e2e-test.example,DIRECT"}, res.Rules...)
	if err := SaveStruct(testTplName, res.Groups, newRules, res.Providers, "测试"); err != nil {
		t.Fatal(err)
	}

	// 3. 验证：注释保留、新规则在最上面、MATCH 仍在末尾、extra 保留
	raw, _ := os.ReadFile(path)
	text := string(raw)
	if !strings.Contains(text, "# 单元测试模板注释（应被保留）") {
		t.Fatal("注释丢失")
	}
	if !strings.Contains(text, "hidden: true") {
		t.Fatal("未识别字段丢失")
	}
	if strings.Contains(text, `\U`) || strings.Contains(text, `\u`) || strings.Contains(text, `\x`) {
		t.Fatal("非 ASCII 字符被转义，应保持字面 UTF-8")
	}
	if !strings.Contains(text, "测试组") {
		t.Fatal("中文策略组名丢失")
	}
	res2, err := ParseFile(testTplName)
	if err != nil {
		t.Fatal(err)
	}
	if res2.Rules[0] != "DOMAIN-SUFFIX,e2e-test.example,DIRECT" {
		t.Fatalf("新规则不在顶部: %v", res2.Rules)
	}
	if res2.Rules[len(res2.Rules)-1] != "MATCH,测试组" {
		t.Fatalf("MATCH 不在末尾: %v", res2.Rules)
	}

	// 4. 目标组不存在的规则应被拒绝
	bad := append([]string{"DOMAIN,bad.example,不存在的组"}, res2.Rules...)
	if err := SaveStruct(testTplName, res2.Groups, bad, res2.Providers, "测试"); err == nil {
		t.Fatal("无效目标规则未被拒绝")
	}

	// 5. 删除规则回写
	if err := SaveStruct(testTplName, res2.Groups, res2.Rules[1:], res2.Providers, "测试"); err != nil {
		t.Fatal(err)
	}
	res3, _ := ParseFile(testTplName)
	if len(res3.Rules) != 2 || res3.Rules[0] != "DOMAIN,normal.example,DIRECT" {
		t.Fatalf("删除后规则异常: %v", res3.Rules)
	}
}
