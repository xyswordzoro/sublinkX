package api

import "testing"

func TestVersionLess(t *testing.T) {
	cases := []struct {
		a, b string
		want bool
	}{
		{"0.11", "0.11", false},
		{"0.11", "0.12", true},
		{"v0.11", "v0.12", true},
		{"0.9", "0.10", true},  // 数字比较而非字符串比较
		{"0.12", "0.11", false},
		{"0.11", "1.0", true},
		{"0.11.1", "0.11", false},
		{"0.11", "0.11.1", true},
		{"", "0.1", true},
		{"0.11", "", false},
	}
	for _, c := range cases {
		if got := versionLess(versionParts(c.a), versionParts(c.b)); got != c.want {
			t.Errorf("versionLess(%q, %q) = %v, want %v", c.a, c.b, got, c.want)
		}
	}
}

func TestFirstLine(t *testing.T) {
	cases := []struct {
		in, want string
	}{
		{"## 新版本\n\n- 修复若干问题", "新版本"},
		{"# 更新说明", "更新说明"},
		{"\n\n第二行才是内容", "第二行才是内容"},
		{"", ""},
		{"无换行单行内容", "无换行单行内容"},
	}
	for _, c := range cases {
		if got := firstLine(c.in); got != c.want {
			t.Errorf("firstLine(%q) = %q, want %q", c.in, got, c.want)
		}
	}
}
