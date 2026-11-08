'use strict';

/* ================= 图标 ================= */
var ICONS = {
  zap: '<polygon points="13 2 3 14 10 14 11 22 21 10 14 10 15 2"/>',
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  server: '<rect x="2" y="4" width="20" height="7" rx="2"/><rect x="2" y="13" width="20" height="7" rx="2"/><line x1="6" y1="7.5" x2="6.01" y2="7.5"/><line x1="6" y1="16.5" x2="6.01" y2="16.5"/>',
  link: '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/>',
  rss: '<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>',
  filecode: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="10 13 8 15 10 17"/><polyline points="14 13 16 15 14 17"/>',
  scrolltext: '<path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>',
  settings: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  trendup: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  trenddown: '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  zap2: '<polygon points="13 2 3 14 10 14 11 22 21 10 14 10 15 2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
};
function icon(name, size) {
  size = size || 17;
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
}
function paintIcons(root) {
  (root || document).querySelectorAll('[data-icon]').forEach(function (el) {
    el.outerHTML = icon(el.getAttribute('data-icon'));
  });
}

/* ================= 工具 ================= */
function $(s) { return document.querySelector(s); }
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function fmtDate(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function num(n) { return (n || 0).toLocaleString('en-US'); }
var chartUid = 0;

/* MD5（用于生成订阅 token，与后端 md5(订阅名) 匹配） */
function md5(str) {
  function rol(n, c) { return (n << c) | (n >>> (32 - c)); }
  function add(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF), m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); }
  function cmn(q, a, b, x, s, t) { return add(rol(add(add(a, q), add(x, t)), s), b); }
  function ff(a, b, c, d, x, s, t) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | ~d), a, b, x, s, t); }
  function T(i) { return (Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296)) | 0; }
  var s = unescape(encodeURIComponent(str)), n = s.length;
  var total = (((n + 8) >> 6) + 1) * 16;
  var x = [], i, k, r;
  for (i = 0; i < total; i++) x[i] = 0;
  for (i = 0; i < n; i++) x[i >> 2] |= s.charCodeAt(i) << ((i % 4) * 8);
  x[n >> 2] |= 0x80 << ((n % 4) * 8);
  var bits = n * 8;
  x[total - 2] = bits >>> 0;
  x[total - 1] = Math.floor(bits / 4294967296);
  var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  var S1 = [7, 12, 17, 22], S2 = [5, 9, 14, 20], S3 = [4, 11, 16, 23], S4 = [6, 10, 15, 21];
  var ops = [ff, gg, hh, ii], Ss = [S1, S2, S3, S4], offs = [0, 16, 32, 48];
  var idx = [function (t) { return t; }, function (t) { return (5 * t + 1) % 16; }, function (t) { return (3 * t + 5) % 16; }, function (t) { return (7 * t) % 16; }];
  for (i = 0; i < total; i += 16) {
    var oa = a, ob = b, oc = c, od = d;
    for (r = 0; r < 4; r++) {
      for (k = 0; k < 16; k++) {
        a = ops[r](a, b, c, d, x[i + idx[r](k)], Ss[r][k % 4], T(offs[r] + k));
        var tmp = d; d = c; c = b; b = a; a = tmp;
      }
    }
    a = add(a, oa); b = add(b, ob); c = add(c, oc); d = add(d, od);
  }
  function hexLE(n) { var s = '', v, j; for (j = 0; j < 4; j++) { v = (n >>> (j * 8)) & 255; s += (v < 16 ? '0' : '') + v.toString(16); } return s; }
  return hexLE(a) + hexLE(b) + hexLE(c) + hexLE(d);
}
console.assert(md5('test') === '098f6bcd4621d373cade4e832627b4f6', 'md5 self-test failed');
console.assert(md5('abc') === '900150983cd24fb0d6963f7d28e17f72', 'md5 self-test failed');

/* ================= API ================= */
var state = {
  token: null, me: null, version: '',
  nodes: [], subs: [], templates: [],
  pendingDialog: null, pendingSearch: null,
  range: 7, theme: 'auto'
};

function setToken(t) { state.token = t; localStorage.setItem('accessToken', t); }

async function api(path, opts) {
  opts = opts || {};
  var url = path;
  if (opts.query) url += '?' + new URLSearchParams(opts.query).toString();
  var headers = {};
  if (state.token) headers['Authorization'] = 'Bearer ' + state.token;
  var init = { method: opts.method || 'GET', headers: headers };
  if (opts.form) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    init.body = new URLSearchParams(opts.form).toString();
  }
  var res = await fetch(url, init);
  var data = {};
  try { data = await res.json(); } catch (e) {}
  if (res.status === 401) { logoutLocal(); throw new Error('登录已失效，请重新登录'); }
  if (!res.ok) {
    var msg = data.msg;
    if (msg && typeof msg === 'object') msg = msg.Error || msg.error || JSON.stringify(msg);
    throw new Error(msg || ('请求失败 ' + res.status));
  }
  return data;
}

/* ================= 提示 ================= */
function toast(msg, ok) {
  var t = $('#toast');
  t.textContent = msg;
  t.classList.toggle('is-error', !ok);
  t.hidden = false;
  clearTimeout(t._tm);
  t._tm = setTimeout(function () { t.hidden = true; }, 2600);
}

/* ================= 弹窗 ================= */
function dlgOpen(title, bodyHtml, submitLabel, onsubmit, opts) {
  opts = opts || {};
  var dlg = $('#dlg');
  dlg.innerHTML =
    '<form class="dlg-body"><h3>' + esc(title) + '</h3>' + bodyHtml +
    '<p class="form-error" id="dlg-error" hidden></p>' +
    '<div class="dlg-actions">' +
    '<button type="button" class="btn" id="dlg-cancel">取消</button>' +
    '<button type="submit" class="btn ' + (opts.danger ? 'btn-danger' : 'btn-primary') + '" id="dlg-ok">' + esc(submitLabel || '保存') + '</button>' +
    '</div></form>';
  $('#dlg-cancel').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    var okBtn = $('#dlg-ok'), err = $('#dlg-error');
    okBtn.disabled = true; err.hidden = true;
    try {
      await onsubmit();
      dlg.close();
    } catch (ex) {
      err.textContent = ex.message || String(ex);
      err.hidden = false;
    } finally {
      okBtn.disabled = false;
    }
  });
  dlg.showModal();
  var first = dlg.querySelector('input,textarea');
  if (first && !opts.noFocus) first.focus();
}
function dlgClose() { $('#dlg').close(); }

function confirmDlg(text, submitLabel, onsubmit) {
  dlgOpen('确认操作', '<p class="confirm-text">' + esc(text) + '</p>', submitLabel, onsubmit, { danger: true, noFocus: true });
}

