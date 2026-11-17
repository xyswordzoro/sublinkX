// Package tpl 提供模板文件的解析、校验与结构化回写（Node 级替换，保留注释与未识别字段）。
// 供面板 API 与 Telegram Bot 共用。
package tpl

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"sublink/models"

	"gopkg.in/yaml.v3"
)

// Temp 模板文件列表条目
type Temp struct {
	File       string `json:"file"`
	Text       string `json:"text"`
	CreateDate string `json:"create_date"`
}

var baseTemplateDir string

func init() {
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatalf("无法获取当前工作目录: %v", err)
	}
	absPath, err := filepath.Abs(filepath.Join(cwd, "template"))
	if err != nil {
		log.Fatalf("无法解析 template 目录的绝对路径: %v", err)
	}
	baseTemplateDir = absPath
	if _, err := os.Stat(baseTemplateDir); os.IsNotExist(err) {
		if err := os.MkdirAll(baseTemplateDir, 0755); err != nil {
			log.Fatalf("无法创建基础模板目录 %s: %v", baseTemplateDir, err)
		}
	}
}

// SafeFilePath 生成基础目录下的安全绝对路径，防止目录遍历
func SafeFilePath(filename string) (string, error) {
	cleanFilename := filepath.Clean(filename)
	if strings.ContainsRune(cleanFilename, os.PathSeparator) ||
		strings.ContainsRune(cleanFilename, '/') ||
		strings.ContainsRune(cleanFilename, '\\') {
		return "", errors.New("文件名不能包含路径分隔符")
	}
	if cleanFilename == "." || cleanFilename == ".." || cleanFilename == "" {
		return "", errors.New("文件名无效或指向目录本身")
	}
	fullPath := filepath.Join(baseTemplateDir, cleanFilename)
	finalCleanPath := filepath.Clean(fullPath)
	relPath, err := filepath.Rel(baseTemplateDir, finalCleanPath)
	if err != nil {
		return "", errors.New("路径处理错误: " + err.Error())
	}
	if strings.HasPrefix(relPath, "..") {
		return "", errors.New("检测到目录遍历尝试")
	}
	if finalCleanPath == baseTemplateDir {
		return "", errors.New("文件名无效或指向根目录本身")
	}
	return finalCleanPath, nil
}

// ListFiles 列出模板目录下全部文件
func ListFiles() []Temp {
	files, err := os.ReadDir(baseTemplateDir)
	if err != nil {
		log.Printf("读取模板目录失败: %v", err)
		return nil
	}
	var temps []Temp
	for _, file := range files {
		if file.IsDir() {
			continue
		}
		fullPath, err := SafeFilePath(file.Name())
		if err != nil {
			continue
		}
		info, err := file.Info()
		if err != nil {
			continue
		}
		text, err := os.ReadFile(fullPath)
		if err != nil {
			continue
		}
		temps = append(temps, Temp{
			File:       file.Name(),
			Text:       string(text),
			CreateDate: info.ModTime().Format("2006-01-02 15:04:05"),
		})
	}
	return temps
}

/* ---------------- 可编辑结构 ---------------- */

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

// ParseFile 读取并解析模板文件。非 YAML 或语法错误时返回 IsYaml=false 的结果（含原文）。
func ParseFile(name string) (TplStruct, error) {
	res := TplStruct{File: name}
	path, err := SafeFilePath(name)
	if err != nil {
		return res, err
	}
	data, err := os.ReadFile(path)
	if err != nil {
		return res, errors.New("模板不存在")
	}
	parsed, perr := parseYamlStruct(name, data)
	if perr != nil {
		return TplStruct{
			File: name, IsYaml: false, Raw: string(data),
			Groups: []TplGroup{}, Rules: []string{}, Providers: []TplProvider{},
			Issues: []string{"该模板不是可解析的 mihomo YAML，仅支持原始文本编辑"},
		}, nil
	}
	return parsed, nil
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

/* ---------------- 回写 YAML ---------------- */

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

// SaveStruct 结构化回写模板：仅替换 proxy-groups / rules / rule-providers 节点，
// 保留其余内容与注释。source 标记操作来源（"面板"/"Telegram"）。
func SaveStruct(name string, groups []TplGroup, rules []string, providers []TplProvider, source string) error {
	if name == "" {
		return errors.New("文件名不能为空")
	}
	path, err := SafeFilePath(name)
	if err != nil {
		return err
	}
	data, err := os.ReadFile(path)
	if err != nil {
		return errors.New("模板不存在")
	}

	// 结构校验
	var check TplStruct
	check.Groups = groups
	check.Rules = rules
	if issues := validateTpl(&check); len(issues) > 0 {
		return errors.New(strings.Join(issues, "；"))
	}

	// 解析原文档为 Node，仅替换目标节点
	var doc yaml.Node
	if err := yaml.Unmarshal(data, &doc); err != nil {
		return fmt.Errorf("模板不是合法 YAML：%w", err)
	}
	if len(doc.Content) == 0 || doc.Content[0].Kind != yaml.MappingNode {
		return errors.New("模板顶层结构不是映射")
	}
	rootMap := doc.Content[0]

	seq := &yaml.Node{Kind: yaml.SequenceNode}
	for _, g := range groups {
		gn, err := buildGroupNode(g)
		if err != nil {
			return fmt.Errorf("生成策略组失败：%w", err)
		}
		seq.Content = append(seq.Content, gn)
	}

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
		rootMap.Content = append(rootMap.Content,
			&yaml.Node{Kind: yaml.ScalarNode, Value: "proxy-groups"}, seq)
	}

	var buf strings.Builder
	enc := yaml.NewEncoder(&buf)
	enc.SetIndent(2)
	if err := enc.Encode(&doc); err != nil {
		return fmt.Errorf("生成 YAML 失败：%w", err)
	}
	enc.Close()

	if err := os.WriteFile(path, []byte(buf.String()), 0666); err != nil {
		log.Println("写入模板失败:", err)
		return errors.New("保存失败")
	}
	models.OpLogAdd(source, "编辑模板规则", name)
	return nil
}
