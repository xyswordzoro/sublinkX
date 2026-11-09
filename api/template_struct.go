package api

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"sort"
	"strings"

	"sublink/models"

	"github.com/gin-gonic/gin"
	"gopkg.in/yaml.v3"
)

// TplGroup 模板策略组的可编辑结构
type TplGroup struct {
	Name          string                 `json:"name"`
	Type          string                 `json:"type"`
	Proxies       []string               `json:"proxies"`
	Icon          string                 `json:"icon"`
	Filter        string                 `json:"filter"`
	ExcludeFilter string                 `json:"excludeFilter"`
	IncludeAll    bool                   `json:"includeAll"`
	URL           string                 `json:"url"`
	Interval      int                    `json:"interval"`
	Tolerance     int                    `json:"tolerance"`
	Extra         map[string]interface{} `json:"extra"` // 未识别的其它字段，原样保留
}

// TplProvider 规则集定义（rule-providers 条目）
type TplProvider struct {
	Name     string                 `json:"name"`
	Type     string                 `json:"type"`
	Behavior string                 `json:"behavior"`
	URL      string                 `json:"url"`
	Format   string                 `json:"format"`
	Path     string                 `json:"path"`
	Interval int                    `json:"interval"`
	Extra    map[string]interface{} `json:"extra"`
}

// TplStruct 解析结果
type TplStruct struct {
	File      string        `json:"file"`
	IsYaml    bool          `json:"isYaml"`
	Groups    []TplGroup    `json:"groups"`
	Rules     []string      `json:"rules"`
	Providers []TplProvider `json:"providers"`
	Issues    []string      `json:"issues"`
	Raw       string        `json:"raw"`
	HasPM     bool          `json:"hasProxyGroups"` // 是否为 mihomo 结构
	Snippet   string        `json:"snippet,omitempty"`
}

func strOf(v interface{}) string {
	if s, ok := v.(string); ok {
		return s
	}
	return ""
}

func intOf(v interface{}) int {
	switch t := v.(type) {
	case int:
		return t
	case int64:
		return int(t)
	case float64:
		return int(t)
	case string:
		var n int
		fmt.Sscanf(t, "%d", &n)
		return n
	}
	return 0
}

func strsOf(v interface{}) []string {
	var out []string
	switch t := v.(type) {
	case []interface{}:
		for _, it := range t {
			if s, ok := it.(string); ok {
				out = append(out, s)
			}
		}
	case []string:
		out = append(out, t...)
	}
	return out
}

// parseYamlStruct 把模板 YAML 解析为可编辑结构
func parseYamlStruct(file string, data []byte) (TplStruct, error) {
	res := TplStruct{File: file, Raw: string(data)}
	var root map[string]interface{}
	if err := yaml.Unmarshal(data, &root); err != nil {
		return res, err
	}
	res.IsYaml = true

	known := map[string]bool{
		"name": true, "type": true, "proxies": true, "icon": true,
		"filter": true, "exclude-filter": true, "include-all": true,
		"url": true, "interval": true, "tolerance": true,
	}

	if pg, ok := root["proxy-groups"].([]interface{}); ok {
		res.HasPM = true
		for _, item := range pg {
			m, ok := item.(map[string]interface{})
			if !ok {
				continue
			}
			g := TplGroup{
				Name:          strOf(m["name"]),
				Type:          strOf(m["type"]),
				Proxies:       strsOf(m["proxies"]),
				Icon:          strOf(m["icon"]),
				Filter:        strOf(m["filter"]),
				ExcludeFilter: strOf(m["exclude-filter"]),
				IncludeAll:    m["include-all"] == true,
				URL:           strOf(m["url"]),
				Interval:      intOf(m["interval"]),
				Tolerance:     intOf(m["tolerance"]),
				Extra:         map[string]interface{}{},
			}
			for k, v := range m {
				if !known[k] {
					g.Extra[k] = v
				}
			}
			res.Groups = append(res.Groups, g)
		}
	}

	if rl, ok := root["rules"].([]interface{}); ok {
		for _, it := range rl {
			if s, ok := it.(string); ok {
				res.Rules = append(res.Rules, s)
			}
		}
	}

	// rule-providers：按名称排序输出，便于前端稳定展示
	if rp, ok := root["rule-providers"].(map[string]interface{}); ok {
		names := make([]string, 0, len(rp))
		for k := range rp {
			names = append(names, k)
		}
		sort.Strings(names)
		knownP := map[string]bool{
			"type": true, "behavior": true, "url": true,
			"format": true, "path": true, "interval": true,
		}
		for _, name := range names {
			m, ok := rp[name].(map[string]interface{})
			if !ok {
				continue
			}
			pv := TplProvider{
				Name:     name,
				Type:     strOf(m["type"]),
				Behavior: strOf(m["behavior"]),
				URL:      strOf(m["url"]),
				Format:   strOf(m["format"]),
				Path:     strOf(m["path"]),
				Interval: intOf(m["interval"]),
				Extra:    map[string]interface{}{},
			}
			for k, v := range m {
				if !knownP[k] {
					pv.Extra[k] = v
				}
			}
			res.Providers = append(res.Providers, pv)
		}
	}

	res.Issues = validateTpl(&res)
	return res, nil
}