/* ================= 主题（自动 → 浅色 → 深色 循环） ================= */
function applyTheme() {
  var root = document.documentElement;
  root.style.colorScheme = state.theme === 'light' ? 'light' : (state.theme === 'dark' ? 'dark' : '');
  var btn = $('#btn-theme');
  if (btn) {
    var ic = state.theme === 'light' ? 'sun' : (state.theme === 'dark' ? 'moon' : 'monitor');
    btn.innerHTML = icon(ic, 16);
    btn.setAttribute('aria-label', '当前主题：' + (state.theme === 'auto' ? '跟随系统' : state.theme === 'light' ? '浅色' : '深色') + '，点击切换');
  }
}
function cycleTheme() {
  var order = ['auto', 'light', 'dark'];
  state.theme = order[(order.indexOf(state.theme) + 1) % order.length];
  localStorage.setItem('sx-theme', state.theme);
  applyTheme();
  toast('主题：' + (state.theme === 'auto' ? '跟随系统' : state.theme === 'light' ? '浅色' : '深色'), true);
}

/* ================= 头像渲染 ================= */
function applyAvatar(elId, me) {
  var el = document.getElementById(elId);
  if (!el) return;
  var a = me && me.avatar;
  var cls = el.className, id = el.id;
  if (a) {
    if (el.tagName === 'IMG' && el.getAttribute('src') === a) return;
    el.outerHTML = '<img id="' + id + '" class="' + cls + ' avatar-img" src="' + esc(a) + '" alt="头像"/>';
  } else {
    var initial = ((me && me.username) || 'A').charAt(0).toUpperCase();
    if (el.tagName === 'IMG') {
      el.outerHTML = '<span id="' + id + '" class="' + cls + '">' + esc(initial) + '</span>';
    } else {
      el.textContent = initial;
    }
  }
}

/* ================= 登录 ================= */
function showLogin() {
  $('#app-view').hidden = true;
  $('#login-view').hidden = false;
  $('#lg-error').hidden = true;
}

function logoutLocal() {
  state.token = null;
  localStorage.setItem('accessToken', '');
  if ($('#login-view').hidden) showLogin();
}

async function enterApp() {
  var me = await api('/api/v1/users/me');
  state.me = me.data || {};
  try {
    var v = await api('/api/v1/version');
    state.version = v.data || '';
  } catch (e) { state.version = ''; }
  var nick = state.me.nickname || '管理员';
  applyAvatar('top-avatar', state.me);
  document.getElementById('top-uname-name').textContent = nick;
  $('#login-view').hidden = true;
  $('#app-view').hidden = false;
  if (!location.hash) location.hash = '#/dashboard';
  route();
}

/* ================= 路由 ================= */
var ROUTES = {
  dashboard: { title: '仪表盘', render: renderDashboard },
  nodes: { title: '节点管理', render: renderNodes },
  subs: { title: '订阅管理', render: renderSubs },
  templates: { title: '模板配置', render: renderTemplates },
  logs: { title: '操作日志', render: renderLogs },
  settings: { title: '系统设置', render: renderSettings }
};

