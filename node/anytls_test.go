package node

import "testing"

func TestDecodeAnytlsURL(t *testing.T) {
	link := "anytls://8JCsPssfgS8tiRwiMlhARg==@example.com:443/?sni=example.com&insecure=1#MyNode"
	a, err := DecodeAnytlsURL(link)
	if err != nil {
		t.Fatalf("decode error: %v", err)
	}
	if a.Password != "8JCsPssfgS8tiRwiMlhARg==" {
		t.Errorf("password = %q", a.Password)
	}
	if a.Host != "example.com" || a.Port != 443 {
		t.Errorf("host/port = %s:%d", a.Host, a.Port)
	}
	if a.Sni != "example.com" || !a.Insecure {
		t.Errorf("sni = %q, insecure = %v", a.Sni, a.Insecure)
	}
	if a.Name != "MyNode" {
		t.Errorf("name = %q", a.Name)
	}
}

func TestDecodeAnytlsURLDefaults(t *testing.T) {
	link := "anytls://pwd@1.2.3.4"
	a, err := DecodeAnytlsURL(link)
	if err != nil {
		t.Fatalf("decode error: %v", err)
	}
	if a.Port != 443 {
		t.Errorf("default port = %d", a.Port)
	}
	if a.Name != "1.2.3.4:" {
		t.Errorf("default name = %q", a.Name)
	}
	if a.Insecure {
		t.Errorf("insecure should be false by default")
	}
}

func TestEncodeAnytlsURL(t *testing.T) {
	a := Anytls{Name: "N1", Password: "pw", Host: "h.com", Port: 8443, Sni: "s.com", Insecure: true}
	link := EncodeAnytlsURL(a)
	b, err := DecodeAnytlsURL(link)
	if err != nil {
		t.Fatalf("re-decode error: %v", err)
	}
	if b.Name != "N1" || b.Password != "pw" || b.Host != "h.com" || b.Port != 8443 ||
		b.Sni != "s.com" || !b.Insecure {
		t.Errorf("round-trip mismatch: %+v from %q", b, link)
	}
}