// validateTpl 结构校验：重名组、规则目标缺失
func validateTpl(s *TplStruct) []string {
	var issues []string
	seen := map[string]int{}
	for _, g := range s.Groups {
		if g.Name == "" {
			issues = append(issues, "存在未命名的策略组")
			continue
		}
		seen[g.Name]++
		if seen[g.Name] > 1 {
			issues = append(issues, fmt.Sprintf("策略组重名：%s", g.Name))
		}
	}
	names := map[string]bool{"DIRECT": true, "REJECT": true, "REJECT-DROP": true, "PASS": true, "COMPATIBLE": true}
	for _, g := range s.Groups {
		names[g.Name] = true
	}
	for i, r := range s.Rules {
		parts := strings.Split(r, ",")
		if len(parts) < 2 {
			issues = append(issues, fmt.Sprintf("第 %d 条规则格式异常：%s", i+1, r))
			continue
		}
		kind := strings.ToUpper(strings.TrimSpace(parts[0]))
		if kind == "MATCH" {
			if !names[strings.TrimSpace(parts[len(parts)-1])] {
				issues = append(issues, fmt.Sprintf("第 %d 条 MATCH 目标不存在：%s", i+1, parts[len(parts)-1]))
			}
			continue
		}
		target := strings.TrimSpace(parts[len(parts)-1])
		if target == "no-resolve" && len(parts) >= 3 {
			target = strings.TrimSpace(parts[len(parts)-2])
		}
		if !names[target] {
			issues = append(issues, fmt.Sprintf("第 %d 条规则目标组不存在：%s", i+1, target))
		}
	}
	return issues
}

// TplParse GET /api/v1/template/parse?file=xxx
func TplParse(c *gin.Context) {
	name := c.Query("file")
	path, err := safeFilePath(name)
	if err != nil {
		c.JSON(400, gin.H{"code": "00001", "msg": err.Error()})
		return
	}
	data, err := os.ReadFile(path)
	if err != nil {
		c.JSON(404, gin.H{"code": "00001", "msg": "模板不存在"})
		return
	}
	res, perr := parseYamlStruct(name, data)
	if perr != nil {
		// 非 YAML（如 surge.conf）或语法错误：只返回原文
		c.JSON(200, gin.H{
			"code": "00000",
			"data": gin.H{
				"file": name, "isYaml": false, "raw": string(data),
				"groups": []TplGroup{}, "rules": []string{}, "providers": []TplProvider{},
				"issues": []string{"该模板不是可解析的 mihomo YAML，仅支持原始文本编辑"},
			},
			"msg": "ok",
		})
		return
	}
	c.JSON(200, gin.H{"code": "00000", "data": res, "msg": "ok"})
}

// ---------- 回写 YAML ----------