function route() {
  if ($('#app-view').hidden) return;
  var name = location.hash.replace(/^#\//, '') || 'dashboard';
  if (!ROUTES[name]) name = 'dashboard';
  document.querySelectorAll('.nav-item').forEach(function (a) {
    a.classList.toggle('is-active', a.dataset.route === name);
  });
  $('#page-title').textContent = ROUTES[name].title;
  ROUTES[name].render();
}

function setNavCounts() { }



function errorBox(msg) {
  return '<section class="tile"><p class="empty">加载失败：' + esc(msg) + '</p></section>';
}

/* ================= 图表 ================= */
function sparkline(values, colorVar) {
  var W = 220, H = 48, pad = 3;
  var max = Math.max(1, Math.max.apply(null, values));
  var n = values.length;
  var pts = values.map(function (v, i) {
    return [pad + i * (W - pad * 2) / (n - 1), H - pad - (v / max) * (H - pad * 2)];
  });
  var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
  var area = line + ' L' + (W - pad) + ',' + H + ' L' + pad + ',' + H + ' Z';
  var id = 'sg' + (++chartUid);
  return '<svg class="kpi-spark" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true">' +
    '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="' + colorVar + '" stop-opacity=".28"/>' +
    '<stop offset="1" stop-color="' + colorVar + '" stop-opacity="0"/>' +
    '</linearGradient></defs>' +
    '<path d="' + area + '" fill="url(#' + id + ')"/>' +
    '<path d="' + line + '" fill="none" stroke="' + colorVar + '" stroke-width="2"/>' +
    '</svg>';
}

function donut(segments, centerLabel) {
  var R = 58, C = 2 * Math.PI * R;
  var total = segments.reduce(function (s, x) { return s + x.value; }, 0);
  var offset = 0, segs = '';
  segments.forEach(function (s) {
    var len = total ? s.value / total * C : 0;
    var gap = segments.length > 1 ? 5 : 0;
    segs += '<circle cx="75" cy="75" r="' + R + '" fill="none" stroke="' + s.color + '" stroke-width="14" ' +
      'stroke-linecap="round" stroke-dasharray="' + Math.max(0, len - gap) + ' ' + (C - Math.max(0, len - gap)) + '" ' +
      'stroke-dashoffset="' + (-offset - gap / 2) + '" transform="rotate(-90 75 75)"/>';
    offset += len;
  });
  var pcts = pctList(segments.map(function (x) { return x.value; }), total);
  var cells = segments.map(function (s, si) {
    return '<div class="proto-cell"><div class="proto-cell-top"><span class="proto-dot" style="background:' +
      s.color + '"></span><b>' + esc(s.label) + '</b></div><div class="pct">' + s.value + ' · ' + pcts[si] + '%</div></div>';
  }).join('');
  return '<div class="donut-wrap">' +
    '<svg width="170" height="170" viewBox="0 0 150 150" style="width:170px;height:170px" role="img" aria-label="协议分布环形图">' + segs +
    '<text x="75" y="72" text-anchor="middle" class="donut-center-val">' + num(total) + '</text>' +
    '<text x="75" y="90" text-anchor="middle" class="donut-center-label">' + esc(centerLabel) + '</text>' +
    '</svg></div>' +
    '<div class="proto-grid">' + cells + '</div>';
}

/* ================= 仪表盘 ================= */
function kpiCard(cfg) {
  return '<section class="tile kpi kpi-card">' +
    '<span class="strip c-' + cfg.color + '"></span>' +
    '<div class="kpi-top">' +
    '<div><p class="kpi-label">' + cfg.label + '</p>' +
    '<div class="kpi-value-row"><span class="kpi-value">' + cfg.value + '</span>' + (cfg.delta || '') + '</div></div>' +
    '<span class="kpi-ic ' + cfg.color + '">' + icon(cfg.icon, 26) + '</span>' +
    '</div>' +
    '<div class="kpi-foot">' + sparkline(cfg.spark, cfg.colorVar) + '<span class="kpi-foot-text">' + cfg.footer + '</span></div>' +
    '</section>';
}

/* 最大余数法百分比分配，保证合计为 100% */
function pctList(values, total) {
  if (!total) return values.map(function () { return 0; });
  var raw = values.map(function (v) { return v / total * 100; });
  var floors = raw.map(function (r) { return Math.floor(r); });
  var rem = 100 - floors.reduce(function (a, b) { return a + b; }, 0);
  var order = raw.map(function (r, i) { return [r - Math.floor(r), i]; })
    .sort(function (a, b) { return b[0] - a[0]; });
  for (var k = 0; k < rem && order.length; k++) floors[order[k % order.length][1]]++;
  return floors;
}

/* 节点地区识别：优先旗帜 emoji，其次名称关键词 */
var REGIONS = [
  ['香港', 'HK'], ['Hong Kong', 'HK'], ['HongKong', 'HK'], ['HK', 'HK'], ['港', 'HK'],
  ['台湾', 'TW'], ['Taiwan', 'TW'], ['TW', 'TW'], ['台', 'TW'],
  ['日本', 'JP'], ['Japan', 'JP'], ['JP', 'JP'],
  ['新加坡', 'SG'], ['Singapore', 'SG'], ['狮城', 'SG'], ['SG', 'SG'],
  ['韩国', 'KR'], ['Korea', 'KR'], ['KR', 'KR'],
  ['美国', 'US'], ['United States', 'US'], ['USA', 'US'], ['US', 'US'], ['美', 'US'],
  ['英国', 'GB'], ['United Kingdom', 'GB'], ['UK', 'GB'], ['GB', 'GB'],
  ['德国', 'DE'], ['Germany', 'DE'], ['DE', 'DE'],
  ['法国', 'FR'], ['France', 'FR'], ['FR', 'FR'],
  ['加拿大', 'CA'], ['Canada', 'CA'], ['CA', 'CA'],
  ['澳大利亚', 'AU'], ['Australia', 'AU'], ['澳洲', 'AU'], ['AU', 'AU'],
  ['土耳其', 'TR'], ['Turkey', 'TR'], ['TR', 'TR'],
  ['俄罗斯', 'RU'], ['Russia', 'RU'], ['RU', 'RU'],
  ['荷兰', 'NL'], ['Netherlands', 'NL'], ['NL', 'NL'],
  ['菲律宾', 'PH'], ['Philippines', 'PH'], ['PH', 'PH'],
  ['马来西亚', 'MY'], ['Malaysia', 'MY'], ['MY', 'MY'],
  ['泰国', 'TH'], ['Thailand', 'TH'], ['TH', 'TH'],
  ['越南', 'VN'], ['Vietnam', 'VN'], ['VN', 'VN'],
  ['印度尼西亚', 'ID'], ['印尼', 'ID'], ['Indonesia', 'ID'], ['ID', 'ID'],
  ['印度', 'IN'], ['India', 'IN'], ['IN', 'IN'],
  ['意大利', 'IT'], ['Italy', 'IT'], ['IT', 'IT'],
  ['西班牙', 'ES'], ['Spain', 'ES'], ['ES', 'ES'],
  ['乌克兰', 'UA'], ['Ukraine', 'UA'], ['UA', 'UA'],
  ['巴西', 'BR'], ['Brazil', 'BR'], ['BR', 'BR'],
  ['阿根廷', 'AR'], ['Argentina', 'AR'], ['AR', 'AR'],
  ['瑞典', 'SE'], ['Sweden', 'SE'], ['SE', 'SE'],
  ['瑞士', 'CH'], ['Switzerland', 'CH'], ['CH', 'CH']
];
var CN_NAMES = {
  HK: '香港', TW: '台湾', JP: '日本', SG: '新加坡', KR: '韩国', US: '美国',
  GB: '英国', DE: '德国', FR: '法国', CA: '加拿大', AU: '澳大利亚', TR: '土耳其',
  RU: '俄罗斯', NL: '荷兰', PH: '菲律宾', MY: '马来西亚', TH: '泰国', VN: '越南',
  ID: '印尼', IN: '印度', IT: '意大利', ES: '西班牙', UA: '乌克兰', BR: '巴西',
  AR: '阿根廷', SE: '瑞典', CH: '瑞士'
};
var FLAG_RE = /([\uD83C][\uDDE6-\uDDFF])([\uD83C][\uDDE6-\uDDFF])/;

function flagEmoji(code) {
  return String.fromCharCode(0x1F1E6 + code.charCodeAt(0) - 65,
    0x1F1E6 + code.charCodeAt(1) - 65);
}

function detectRegion(name) {
  var flag = name.match(FLAG_RE);
  if (flag) {
    return String.fromCharCode(flag[1].charCodeAt(1) - 0xDDE6 + 65) +
      String.fromCharCode(flag[2].charCodeAt(1) - 0xDDE6 + 65);
  }
  var upper = name.toUpperCase();
  for (var i = 0; i < REGIONS.length; i++) {
    var kw = REGIONS[i][0];
    if (name.indexOf(kw) >= 0 || upper.indexOf(kw.toUpperCase()) >= 0) {
      return REGIONS[i][1];
    }
  }
  return null;
}

async function renderDashboard() {
  var view = $('#view');
  view.innerHTML = '<div class="loading">加载中…</div>';
  var nodes, subs;
  try {
    var rs = await Promise.all([api('/api/v1/nodes/get'), api('/api/v1/subcription/get')]);
    nodes = rs[0].data || [];
    subs = rs[1].data || [];
    state.nodes = nodes; state.subs = subs;
  } catch (e) { view.innerHTML = errorBox(e.message); return; }

  var todayStr = fmtDate(new Date());
  var yd = new Date(); yd.setDate(yd.getDate() - 1);
  var ydStr = fmtDate(yd);
  var weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);

  /* 近 7 天请求序列 + 今日/昨日计数 */
  var todayCount = 0, ydCount = 0;
  var dailyReq = [];
  var i, d;
  for (i = 6; i >= 0; i--) {
    d = new Date(); d.setDate(d.getDate() - i);
    dailyReq.push({ key: fmtDate(d), v: 0 });
  }
  var dayMap = {};
  dailyReq.forEach(function (x) { dayMap[x.key] = x; });
  var totalVisits = 0;
  var ipSet = new Set();
  subs.forEach(function (sub) {
    (sub.SubLogs || []).forEach(function (l) {
      var day = (l.Date || '').slice(0, 10);
      var hit = dayMap[day];
      if (hit) hit.v += (l.Count || 0);
      if (day === todayStr) { todayCount += (l.Count || 0); ipSet.add(l.IP); }
      if (day === ydStr) ydCount += (l.Count || 0);
      totalVisits += (l.Count || 0);
    });
  });
  var dailyReqVals = dailyReq.map(function (x) { return x.v; });

  /* 节点/订阅累计曲线（近 7 天，KPI 迷你曲线用） */
  function cum(items) {
    var arr = [];
    for (var j = 6; j >= 0; j--) {
      var end = new Date(); end.setDate(end.getDate() - j); end.setHours(23, 59, 59);
      arr.push(items.filter(function (it) { return new Date(it.CreatedAt) <= end; }).length);
    }
    return arr;
  }
  var cumNodes = cum(nodes), cumSubs = cum(subs);

  function pctDelta(now, before) {
    if (!before) return null;
    return Math.round((now - before) / before * 100);
  }
  var nodeBefore = nodes.filter(function (n) { return new Date(n.CreatedAt) <= weekAgo; }).length;
  var subBefore = subs.filter(function (s) { return new Date(s.CreatedAt) <= weekAgo; }).length;
  function deltaHtml(pct, text) {
    if (pct === null) return '<span class="kpi-delta flat">' + text + '</span>';
    if (pct > 0) return '<span class="kpi-delta up">' + icon('trendup', 11) + '↑' + pct + '% ' + text + '</span>';
    if (pct < 0) return '<span class="kpi-delta down">' + icon('trenddown', 11) + '↓' + (-pct) + '% ' + text + '</span>';
    return '<span class="kpi-delta flat">— 持平 · ' + text + '</span>';
  }
  var ydDelta = deltaHtml(pctDelta(todayCount, ydCount), '较昨日');

  /* 协议分布 */
  var protoColors = ['var(--blue)', 'var(--purple)', 'var(--green)', 'var(--orange)', 'var(--cyan)', 'var(--red)'];
  var protoCount = {};
  nodes.forEach(function (n) {
    var scheme = (n.Link || '').split('://')[0] || '未知';
    if (scheme === 'http' || scheme === 'https') scheme = '订阅';
    protoCount[scheme] = (protoCount[scheme] || 0) + 1;
  });
  var protos = Object.entries(protoCount).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 6);
  var donutSegs = protos.map(function (p, idx) {
    return { label: p[0], value: p[1], color: protoColors[idx % protoColors.length] };
  });

  /* 分组数量（KPI 底部说明用） */
  var gCount = {}, noGroup = 0;
  nodes.forEach(function (n) {
    var gs = n.GroupNodes || [];
    if (!gs.length) { noGroup++; return; }
    gs.forEach(function (g) { gCount[g.Name] = (gCount[g.Name] || 0) + 1; });
  });
  var groups = Object.entries(gCount);

  /* 国家分布：旗帜 emoji + 名称关键词聚合 */
  var cCount = {}, unknown = 0;
  nodes.forEach(function (n) {
    var r = detectRegion(n.Name || '');
    if (r) cCount[r] = (cCount[r] || 0) + 1; else unknown++;
  });
  var countries = Object.entries(cCount).sort(function (a, b) { return b[1] - a[1]; });
  var countryMax = countries.length ? countries[0][1] : 1;
  var regionRows = countries.map(function (c) { return [c[0], c[1], CN_NAMES[c[0]] || '']; });
  if (unknown) regionRows.push(['未知', unknown, '']);
  var regionPcts = pctList(regionRows.map(function (r) { return r[1]; }), nodes.length || 1);
  var countryRows = regionRows.map(function (r, idx) {
    var label = r[0] === '未知' ? '🌐 未知' : flagEmoji(r[0]) + ' ' + r[0];
    return '<div class="c-row">' +
      '<div class="c-head"><div class="c-left"><span class="c-flag">' + label + '</span>' +
      '<span class="c-name">' + esc(r[2] || (r[0] === '未知' ? '未知地区' : '')) + '</span></div>' +
      '<div class="c-right"><span class="c-count">' + r[1] + ' 个节点</span>' +
      '<span class="c-pct">' + regionPcts[idx] + '%</span></div></div>' +
      '<div class="c-bar"><span class="c-fill cg-' + (idx % 8) + '" style="width:' +
      Math.round(r[1] / countryMax * 100) + '%"></span></div></div>';
  }).join('');
  if (!countryRows) countryRows = '<p class="empty">暂无节点</p>';

  /* 连通率：已测节点中可达比例 */
  var tested = nodes.filter(function (n) { return n.Latency !== 0; });
  var online = nodes.filter(function (n) { return n.Latency > 0; }).length;
  var connectRateText = tested.length ? Math.round(online / tested.length * 100) + '% 连通率' : '未测速';

  view.innerHTML =
    kpiCard({ label: '节点总数', value: num(nodes.length), color: 'blue', colorVar: 'var(--blue)', icon: 'server', spark: cumNodes, delta: deltaHtml(pctDelta(nodes.length, nodeBefore), '本周'), footer: connectRateText }) +
    kpiCard({ label: '订阅数', value: num(subs.length), color: 'green', colorVar: 'var(--green)', icon: 'rss', spark: cumSubs, delta: deltaHtml(pctDelta(subs.length, subBefore), '本周'), footer: '累计访问 ' + num(totalVisits) + ' 次' }) +
    kpiCard({ label: '今日订阅请求', value: num(todayCount), color: 'purple', colorVar: 'var(--purple)', icon: 'activity', spark: dailyReqVals, delta: ydDelta, footer: '独立 IP ' + ipSet.size + ' 个' }) +

    '<section class="tile t-country">' +
    '<header class="tile-head" style="border-bottom:1px solid var(--border);padding-bottom:12px">' +
    '<span class="head-ic green">' + icon('globe', 15) + '</span>' +
    '<div><h3>节点国家分布</h3><p class="tile-desc">按节点名称与旗帜智能聚合分布</p></div>' +
    '<span class="head-badge">' + regionRows.length + ' 个地区</span>' +
    '</header>' +
    '<div style="margin-top:14px">' + countryRows + '</div>' +
    '<div class="tile-foot"><span>智能聚类识别已开启</span>' +
    '<button class="linkbtn" id="qa-refresh" type="button">刷新分类</button></div>' +
    '</section>' +

    '<section class="tile t-proto">' +
    '<header class="tile-head" style="border-bottom:1px solid var(--border);padding-bottom:12px">' +
    '<span class="head-ic purple">' + icon('pie', 15) + '</span>' +
    '<div><h3>协议分布</h3><p class="tile-desc">各加密传输协议比例</p></div>' +
    '<span class="head-badge">' + protos.length + ' 种协议</span>' +
    '</header>' +
    '<div style="margin-top:14px">' +
    (donutSegs.length ? donut(donutSegs, '节点总量') : '<p class="empty">暂无节点</p>') +
    '</div>' +
    '<div class="tile-foot" style="justify-content:center"><span>自动匹配最优转换规则协议</span></div>' +
    '</section>' +

    '<section class="tile t-actions">' +
    '<header class="tile-head" style="border-bottom:1px solid var(--border);padding-bottom:12px">' +
    '<span class="head-ic orange">' + icon('zap', 15) + '</span>' +
    '<div><h3>快捷操作</h3><p class="tile-desc">常用管理指令</p></div>' +
    '</header>' +
    '<div class="qa-grid" style="margin-top:14px">' +
    '<button class="qa-item" id="qa-node" type="button"><span class="qa-ic blue">' + icon('plus', 18) + '</span>添加节点</button>' +
    '<button class="qa-item" id="qa-sub" type="button"><span class="qa-ic green">' + icon('link', 18) + '</span>新建订阅</button>' +
    '<button class="qa-item" id="qa-tpl" type="button"><span class="qa-ic purple">' + icon('filecode', 18) + '</span>新建模板</button>' +
    '<button class="qa-item" id="qa-refresh" type="button"><span class="qa-ic orange">' + icon('refresh', 18) + '</span>刷新数据</button>' +
    '</div>' +
    '<div class="qa-tip">' + icon('zap', 15) + '<span>粘贴 ss:// 等分享链接即可快速添加节点</span></div>' +
    '</section>';

  $('#qa-node').addEventListener('click', function () { state.pendingDialog = 'add-node'; location.hash = '#/nodes'; });
  $('#qa-sub').addEventListener('click', function () { state.pendingDialog = 'add-sub'; location.hash = '#/subs'; });
  $('#qa-tpl').addEventListener('click', function () { state.pendingDialog = 'add-tpl'; location.hash = '#/templates'; });
  $('#qa-refresh').addEventListener('click', renderDashboard);
}

