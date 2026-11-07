package telegram

import "testing"

func TestNormalizeServerHost(t *testing.T) {
	cases := []struct {
		in, want string
	}{
		{"", "http://127.0.0.1:8000"},
		{"example.com:8000", "http://example.com:8000"},
		{"https://sub.example.com:2022", "https://sub.example.com:2022"},
		{"http://example.com", "http://example.com"},
		{"https://example.com/", "https://example.com"},
		{"  https://example.com/  ", "https://example.com"},
	}
	for _, c := range cases {
		if got := normalizeServerHost(c.in); got != c.want {
			t.Errorf("normalizeServerHost(%q) = %q, want %q", c.in, got, c.want)
		}
	}
}