type yamlGroup struct {
	Name          string   `yaml:"name"`
	Type          string   `yaml:"type"`
	Proxies       []string `yaml:"proxies,omitempty"`
	IncludeAll    bool     `yaml:"include-all,omitempty"`
	Filter        string   `yaml:"filter,omitempty"`
	ExcludeFilter string   `yaml:"exclude-filter,omitempty"`
	URL           string   `yaml:"url,omitempty"`
	Interval      int      `yaml:"interval,omitempty"`
	Tolerance     int      `yaml:"tolerance,omitempty"`
	Icon          string   `yaml:"icon,omitempty"`
}

// buildGroupNode 按固定顺序生成策略组节点，并追加 extra 字段
func buildGroupNode(g TplGroup) (*yaml.Node, error) {
	yg := yamlGroup{
		Name: g.Name, Type: g.Type, Proxies: g.Proxies, IncludeAll: g.IncludeAll,
		Filter: g.Filter, ExcludeFilter: g.ExcludeFilter, URL: g.URL,
		Interval: g.Interval, Tolerance: g.Tolerance, Icon: g.Icon,
	}
	base, err := yaml.Marshal(&yg)
	if err != nil {
		return nil, err
	}
	var n yaml.Node
	if err := yaml.Unmarshal(base, &n); err != nil {
		return nil, err
	}
	m := n.Content[0]
	// 追加 extra
	if len(g.Extra) > 0 {
		keys := make([]string, 0, len(g.Extra))
		for k := range g.Extra {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		for _, k := range keys {
			raw, err := json.Marshal(g.Extra[k])
			if err != nil {
				continue
			}
			var vn yaml.Node
			if err := yaml.Unmarshal(raw, &vn); err != nil {
				continue
			}
			kn := &yaml.Node{Kind: yaml.ScalarNode, Value: k}
			m.Content = append(m.Content, kn, vn.Content[0])
		}
	}
	return m, nil
}

// TplSaveStruct POST /api/v1/template/save
// form: file, groups(JSON), rules(JSON)
func TplSaveStruct(c *gin.Context) {
	name := c.PostForm("file")
	groupsJSON := c.PostForm("groups")
	rulesJSON := c.PostForm("rules")
	if name == "" {
		c.JSON(400, gin.H{"code": "00001", "msg": "文件名不能为空"})
		return
	}
	path, err := safeFilePath(name)
	if err != nil {
		c.JSON(400, gin.H{"code": "00001", "msg": err.Error()})
		return
	}
	data, err := os.ReadFile(path)
	if err != nil {
		c.JSON(404, gin.H{"code": "00001", "msg": "模板不存在"})
		return
	}

	var groups []TplGroup
	if err := json.Unmarshal([]byte(groupsJSON), &groups); err != nil {
		c.JSON(400, gin.H{"code": "00001", "msg": "策略组数据格式错误"})
		return
	}
	var rules []string
	if err := json.Unmarshal([]byte(rulesJSON), &rules); err != nil {
		c.JSON(400, gin.H{"code": "00001", "msg": "规则数据格式错误"})
		return
	}
	var providers []TplProvider
	if pj := c.PostForm("providers"); pj != "" {
		if err := json.Unmarshal([]byte(pj), &providers); err != nil {
			c.JSON(400, gin.H{"code": "00001", "msg": "规则集数据格式错误"})
			return
		}
	}

	// 结构校验
	var check TplStruct
	check.Groups = groups
	check.Rules = rules
	if issues := validateTpl(&check); len(issues) > 0 {
		c.JSON(400, gin.H{"code": "00001", "msg": strings.Join(issues, "；"), "data": issues})
		return
	}

	// 解析原文档为 Node，仅替换 proxy-groups / rules 两个节点，保留其余内容与注释
	var doc yaml.Node
	if err := yaml.Unmarshal(data, &doc); err != nil {
		c.JSON(400, gin.H{"code": "00001", "msg": "模板不是合法 YAML：" + err.Error()})
		return
	}
	if len(doc.Content) == 0 || doc.Content[0].Kind != yaml.MappingNode {
		c.JSON(400, gin.H{"code": "00001", "msg": "模板顶层结构不是映射"})
		return
	}
	rootMap := doc.Content[0]

	// 构造新的 proxy-groups 序列
	seq := &yaml.Node{Kind: yaml.SequenceNode}
	for _, g := range groups {
		gn, err := buildGroupNode(g)
		if err != nil {
			c.JSON(500, gin.H{"code": "00001", "msg": "生成策略组失败：" + err.Error()})
			return
		}
		seq.Content = append(seq.Content, gn)
	}

	// 构造新的 rules 序列
	rseq := &yaml.Node{Kind: yaml.SequenceNode}
	for _, r := range rules {
		rseq.Content = append(rseq.Content, &yaml.Node{Kind: yaml.ScalarNode, Value: r})
	}

	setKey := func(key string, val *yaml.Node) bool {
		for i := 0; i < len(rootMap.Content); i += 2 {
			if rootMap.Content[i].Value == key {
				rootMap.Content[i+1] = val
				return true
			}
		}
		return false
	}
	replacedGroups := setKey("proxy-groups", seq)
	setKey("rules", rseq)

	// 回写 rule-providers（保留未在可视化中编辑的条目）
	if len(providers) > 0 {
		pseq := &yaml.Node{Kind: yaml.MappingNode}
		for _, pv := range providers {
			if pv.Name == "" {
				continue
			}
			vn, err := buildProviderNode(pv)
			if err != nil {
				continue
			}
			pseq.Content = append(pseq.Content, &yaml.Node{Kind: yaml.ScalarNode, Value: pv.Name}, vn)
		}
		setKey("rule-providers", pseq)
	}
	if !replacedGroups {
		// 原本没有 proxy-groups，追加到末尾
		rootMap.Content = append(rootMap.Content,
			&yaml.Node{Kind: yaml.ScalarNode, Value: "proxy-groups"}, seq)
	}

	var buf strings.Builder
	enc := yaml.NewEncoder(&buf)
	enc.SetIndent(2)
	if err := enc.Encode(&doc); err != nil {
		c.JSON(500, gin.H{"code": "00001", "msg": "生成 YAML 失败：" + err.Error()})
		return
	}
	enc.Close()

	if err := os.WriteFile(path, []byte(buf.String()), 0666); err != nil {
		log.Println("写入模板失败:", err)
		c.JSON(500, gin.H{"code": "00001", "msg": "保存失败"})
		return
	}
	models.OpLogAdd("面板", "可视化编辑模板", name)
	c.JSON(200, gin.H{
		"code": "00000",
		"msg":  "保存成功",
		"data": gin.H{"file": name, "groups": len(groups), "rules": len(rules), "providers": len(providers)},
	})
}

type yamlProvider struct {
	Type     string `yaml:"type,omitempty"`
	Behavior string `yaml:"behavior,omitempty"`
	URL      string `yaml:"url,omitempty"`
	Format   string `yaml:"format,omitempty"`
	Path     string `yaml:"path,omitempty"`
	Interval int    `yaml:"interval,omitempty"`
}

// buildProviderNode 生成 rule-providers 条目节点
func buildProviderNode(p TplProvider) (*yaml.Node, error) {
	yp := yamlProvider{
		Type: p.Type, Behavior: p.Behavior, URL: p.URL,
		Format: p.Format, Path: p.Path, Interval: p.Interval,
	}
	base, err := yaml.Marshal(&yp)
	if err != nil {
		return nil, err
	}
	var n yaml.Node
	if err := yaml.Unmarshal(base, &n); err != nil {
		return nil, err
	}
	m := n.Content[0]
	if len(p.Extra) > 0 {
		keys := make([]string, 0, len(p.Extra))
		for k := range p.Extra {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		for _, k := range keys {
			raw, err := json.Marshal(p.Extra[k])
			if err != nil {
				continue
			}
			var vn yaml.Node
			if err := yaml.Unmarshal(raw, &vn); err != nil {
				continue
			}
			m.Content = append(m.Content, &yaml.Node{Kind: yaml.ScalarNode, Value: k}, vn.Content[0])
		}
	}
	return m, nil
}

var _ = io.Discard