function latencyBadge(v) {
  if (!v) return '<span class="lat-badge dim">—</span>';
  if (v < 0) return '<span class="lat-badge lat-bad">超时</span>';
  var cls = v <= 300 ? 'lat-good' : (v <= 800 ? 'lat-mid' : 'lat-slow');
  return '<span class="lat-badge ' + cls + '">' + v + ' ms</span>';
}

function geoBadge(code) {
  if (!code) return '<span class="dim">—</span>';
  var lower = esc(code.toLowerCase());
  return '<span class="geo-flag"><img src="https://flagcdn.com/w40/' + lower + '.png" alt="" onerror="this.style.display=\'none\'"/>' +
    esc(code) + '</span>';
}

function nodeRowHtml(n) {
  return '<tr data-id="' + n.ID + '"><td><b>' + esc(n.Name || '(未命名)') + '</b></td><td>' + latencyBadge(n.Latency) +
    '</td><td><span class="mono truncate" title="' + esc(n.Link) + '">' + esc(n.Link) + '</span></td>' +
    '<td>' + geoBadge(n.Country) + '</td>' +
    '<td class="ops"><button class="iconbtn sm" data-act="edit" aria-label="编辑">' + icon('edit', 14) +
    '</button><button class="iconbtn sm danger" data-act="del" aria-label="删除">' + icon('trash', 14) + '</button></td></tr>';
}

async function renderNodes() {
  var view = $('#view');
  view.innerHTML = '<div class="loading">加载中…</div>';
  try {
    var d = await api('/api/v1/nodes/get');
    state.nodes = d.data || [];
  } catch (e) { view.innerHTML = errorBox(e.message); return; }

  view.innerHTML =
    '<div class="page-bar"><input id="node-search" class="input" placeholder="搜索名称、分组、链接…"/>' +
    '<span class="page-count" id="node-count"></span>' +
    '<div style="margin-left:auto; display:flex; gap:10px">' +
    '<button id="btn-lat-test" class="btn" type="button">' + icon('activity', 15) + '测速</button>' +
    '<button id="btn-geo-test" class="btn" type="button">' + icon('globe', 15) + '国家测试</button>' +
    '<button id="btn-lat-set" class="btn" type="button">' + icon('settings', 15) + '测速设置</button>' +
    '<button id="btn-add-node" class="btn btn-primary" type="button">' + icon('plus', 15) + '添加节点</button>' +
    '</div></div>' +
    '<section class="tile"><table class="table"><thead><tr><th>名称</th><th>延迟</th><th>链接</th><th>国家</th><th class="ops">操作</th></tr></thead>' +
    '<tbody id="node-rows"></tbody></table><p id="node-empty" class="empty" hidden>暂无节点 · 点击右上角「添加节点」粘贴 ss:// vmess:// 等分享链接</p></section>';

  function drawRows(kw) {
    kw = (kw || '').trim().toLowerCase();
    var rows = state.nodes.filter(function (n) {
      if (!kw) return true;
      var gs = (n.GroupNodes || []).map(function (g) { return g.Name; }).join(',');
      return (n.Name || '').toLowerCase().indexOf(kw) >= 0 || (n.Link || '').toLowerCase().indexOf(kw) >= 0 || gs.toLowerCase().indexOf(kw) >= 0;
    });
    $('#node-rows').innerHTML = rows.map(nodeRowHtml).join('');
    $('#node-empty').hidden = rows.length > 0;
    $('#node-count').textContent = rows.length + ' / ' + state.nodes.length;
  }
  drawRows(state.pendingSearch || '');
  if (state.pendingSearch) { $('#node-search').value = state.pendingSearch; state.pendingSearch = null; }
  $('#node-search').addEventListener('input', function (e) { drawRows(e.target.value); });

  $('#btn-add-node').addEventListener('click', openNodeAdd);
  $('#btn-lat-set').addEventListener('click', openLatencySettings);
  $('#btn-geo-test').addEventListener('click', runGeoTest);
  $('#btn-lat-test').addEventListener('click', runLatencyTest);
  $('#node-rows').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]');
    if (!btn) return;
    var tr = btn.closest('tr');
    var node = state.nodes.find(function (n) { return String(n.ID) === tr.dataset.id; });
    if (!node) return;
    if (btn.dataset.act === 'edit') openNodeEdit(node);
    else confirmDlg('确定删除节点「' + (node.Name || node.Link) + '」吗？', '删除', async function () {
      await api('/api/v1/nodes/delete', { method: 'DELETE', query: { id: node.ID } });
      toast('删除成功', true);
      renderNodes();
    });
  });

  if (state.pendingDialog === 'add-node') { state.pendingDialog = null; openNodeAdd(); }
}

function openLatencySettings() {
  dlgOpen('测速设置',
    '<label class="field"><span>延迟测试 URL</span><input id="f-lat-url" class="input" placeholder="https://cp.cloudflare.com/generate_204"/></label>' +
    '<label class="field" style="margin-top:14px"><span>超时时间（毫秒，1-60000）</span><input id="f-lat-timeout" class="input" type="number" min="1" max="60000" value="3000"/></label>' +
    '<label class="field" style="margin-top:14px"><span>IP 查询地址（{ip} 占位，返回含 countryCode 的 JSON）</span><input id="f-lat-geo" class="input mono" placeholder="http://ip-api.com/json/{ip}?fields=countryCode"/></label>' +
    '<p class="pick-hint">国家测试通过节点服务器的 IP 归属查询显示国旗。</p>',
    '保存', async function () {
      await api('/api/v1/nodes/latency/settings', {
        method: 'POST',
        form: {
          url: $('#f-lat-url').value.trim(),
          timeout: $('#f-lat-timeout').value,
          geoUrl: $('#f-lat-geo').value.trim()
        }
      });
      toast('测速设置已保存', true);
    }, { noFocus: true });
  api('/api/v1/nodes/latency/settings').then(function (d) {
    $('#f-lat-url').value = d.data.url;
    $('#f-lat-timeout').value = d.data.timeout;
    $('#f-lat-geo').value = d.data.geoUrl;
  }).catch(function () {});
}

async function runGeoTest() {
  toast('正在查询节点国家，请稍候…', true);
  try {
    await api('/api/v1/nodes/latency/geo', { method: 'POST' });
    toast('国家测试完成', true);
  } catch (e) {
    toast('国家测试失败：' + e.message, false);
  }
  renderNodes();
}

async function runLatencyTest() {
  toast('正在测速，请稍候…', true);
  try {
    await api('/api/v1/nodes/latency/test', { method: 'POST' });
    toast('测速完成', true);
  } catch (e) {
    toast('测速失败：' + e.message, false);
  }
  renderNodes();
}

function openNodeAdd() {
  dlgOpen('添加节点',
    '<label class="field"><span>节点链接 *</span><textarea id="f-link" class="input" rows="3" placeholder="ss:// 或 vmess:// 等，支持用逗号分隔多条"></textarea></label>' +
    '<label class="field"><span>名称</span><input id="f-name" class="input" placeholder="留空自动从链接解析"/></label>',
    '添加', async function () {
      var link = $('#f-link').value.trim();
      if (!link || link.indexOf('://') < 0) throw new Error('链接不能为空，且需包含协议头（如 ss://）');
      await api('/api/v1/nodes/add', { method: 'POST', form: { link: link, name: $('#f-name').value.trim(), group: '' } });
      toast('添加成功', true);
      renderNodes();
    });
}

function openNodeEdit(node) {
  dlgOpen('编辑节点',
    '<label class="field"><span>名称</span><input id="f-name" class="input" value="' + esc(node.Name) + '"/></label>' +
    '<label class="field"><span>链接</span><textarea id="f-link" class="input" rows="3">' + esc(node.Link) + '</textarea></label>',
    '保存', async function () {
      var name = $('#f-name').value.trim(), link = $('#f-link').value.trim();
      if (!name || !link) throw new Error('名称和链接不能为空');
      await api('/api/v1/nodes/update', { method: 'POST', form: { id: node.ID, name: name, link: link, group: '' } });
      toast('更新成功', true);
      renderNodes();
    });
}

/* ================= 订阅管理 ================= */
function subLink(name) { return location.origin + '/c/?token=' + md5(name); }

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () { toast('已复制', true); }, function () { toast('复制失败', false); });
  } else {
    var ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('已复制', true); } catch (e) { toast('复制失败', false); }
    document.body.removeChild(ta);
  }
}

async function renderSubs() {
  var view = $('#view');
  view.innerHTML = '<div class="loading">加载中…</div>';
  try {
    var d = await api('/api/v1/subcription/get');
    state.subs = d.data || [];
  } catch (e) { view.innerHTML = errorBox(e.message); return; }

  var rows = state.subs.map(function (s) {
    var count = (s.SubLogs || []).reduce(function (sum, l) { return sum + (l.Count || 0); }, 0);
    return '<tr data-id="' + s.ID + '"><td><b>' + esc(s.Name) + '</b></td><td class="num">' + (s.Nodes || []).length +
      '</td><td class="num">' + num(count) + '</td>' +
      '<td><span class="mono truncate" title="' + esc(subLink(s.Name)) + '">/c/?token=' + md5(s.Name) + '</span>' +
      '<button class="mini-btn" data-act="copy" title="复制通用链接（v2ray 格式）">通用</button>' +
      '<button class="mini-btn" data-act="copy-clash" title="复制 Clash 完整配置链接">Clash</button>' +
      '<button class="mini-btn" data-act="copy-surge" title="复制 Surge 完整配置链接">Surge</button>' +
      '<button class="mini-btn" data-act="open" title="打开 Clash 配置查看">打开</button></td>' +
      '<td class="ops"><button class="iconbtn sm" data-act="edit" aria-label="编辑">' + icon('edit', 14) +
      '</button><button class="iconbtn sm danger" data-act="del" aria-label="删除">' + icon('trash', 14) + '</button></td></tr>';
  }).join('');

  view.innerHTML =
    '<div class="page-bar"><span class="page-count">共 ' + state.subs.length + ' 个订阅 · Clash 客户端会自动识别链接，也可复制带 client 参数的链接强制指定格式</span>' +
    '<button id="btn-add-sub" class="btn btn-primary" type="button">' + icon('plus', 15) + '新建订阅</button></div>' +
    '<section class="tile"><table class="table"><thead><tr><th>订阅名</th><th class="num">节点数</th><th class="num">访问次数</th><th>订阅链接</th><th class="ops">操作</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table>' +
    (rows ? '' : '<p class="empty">暂无订阅 · 点击右上角「新建订阅」选择节点生成订阅链接</p>') + '</section>';

  $('#btn-add-sub').addEventListener('click', function () { openSubDlg(null); });
  view.querySelector('tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]');
    if (!btn) return;
    var tr = btn.closest('tr');
    var sub = state.subs.find(function (s) { return String(s.ID) === tr.dataset.id; });
    if (!sub) return;
    switch (btn.dataset.act) {
      case 'copy': copyText(subLink(sub.Name)); break;
      case 'copy-clash': copyText(subLink(sub.Name) + '&client=clash'); break;
      case 'copy-surge': copyText(subLink(sub.Name) + '&client=surge'); break;
      case 'open': window.open('/c/?token=' + md5(sub.Name) + '&client=clash', '_blank'); break;
      case 'edit': openSubDlg(sub); break;
      case 'del':
        confirmDlg('确定删除订阅「' + sub.Name + '」吗？删除后客户端将无法再拉取该订阅。', '删除', async function () {
          await api('/api/v1/subcription/delete', { method: 'DELETE', query: { id: sub.ID } });
          toast('删除成功', true);
          renderSubs();
        });
        break;
    }
  });

  if (state.pendingDialog === 'add-sub') { state.pendingDialog = null; openSubDlg(null); }
}

function subDlgBody(name, clash, surge, udp, cert) {
  return '<label class="field"><span>订阅名称 *</span><input id="f-subname" class="input" value="' + esc(name || '') + '" placeholder="订阅名"/>' +
    '</label>' +
    '<p class="pick-hint">订阅自动包含全部节点（当前 <b>' + state.nodes.length + '</b> 个），后续新增/删除节点无需修改订阅。</p>' +
    '<div class="config-grid">' +
    '<label class="field"><span>Clash 模板</span><input id="f-clash" class="input" value="' + esc(clash || 'clash.yaml') + '"/></label>' +
    '<label class="field"><span>Surge 模板</span><input id="f-surge" class="input" value="' + esc(surge || 'surge.conf') + '"/></label>' +
    '</div>' +
    '<div style="display:flex; gap:20px; margin-top:4px">' +
    '<label style="display:flex;align-items:center;gap:8px;font-size:12.5px;cursor:pointer"><input type="checkbox" id="f-udp"' + (udp ? ' checked' : '') + '/>允许 UDP</label>' +
    '<label style="display:flex;align-items:center;gap:8px;font-size:12.5px;cursor:pointer"><input type="checkbox" id="f-cert"' + (cert ? ' checked' : '') + '/>跳过证书验证</label>' +
    '</div>';
}

async function openSubDlg(sub) {
  var isEdit = !!sub;
  /* 订阅自动包含全部节点，确保节点列表已加载 */
  try {
    var nd = await api('/api/v1/nodes/get');
    state.nodes = nd.data || [];
  } catch (e) {
    toast('获取节点列表失败：' + e.message, false);
    return;
  }
  var cfg = {};
  if (isEdit) { try { cfg = JSON.parse(sub.Config || '{}'); } catch (e) {} }

  dlgOpen(isEdit ? '编辑订阅' : '新建订阅',
    subDlgBody(sub ? sub.Name : '', cfg.clash, cfg.surge, cfg.udp, cfg.cert),
    isEdit ? '保存' : '创建', async function () {
      var name = $('#f-subname').value.trim();
      if (!name) throw new Error('订阅名称不能为空');
      if (!state.nodes.length) throw new Error('暂无节点，请先到节点管理添加节点');
      var config = JSON.stringify({
        clash: $('#f-clash').value.trim() || 'clash.yaml',
        surge: $('#f-surge').value.trim() || 'surge.conf',
        udp: $('#f-udp').checked,
        cert: $('#f-cert').checked
      });
      var allNames = state.nodes.map(function (n) { return n.Name; }).join(',');
      if (isEdit) {
        await api('/api/v1/subcription/update', { method: 'POST', form: { name: name, oldname: sub.Name, config: config, nodes: allNames } });
        toast('更新成功', true);
      } else {
        await api('/api/v1/subcription/add', { method: 'POST', form: { name: name, config: config, nodes: allNames } });
        toast('创建成功', true);
      }
      renderSubs();
    }, { noFocus: false });
}

/* ================= 模板配置 ================= */
async function renderTemplates() {
  var view = $('#view');
  view.innerHTML = '<div class="loading">加载中…</div>';
  try {
    var d = await api('/api/v1/template/get');
    state.templates = d.data || [];
  } catch (e) { view.innerHTML = errorBox(e.message); return; }

  var rows = state.templates.map(function (t) {
    return '<tr><td><b class="mono">' + esc(t.file) + '</b></td><td class="dim">' + esc(t.create_date || '') +
      '</td><td class="ops"><button class="iconbtn sm" data-act="edit" aria-label="编辑">' + icon('edit', 14) +
      '</button><button class="iconbtn sm danger" data-act="del" aria-label="删除">' + icon('trash', 14) + '</button></td></tr>';
  }).join('');

  view.innerHTML =
    '<div class="page-bar"><span class="page-count">模板目录 ./template · Clash / Surge 模板可在线编辑</span>' +
    '<button id="btn-add-tpl" class="btn btn-primary" type="button">' + icon('plus', 15) + '新建模板</button></div>' +
    '<section class="tile"><table class="table"><thead><tr><th>文件名</th><th>修改时间</th><th class="ops">操作</th></tr></thead>' +
    '<tbody id="tpl-rows">' + rows + '</tbody></table>' +
    (rows ? '' : '<p class="empty">暂无模板文件</p>') + '</section>';

  $('#btn-add-tpl').addEventListener('click', function () { openTplDlg(null); });
  $('#tpl-rows').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]');
    if (!btn) return;
    var tr = btn.closest('tr');
    var file = tr.querySelector('b').textContent;
    var tpl = state.templates.find(function (t) { return t.file === file; });
    if (!tpl) return;
    if (btn.dataset.act === 'edit') openTplDlg(tpl);
    else confirmDlg('确定删除模板「' + tpl.file + '」吗？', '删除', async function () {
      await api('/api/v1/template/delete', { method: 'POST', form: { filename: tpl.file } });
      toast('删除成功', true);
      renderTemplates();
    });
  });

  if (state.pendingDialog === 'add-tpl') { state.pendingDialog = null; openTplDlg(null); }
}

function openTplDlg(tpl) {
  var isEdit = !!tpl;
  dlgOpen(isEdit ? '编辑模板' : '新建模板',
    '<label class="field"><span>文件名 *</span><input id="f-filename" class="input" value="' + esc(isEdit ? tpl.file : '') + '" placeholder="如 clash.yaml"/></label>' +
    '<label class="field"><span>内容 *</span><textarea id="f-text" class="input" rows="16" placeholder="模板内容（YAML / CONF）">' + esc(isEdit ? tpl.text : '') + '</textarea></label>',
    '保存', async function () {
      var filename = $('#f-filename').value.trim(), text = $('#f-text').value;
      if (!filename || filename.indexOf('/') >= 0 || filename.indexOf('\\') >= 0) throw new Error('文件名不能为空且不能包含路径分隔符');
      if (!text.trim()) throw new Error('内容不能为空');
      if (isEdit) {
        await api('/api/v1/template/update', { method: 'POST', form: { filename: filename, oldname: tpl.file, text: text } });
        toast('保存成功', true);
      } else {
        await api('/api/v1/template/add', { method: 'POST', form: { filename: filename, text: text } });
        toast('创建成功', true);
      }
      renderTemplates();
    });
}

/* ================= 系统设置 ================= */
async function renderSettings() {
  var view = $('#view');
  var me = state.me || {};
  var tgInfo = null;
  try {
    var d = await api('/api/v1/telegram/info');
    tgInfo = d.data || {};
  } catch (e) {}
  var tgConfigured = tgInfo && tgInfo.configured;

  view.innerHTML =
    '<section class="tile" style="grid-column:span 6">' +
    '<header class="tile-head" style="border-bottom:1px solid var(--border);padding-bottom:12px">' +
    '<span class="head-ic blue">' + icon('check', 15) + '</span><h3>账号信息</h3>' +
    '<span class="head-badge">' + ((me.roles || [])[0] || 'ADMIN') + '</span>' +
    '</header>' +
    '<div style="display:flex; align-items:center; gap:16px; padding:16px 0 18px">' +
    '<label class="avatar-upload" title="点击更换头像">' +
    (me.avatar ? '<img class="avatar avatar-lg avatar-img" src="' + esc(me.avatar) + '" alt="头像"/>'
               : '<span class="avatar avatar-lg">' + esc((me.username || 'A').charAt(0).toUpperCase()) + '</span>') +
    '<input id="f-avatar" type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden/>' +
    '</label>' +
    '<div><p style="font-size:17px;font-weight:600">' + esc(me.username || '') + '</p>' +
    '<p style="font-size:12px;color:var(--muted);margin-top:2px">' + esc(me.nickname || '') + '</p></div></div>' +
    '<div class="tile-foot"><span>点击头像可更换（png / jpg / webp / gif，≤ 2MB）</span></div>' +
    '</section>' +
    '<section class="tile" style="grid-column:span 6"><header class="tile-head"><h3>修改账号密码</h3></header>' +
    '<form id="pwd-form" style="max-width:340px">' +
    '<label class="field"><span>新账号</span><input id="f-user" class="input" value="' + esc(me.username || '') + '" required/></label>' +
    '<label class="field" style="margin-top:14px"><span>新密码</span><input id="f-pass" class="input" type="password" required/></label>' +
    '<p class="form-error" id="pwd-error" hidden></p>' +
    '<button class="btn btn-primary" type="submit" style="margin-top:14px">保存并重新登录</button>' +
    '</form></section>' +
    '<section class="tile" style="grid-column:1/-1"><header class="tile-head">' +
    '<span class="head-ic blue">' + icon('link', 14) + '</span><h3>Telegram 机器人</h3>' +
    '<span class="chip ' + (tgConfigured ? '' : 'neutral') + '" style="margin-left:auto">' + (tgConfigured ? '已启用' : '未配置') + '</span>' +
    '</header>' +
    '<p style="font-size:12px;color:var(--muted);margin-bottom:12px">通过 @BotFather 创建机器人获取 Token。启用后可在 Telegram 中使用：/add 添加节点、/list 节点列表、/test 连通性测试、/del 删除节点、/sub 获取订阅链接。首次对话自动绑定会话（仅绑定者可用）。' +
    (tgConfigured && tgInfo.chatId ? '当前绑定会话 ID：<code>' + esc(String(tgInfo.chatId)) + '</code>' : '') +
    '</p>' +
    '<form id="tg-form" style="max-width:560px">' +
    '<label class="field"><span>Bot Token' + (tgConfigured ? '（已配置，留空保持不变）' : ' *') + '</span><input id="f-tg-token" class="input mono" autocomplete="off" placeholder="如 123456789:AAxxxx..." value=""/></label>' +
    '<div class="config-grid" style="margin-top:14px">' +
    '<label class="field"><span>订阅链接地址</span><input id="f-tg-host" class="input" placeholder="可含协议前缀，如 https://sub.example.com:2022" value="' + esc(tgConfigured && tgInfo.serverHost ? tgInfo.serverHost : location.host) + '"/></label>' +
    '<label class="field"><span>代理地址（可选）</span><input id="f-tg-proxy" class="input" placeholder="直连留空；如 http://127.0.0.1:7897" value="' + esc(tgConfigured && tgInfo.proxy ? tgInfo.proxy : '') + '"/></label>' +
    '</div>' +
    '<p class="form-error" id="tg-error" hidden></p>' +
    '<div style="display:flex; gap:10px; margin-top:14px">' +
    '<button class="btn btn-primary" type="submit">保存并生效</button>' +
    '</div></form></section>';

  $('#pwd-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    var err = $('#pwd-error');
    err.hidden = true;
    try {
      await api('/api/v1/users/update', { method: 'POST', form: { username: $('#f-user').value.trim(), password: $('#f-pass').value } });
      toast('修改成功，请使用新账号重新登录', true);
      setTimeout(logoutLocal, 800);
    } catch (ex) {
      err.textContent = ex.message; err.hidden = false;
    }
  });

  /* 头像上传 */
  $('#f-avatar').addEventListener('change', async function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var fd = new FormData();
    fd.append('avatar', file);
    try {
      var res = await fetch('/api/v1/users/avatar', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + state.token },
        body: fd
      });
      var d = await res.json();
      if (!res.ok) throw new Error(d.msg || '上传失败');
      state.me.avatar = d.data.avatar;
      toast('头像已更新', true);
      applyAvatar('top-avatar', state.me);
      applyAvatar('side-avatar', state.me);
      renderSettings();
    } catch (ex) {
      toast('头像上传失败：' + ex.message, false);
    }
    e.target.value = '';
  });

  $('#tg-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    var err = $('#tg-error');
    err.hidden = true;
    try {
      await api('/api/v1/telegram/set', {
        method: 'POST',
        form: {
          token: $('#f-tg-token').value.trim(),
          serverHost: $('#f-tg-host').value.trim(),
          proxy: $('#f-tg-proxy').value.trim()
        }
      });
      toast('Telegram Bot 已保存并生效，去 Telegram 给机器人发 /start 试试', true);
      renderSettings();
    } catch (ex) {
      err.textContent = ex.message; err.hidden = false;
    }
  });
}

/* ================= 操作日志 ================= */
async function renderLogs() {
  var view = $('#view');
  view.innerHTML = '<div class="loading">加载中…</div>';
  try {
    var d = await api('/api/v1/logs/get?limit=200');
    var logs = d.data || [];
    var srcColors = { '面板': 'blue', 'Telegram': 'purple', '系统': 'green' };
    var rows = logs.map(function (l) {
      return '<tr><td class="dim mono">' + esc(l.Time) + '</td>' +
        '<td><span class="chip ' + (l.Source === 'Telegram' ? '' : 'neutral') + '">' + esc(l.Source) + '</span></td>' +
        '<td><b>' + esc(l.Action) + '</b></td>' +
        '<td class="dim truncate" style="max-width:420px" title="' + esc(l.Detail) + '">' + esc(l.Detail || '—') + '</td></tr>';
    }).join('');
    view.innerHTML =
      '<div class="page-bar"><span class="page-count">记录面板、Telegram 机器人与系统的关键操作，最多保留最近 200 条</span>' +
      '<button id="btn-clear-logs" class="btn btn-danger" type="button">' + icon('trash', 15) + '清空日志</button></div>' +
      '<section class="tile"><table class="table"><thead><tr><th>时间</th><th>来源</th><th>操作</th><th>详情</th></tr></thead>' +
      '<tbody id="log-rows">' + rows + '</tbody></table>' +
      (rows ? '' : '<p class="empty">暂无操作日志</p>') + '</section>';
    $('#btn-clear-logs').addEventListener('click', function () {
      confirmDlg('确定清空全部操作日志吗？', '清空', async function () {
        await api('/api/v1/logs/clear', { method: 'POST' });
        toast('日志已清空', true);
        renderLogs();
      });
    });
  } catch (e) {
    view.innerHTML = errorBox(e.message);
  }
}

/* ================= 启动 ================= */
function bindStaticEvents() {
  $('#login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    var err = $('#lg-error');
    err.hidden = true;
    var btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    try {
      var d = await api('/api/v1/auth/login', {
        method: 'POST',
        form: {
          username: $('#lg-user').value.trim(),
          password: $('#lg-pass').value
        }
      });
      setToken(d.data.accessToken);
      await enterApp();
      toast('登录成功', true);
    } catch (ex) {
      err.textContent = ex.message || '登录失败';
      err.hidden = false;
    } finally {
      btn.disabled = false;
    }
  });

  $('#btn-logout').addEventListener('click', async function () {
    try { await api('/api/v1/auth/logout', { method: 'DELETE' }); } catch (e) {}
    logoutLocal();
    toast('已退出登录', true);
  });

  $('#btn-refresh').addEventListener('click', function () { route(); toast('数据已刷新', true); });
  $('#btn-theme').addEventListener('click', cycleTheme);

  /* 侧栏状态卡时钟 */
  function tickClock() {
    var el = document.getElementById('side-clock');
    if (el) el.textContent = new Date().toLocaleTimeString('zh-CN', { hour12: false });
  }
  tickClock();
  setInterval(tickClock, 1000);
  /* 全局搜索：Enter 跳转到节点管理并带入关键词 */
  $('#gs-input').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var kw = e.target.value.trim();
    state.pendingSearch = kw || null;
    if (location.hash === '#/nodes') renderNodes();
    else location.hash = '#/nodes';
    e.target.blur();
  });

  window.addEventListener('hashchange', route);
}

async function boot() {
  paintIcons(document);
  state.theme = localStorage.getItem('sx-theme') || 'auto';
  applyTheme();
  bindStaticEvents();

  var saved = localStorage.getItem('accessToken') || '';
  if (saved) state.token = saved.replace(/^Bearer\s+/i, '');

  if (state.token) {
    try {
      await enterApp();
      return;
    } catch (e) {
      state.token = null;
      localStorage.setItem('accessToken', '');
    }
  }
  showLogin();
}

boot();
