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
  globe: '<circle cx="12" cy="12" r="10"/><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/>',
  pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  zap2: '<polygon points="13 2 3 14 10 14 11 22 21 10 14 10 15 2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
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
  var sv = document.getElementById('side-ver');
  if (sv && state.version) sv.textContent = state.version;
  $('#login-view').hidden = true;
  $('#app-view').hidden = false;
  if (!location.hash) location.hash = '#/dashboard';
  route();
  checkUpdate();
  if (!checkUpdate._tm) checkUpdate._tm = setInterval(checkUpdate, 30 * 60 * 1000);
}

/* ================= 更新检查 ================= */
// 检查新版本，有更新时在侧栏系统服务卡片显示提示
async function checkUpdate() {
  var el = document.getElementById('side-update');
  if (!el) return;
  try {
    var d = await api('/api/v1/version/check');
    var info = d.data || {};
    if (info.hasUpdate && info.latest) {
      document.getElementById('side-update-text').textContent =
        '新版本 v' + info.latest + ' 可用';
      el.href = info.url || 'https://github.com/xyswordzoro/sublinkX/releases/latest';
      el.title = info.notes ? (info.latest + '：' + info.notes) : '打开 Release 页面';
      el.hidden = false;
    } else {
      el.hidden = true;
    }
  } catch (e) { /* 检查失败不打扰用户 */ }
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

/* 国旗小图（Windows 无旗帜 emoji 字形，统一用 flagcdn 图片；属性用单引号以便嵌入 data-tip） */
function flagImg(code) {
  return '<img class=\'cf-img\' alt=\'\' src=\'https://flagcdn.com/w20/' +
    esc(String(code).toLowerCase()) + '.png\' onerror=\'this.remove()\'/>';
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

/* 世界地图分布：等距圆柱投影精简轮廓（720x326，已裁南极），零外部依赖 */
var WORLD_W = 720, WORLD_H = 326, WORLD_LAT_TOP = 84, WORLD_LAT_BOT = -58;
var WORLD_PATH = 'M720 229.7L717.5 231.9L718.8 230.4L720 229.7ZM716.3 233L717.1 234.5L714.8 234.5L715.3 232.7L716.3 233ZM0.4 229.6L0 230.9L0 229.7L0.4 229.6ZM427.8 195L438.4 203.6L438.4 212.3L440.6 216.5L439 217.9L433 219.8L429.1 219.3L427.5 214.5L421.5 212L418.7 203.2L421.5 200.6L420.8 195.4L423.7 195.2L427.8 195ZM342.7 129.4L342.6 133.4L336.1 133.3L336.1 139.2L334.3 139.4L334.1 143.9L325.9 144.6L330.5 143.5L337.2 131.1L342.4 130.6L342.4 129.4L342.7 129.4ZM114.3 80.4L105.1 76.1L104.3 72.7L99 68.2L100 64.5L96.6 63L89 55.6L85.1 57.6L78 54.4L78 32.8L87 34.7L100.4 31.7L101.8 32.6L103.7 31L108.5 33.3L111.2 31.8L111.4 33.5L117.1 32.6L129.5 34.7L132.2 35.8L129.4 37L133 37.4L140.1 36.8L142.2 38.2L144.4 37L142.4 36L143.7 35.2L147.7 34.9L157.1 37.5L163.1 37.2L162.9 35.8L164.7 35.4L167.8 36.2L167.7 38.4L171.5 34.3L167.1 31.9L167.2 29.4L169.6 27.7L174.2 29.1L177 31.7L175.2 32.8L178.9 33.3L178.9 35.6L181.6 33.8L184 35.3L183.4 37L185.3 38.6L188.8 34.9L189 32.4L194.8 32.9L197.4 34.1L196.1 36.4L197.2 38.8L193.3 40.4L188.5 40L185.4 44.1L178.6 46.8L178.5 48.3L176.1 48.6L171.5 53L170.6 57.5L173.6 57.9L175.4 61.8L178.2 61.3L190 65.9L195.5 66.2L195.7 70.5L200.2 75.3L202.8 72.2L200.3 67.3L206.9 63.1L203 57.8L205.3 55.4L203.8 49.8L212.3 49.5L217.3 52.5L220.8 52.7L221.4 57.5L224.7 59.2L230.8 54.3L237.2 62.1L236.4 63.5L245.3 67.4L248.5 70.5L248.6 73.1L239.9 77.5L227.2 77.5L217.8 85.4L222.7 82L229.9 79.8L231.7 80.9L229.8 82.5L231.1 86.7L237 87.5L239 84.9L240.4 87.4L237.9 88.9L227.8 92.7L227.7 90.8L231.1 88.9L225.7 89.2L224.4 84.8L221.5 83.9L217 89.5L210.3 89.5L206.4 92.7L202.6 92.7L202.1 94.4L195.1 97.2L193.7 96.5L195.7 92.8L194.9 88.7L183.2 82L176.7 82.3L171.3 81.1L170.4 79.5L120 80.4L114.3 80.4ZM192 49.5L196.2 48.4L192.5 50.1L192 49.5ZM200.4 25.7L198.3 23.7L203.9 23.8L207.5 25.7L201 25.8L200.4 25.7ZM199.4 50.3L201.5 50.1L200.7 51.3L199.3 50.5L199.4 50.3ZM172.8 20.7L166.4 20.8L170.3 19.2L172 20L172.8 20.7ZM172.3 14.9L167.1 14.2L172.6 14.6L172.3 14.9ZM166.5 12L168.9 12.8L165.4 14.1L162.7 11.8L165.3 11.9L166.5 12ZM183.7 22.1L175.2 21L172.2 17.6L165.8 16.6L176.8 16.6L181.6 19.3L197.7 19L200.3 20.8L187.8 22L183.7 22.1ZM137.5 13.4L140.3 13.8L132.9 14.4L134.6 13.7L137.5 13.4ZM138.1 11.9L140.7 12.4L134.9 12.8L137 11.8L138.1 11.9ZM248.8 75L246.4 78.5L247.7 77.7L253 79.8L252.4 81.5L253.8 81.1L254.7 83.7L253.9 85.7L251.6 85.4L251.5 83.2L249.2 85.2L247.5 83.5L241.2 82.9L245.3 76.4L249.2 74.4L248.8 75ZM192.2 43.4L199.8 46.5L193.8 45.7L189 48.1L188.3 46.7L185.6 47L187.3 45.8L188.2 41.9L191.1 42.8L192.2 43.4ZM202.5 26.7L204.4 25.8L211.8 29.1L215.5 28.6L222.4 30.9L226.1 34L222.4 35.1L236.3 39.3L235.7 41L232.2 43.6L226.6 40.4L224 40.7L223.7 42L229.4 45L230.7 47.3L230 49L222.4 46.5L227.7 50.7L218 48.4L210.3 44.4L204.6 45.4L202.9 44.6L204.2 42.9L212.1 42.6L214.1 37.4L202.1 31.8L197.4 32.7L182.6 31.2L181 30.4L183.1 29.3L180.2 29.3L179.6 27L183.2 24L188.3 23.4L186.9 24.9L188.5 26.3L190.3 24.5L195.4 23.5L198.8 25.9L198.5 27.4L202.5 26.7ZM171 22.6L179 23.3L171.5 27.5L169.2 27.4L167.9 25.4L169 23.3L171 22.6ZM114.3 18.1L121.8 14.9L127.6 14.6L125.8 17.1L117 18.6L114.3 18.1ZM94.6 68.8L96.5 68.6L95.9 71.2L97.6 73.1L93.6 68.5L94.6 68.8ZM149 10.8L158.3 11.9L160.7 14L149.6 12.9L151.6 12.2L149.2 11.7L149 10.8ZM113 81.5L108.7 80.8L103.3 76.3L108.5 77.4L112.2 80.2L113 81.5ZM116.9 21.9L129 24.2L113.8 30.1L108.1 27.9L112.1 23.7L110.2 22.3L116.9 21.9ZM144.4 18.7L148.2 18.4L148.6 19.6L135.6 22L132.3 21.3L136.4 20.3L124.6 20.2L129.2 17.3L141.9 19.6L139 17.4L140.8 16.5L143.6 17.9L144.4 18.7ZM147 25.1L149.2 26L151.1 29.9L158 32.1L157.8 33.1L154.5 33.3L155.1 35L148.1 34L133.4 35.5L125.3 32.2L135.2 31.3L124.2 30.9L123.1 30.1L127.8 29.1L121.2 28.6L124.3 25.9L129.6 24.5L131.7 25L130.7 26.1L137.9 26.5L140.2 25.3L143.6 28.4L144.6 27.4L143.2 25L145 24.7L147 25.1ZM159.1 25.9L156.9 24.4L165.2 23.5L163.9 25.3L166.9 26.3L166.6 28.3L161.4 29L155 25.6L159.1 25.9ZM146.8 23.9L151 24.3L149.2 25.8L146.1 24.2L146.8 23.9ZM163 16.7L164.5 17.8L163.7 20.7L155 19.4L154.9 17.6L162.8 17L163 16.7ZM168 7.8L175.2 6.3L188.4 10.7L181.9 13.1L174.2 13L172.1 12.1L173.7 10.6L166.6 8.8L168 7.8ZM176.8 4.8L201.4 2L236.3 3.1L224.7 5.7L229 5.7L217.6 9.6L206.2 10.7L208.9 11L207.6 11.4L209.2 12.6L200.5 15.6L204.2 16.6L198.9 18L181 17.3L180.8 16.2L184.5 15.7L183.5 14L190 14.8L184.1 12.9L189.8 10.7L186.1 8.6L196.3 8.1L184.8 8L177.3 5.6L176.8 4.8ZM209.6 38L206 38.8L205.5 37.7L208.2 36.1L209.8 37.7L209.6 38ZM167.5 33.3L168.7 34.2L167.5 35L160.4 33.5L163.6 31.8L166.9 32.9L167.5 33.3ZM231 78.3L236.4 80.1L232.8 79.4L231 78.3ZM232 84.9L236 86.2L234.3 87.3L231.2 85.6L232 84.9ZM114.3 80.4L170.4 79.5L171.3 81.1L176.7 82.3L183.2 82L194.9 88.7L194.6 97.2L202.1 94.4L202.6 92.7L206.4 92.7L210.3 89.5L217 89.5L221.5 83.9L224.4 84.8L226.1 90L219.8 92.6L218.3 95.7L220.1 97.3L212.6 98.9L216.1 98.9L212.1 99.3L210.2 103.4L208.9 102.2L209.9 104.7L208.1 107.4L207.3 103L207.3 105.4L206 105.1L208.5 111.2L197.3 120.7L199.9 131.1L199.2 135L196.6 133.5L192.6 124.1L189.8 124.8L187.2 123.1L180.8 123.6L181.2 125.9L170.6 125.2L165.7 129L164.9 133.5L162 132.3L158.1 125.4L152.1 125.6L147 119.9L138 120.9L130.6 117.7L125.7 118.2L123 114.7L118.8 113.4L111.2 100.3L112.2 88.3L110.6 82.2L113.8 82.6L114.8 84.7L115 82.2L114.3 80.4ZM49.2 146.7L50.4 148.1L48.6 149.4L48.4 146.4L49.2 146.7ZM43.9 143L44.6 144L43.4 143.3L43.9 143ZM27.1 54.2L28.8 55.3L25.1 54.6L27.1 54.2ZM53.5 59.8L55.7 60.6L52 62.6L50.7 60.9L52.5 60.1L53.5 59.8ZM78 32.8L78 54.4L85.1 57.6L89 55.6L96.6 63L100 64.5L98.9 67L96.1 65.4L91.8 59.4L86.7 59.2L80.3 56.2L65.8 53.1L63.6 53.6L64 55.1L56.6 57L58.8 52.1L52 56.6L53.4 57.7L51.5 59.4L43.1 64.3L30.1 67.6L42.6 61.9L45.9 57.6L36.1 58.1L35 55.1L29.3 53.9L27.8 51.7L28.5 50.3L30.9 47.9L38.5 46.5L37 45L38.4 44.1L30.1 44.9L23.8 42.1L31.1 40L36.6 41.1L26.5 35.9L27.6 34.7L46.8 29L78 32.8L78 32.8ZM16.5 46.4L22.6 47.5L16.4 47.3L16.5 46.4ZM534.7 79.9L531.5 81.6L530.3 84.9L526.4 84.2L524.9 88.3L519.9 89.7L521.7 93.7L520.5 95.6L508.4 93.4L507 95.3L502.4 94.8L497.3 99.5L493.4 98.3L492.2 94.1L489.8 92.5L484 93L477 88.2L471.9 89.5L471.9 98L468.2 95.7L465 96.9L465 94.6L462.7 93.8L460.6 90.4L466.1 88.9L466.1 85.3L458.2 86.3L452.9 81.7L455.1 77L457.2 78.3L457.4 76.7L461.5 74.2L471.4 76.6L482.7 76.2L483.2 75.1L479.9 73.6L483.4 71.2L482 69.6L482.9 68.9L498.1 65.7L501.7 66.2L502.4 68.6L507 68.8L506.9 70L513.8 67.7L513.1 68.5L520.1 76.1L521.1 74.9L526.8 75.6L531.1 78.8L533.7 78.5L534.7 79.9ZM471.9 98L471.9 89.5L477 88.2L484 93L489.8 92.5L492.2 94.1L493.4 98.3L496.5 99.5L501.9 95.8L500.8 97.5L506.1 99L503.5 100.7L501.2 100.5L501.3 98.8L498.7 99.3L497.1 102.1L495.4 102L496.8 105.2L495.7 107.6L493 107.1L493.1 105.7L477.3 94.7L473.9 96.8L474.2 98L471.9 98ZM642 198.8L649.2 201.7L652 205.4L655.3 206.8L654.4 209.8L661.4 217.1L655.8 216.1L652.1 211.4L649.5 210.4L645.3 214.3L642.1 213.8L642 206.3L642 198.8ZM665.3 201.2L665.7 203.8L661.3 199.1L664.5 200.3L665.3 201.2ZM662.6 206.3L659.4 207.3L656.6 206L660.3 204.3L661.6 205.4L664.3 202.4L662.9 205.6L662.6 206.3ZM669.5 205.1L671.8 208.5L669.3 204.4L669.5 205.1ZM642 198.8L642.1 213.8L640.3 211.9L635.2 212.2L637.3 209.7L635.9 205.2L627.3 201L626 202.3L624 199.3L627.4 197.9L624.5 197.9L621 195L624.8 193.7L628 194.6L628.8 199.2L630.9 200.6L634.9 196.8L639.9 198.4L642 198.8ZM609.9 213.3L607.2 216.6L608 214.2L609.9 213.3ZM628.4 208.7L629 205.3L629.4 207.1L628.4 208.7ZM595.8 183.3L594.6 185.4L598 190.8L595.6 191L592.3 202.1L580.4 199.6L577.9 191.9L579.3 188.2L581 191.1L589.2 189.6L591.7 183L594 183L595.8 183.3ZM618.7 199.3L621.7 201.7L615.8 200.6L616.3 199.4L618.7 199.3ZM613.7 201.5L612 200.1L614.5 200.8L613.7 201.5ZM615.9 187.9L617.4 190.2L616.2 194.9L615.2 188.7L615.9 187.9ZM605.9 190.8L610.5 189.6L607.4 192.3L600.4 192.3L600.1 194L601.9 196.1L606.7 194.3L603 197.2L606.3 205.1L604.5 205L605.4 203.1L603 203.3L601.9 198.9L600.6 199.6L600.9 205.5L599.6 205.9L597.5 199.3L600.1 191.5L601.8 189.8L603.3 190.5L605.9 190.8ZM600.6 216.4L597.9 214.8L599.8 214.3L601.4 216.4L600.6 216.4ZM602.7 212.4L605.8 211.4L605.5 212.7L599.8 213.1L601.4 211.8L602.7 212.4ZM596.5 212L598.3 212.8L593.5 213.6L595.8 211.4L596.5 212ZM577 207.6L585.2 208.8L591.4 212.1L589.1 212.9L570.7 208.6L572.1 206.4L576.1 207.4L577 207.6ZM568.7 195.3L572.2 199.9L571.6 206.3L569.4 206.3L565.2 202.5L550.6 180.3L555 180.8L567.7 192.6L566.9 194.5L568 195.3L568.7 195.3ZM222.7 313.7L224.5 316.5L229.9 318.4L227.1 319.7L222.7 318.8L222.7 313.7ZM244.7 262.2L243 271.9L245.5 273.9L246.4 277.6L241.5 281.7L235.3 282L235.7 286.2L234.5 287L229.8 287.1L230 289.4L233.1 290.6L229.6 292.7L228.9 296.2L225.4 297.4L224.8 299.1L228.7 301.3L221.7 309.3L223.7 313L216.2 312.2L213.2 306.1L215.3 303.6L217.6 295.7L215.7 289.9L218.4 281.4L217.8 277L220.4 271.3L218.9 264.9L220.7 258.2L223.4 254.6L223.2 249.1L225.3 248L227.5 243L231.2 245.2L232 243.3L234.3 243.4L238.3 247.7L244.4 250.6L242.8 255.1L248.6 255.7L251.7 251.5L252.7 254.7L247.4 259.1L244.7 262.2ZM222.7 313.7L222.7 318.8L226.1 318.9L223.7 320.5L218 319.2L210.7 314.1L217.8 317L221.3 313.4L222.7 313.7ZM220.8 233.2L223.1 237.4L224.3 245.4L226 245.6L223.2 249.1L223.4 254.6L220.7 258.2L218.9 264.9L220.4 271.3L217.8 277L218.4 281.4L215.7 289.9L217.6 295.7L215.3 303.6L213.2 306.1L216.2 312.2L222.9 312.9L218.3 314.3L217.1 316.5L210.1 312.8L208.8 304.6L211.7 300.6L208.7 299.9L211.3 294.1L213.5 294.9L214.6 290.1L213.2 289.5L212.6 292.4L211.3 292.1L213.6 283L212.8 278.1L217.1 267.3L220.3 234.4L220.8 233.2ZM418.7 203.2L421.5 212L417.5 212.4L416.7 219.9L419.2 220.8L419.4 223.3L414.3 219.5L404.3 218.3L403.5 209.6L400.2 208.8L398 211.2L394.9 211.4L392.7 206.3L384.4 206.1L387.2 203.2L389.2 204.3L392 201L395.3 193.8L397.1 183.2L398.9 181.3L404.8 183.6L405.7 182L411.3 180.8L414.7 180.8L416.9 183L419.4 182.3L422.3 187.8L419.8 191.5L418.6 200.4L418.7 203.2ZM443.2 196.7L442 186.5L444.3 183.1L449.9 181.4L457.9 171.1L457.9 166.6L462.2 165.2L457.2 180.6L443.6 196.2L443.2 196.7ZM438.4 203.6L427.8 195L430.1 188.5L428 183.1L430.6 180.2L436.2 184.6L443.7 183.8L442 186.5L443.2 196.7L440.5 198.8L439.2 202.8L438.4 203.6ZM409.1 174L406.9 172.3L407.1 169.7L403.9 163.9L406 156.8L407.8 157L407.7 146.9L410 146.9L410 142.3L433.7 142.3L435 150.1L436.8 151.5L433.7 153.9L432.5 161.7L428.5 168.4L427.9 172.9L425.5 164.7L422.7 170.3L420 169.2L417.9 171.3L413.5 171.1L411.6 168.9L407.8 173.1L409.1 174ZM407.7 147.9L407.8 157L406 156.8L403.9 163.9L405.7 167.3L395.9 174.7L390.6 175.8L387.9 170.9L390.9 169.9L389.2 162.2L387.1 159.9L390.5 154.7L391.8 146L389.7 140.4L391.7 139.1L399.7 143.5L407.7 147.9ZM216.6 147.6L216.6 151.4L211.1 150.7L215.3 150L213.2 147.8L214.8 147.2L216.6 147.6ZM216.6 151.4L216.8 147.2L223.4 150.1L216.7 152.1L216.6 151.4ZM717.5 29.6L720 28.7L720 30.2L717.8 30.3L717.5 29.6ZM458.2 86.3L453.4 90.4L457.2 96.9L455.6 98.4L450.9 95.3L439.9 93.1L433.4 89L436.5 86.7L435.3 85.8L438.3 84.8L436.5 83.7L439.5 82.9L440.1 79L430.7 76.7L427.5 72.7L423.6 73.2L422.6 71L425.4 70.4L421.5 67L421.7 65.3L416.4 63.9L414.6 60.9L414.8 58L418.2 55L416.1 53.9L423 48.5L420.1 46.9L420.9 45.4L419.1 43.7L420.4 41.8L418.1 39.2L420 37.4L416.9 35.9L417.2 34.3L424.3 32.4L442.1 38L442.3 39.5L436.8 41.3L426.4 39.9L429.6 41.6L429.9 45L434 46.3L433.1 44.2L434.4 43.3L439.2 44.7L440.9 44.2L439.5 42.5L444.2 40.2L447.9 41.2L449.1 39.6L446.9 35.4L452.5 36.2L453.6 37.4L451.1 37.7L451.1 39L452.7 39.8L467.4 34.8L468.9 34.9L467 36.3L477.6 34.7L479.9 36.1L482.2 34.6L480.1 33.2L481.1 32.5L497 36.5L498.4 35.3L493.9 33.4L493.4 29.8L499.9 25.2L505.2 25.8L505.6 27L503.7 28.9L505.6 31.2L505.1 34.4L507.3 35.8L502.6 40.6L504.8 40.9L510.1 37.3L508.9 36L509.9 34.5L507.2 33L508.8 30.7L506.2 28.8L509.8 27.3L509.3 25.6L511.4 26.9L510.6 29.1L512.7 29.5L511.8 27.8L515.2 26.9L523 28.1L521 23.8L533.6 23.1L532 21.9L534.3 20.4L561.5 17.4L568.7 14.5L574.5 17.3L582.2 16.7L588.3 18.7L578.8 22.5L586 23L587.1 24.5L591.1 23.5L606.4 25.3L606.5 23.6L614 24L617.2 25.2L618.1 26.6L616.9 27.6L622.6 30.3L624.5 27.9L639.7 28.7L638.3 26.6L640.9 25.6L659 27.1L665.9 30.2L678 30.2L679.7 31.1L679.4 32.8L681.9 33.4L695.7 33.1L699.2 35.1L701.6 34.4L700 32.9L700.9 31.9L720 34.5L720 43.7L714.8 44.5L718.7 48.3L718.5 49.8L707.4 51.3L700.7 55.4L697.8 53.8L692.6 55.6L687.1 55.4L684 59.1L686.4 60.6L686.1 63.9L684.3 64L683.4 65.9L684.2 66.9L680.7 68.1L680 70.7L677.1 71.3L673.6 75.7L670.9 65.7L671.8 62.5L673.6 60.1L676.7 59.6L687.3 52.5L688.9 49.2L680.2 53.8L678.6 51L673.4 51.8L668.4 55.7L670.1 57.1L662.5 57.9L662.7 56.2L659.6 55.9L644.4 57.3L630.3 67.2L636.3 69.4L639.8 68.4L642.7 71L640.1 81.6L629.7 93.2L627.1 94.6L624.6 93.5L621.6 95.9L622.1 89.6L626.2 89.2L630.1 81.5L622 83.1L618.8 79.3L615.3 78.6L611.9 71.6L607.1 70.1L600.4 71.7L601.5 73.5L595.8 79.2L588.7 77.5L581.3 80.1L577 79.7L573.8 77.4L567.4 77.8L564.5 76.9L564.1 75.2L557.7 73.4L554.5 78.7L544.5 76.2L534.7 79.9L526.8 75.6L521.1 74.9L520.1 76.1L513.1 68.5L513.8 67.7L506.9 70L507 68.8L502.4 68.6L501.7 66.2L498.1 65.7L482.9 68.9L482 69.6L483.4 71.2L479.9 73.6L483.2 75.1L482.7 76.2L471.4 76.6L461.5 74.2L457.4 76.7L457.2 78.3L455.1 77L452.9 81.7L456.1 83.2L457.2 86L458.2 86.3ZM547.6 6.8L555.8 7.5L560.4 9.7L559.9 11.8L549.9 11.4L542.4 8.4L547.6 6.8ZM565.7 10.8L570.7 12.1L558.9 14L564.2 10.7L565.7 10.8ZM637.7 18.1L650.2 19.4L648.6 21.1L637.9 21.6L633.9 20.1L635 18.5L637.7 18.1ZM656.4 19.9L661.5 20.5L656 21.2L652.7 19.5L656.4 19.9ZM639.7 24.4L644.1 23.3L647.2 24.8L640.1 24.5L639.7 24.4ZM449.7 7.8L463 7.6L453 8.6L454.1 7.9L449.7 7.8ZM405.5 68.1L399.3 67.9L402.5 66.1L405.3 67.5L405.5 68.1ZM467 23.5L471.8 21.5L471.3 20.5L482.3 17.8L497.7 17.1L477 22.2L470.8 26.7L471.2 28.6L475.1 30.5L467.4 30.4L463.2 28.8L464.9 25.8L468.9 23.8L467 23.5ZM645.8 69.6L649.3 80.4L646.3 79.6L645.1 83L647 86.9L645.5 85.5L644.2 87.3L643.4 70.5L645.3 68L645.8 69.6ZM10.1 38.6L11.3 40.6L10.9 38.9L16.3 39.2L20.2 41.4L14.9 42.6L14.1 45.3L3.3 42.7L2.6 41.1L0.2 41.6L1.1 42.7L0 43.7L0 34.5L4.9 36.3L10.1 38.6ZM2.6 30.1L0 30.2L0 28.7L4.7 29.5L2.6 30.1ZM426.9 87.3L433.1 88.5L427.8 91L424.9 88.8L427.2 87.6L426.9 87.3ZM202 131.3L204.3 131.2L202.2 132.2L202 131.3ZM204.4 130.8L205.7 133.4L204.4 131L204.4 130.8ZM203.6 135L204.9 138.3L203.2 136.4L203.6 135ZM237.6 311.9L242.9 310.2L244.5 311.2L238.6 312.9L237.6 311.9ZM390.3 9.9L394 9.1L403.1 11.6L398.1 12.5L394.2 16.5L391.8 16.6L387.5 15.2L389.3 14.4L380.9 10L387.4 10L390.3 9.9ZM422.2 33.2L417.2 34.3L418 32.7L415.5 31.8L409.5 35.2L402.5 33.6L399.8 35.8L396 35.4L387.1 44.1L387.1 45.8L385.2 45.8L383.9 47.9L384.6 54.8L382.1 57.7L380.7 56.3L376.8 59L371.3 58.3L370 50.6L381.1 44.8L389.5 37.2L398.4 32.6L406 31.7L409.1 29.8L416.3 29.4L422.6 31.1L420 31.7L422.2 33.2ZM414.8 9.1L406 10.6L394.7 8.5L410.9 8.2L414.8 9.1ZM409.4 14.1L401.5 14.5L402.8 13.9L401.6 13.2L406.6 13.6L409.4 14.1ZM266.5 3.1L282.8 1L305.8 1.1L318.3 2.9L296.2 4.1L315.9 5.2L313.7 6.5L328.5 4.8L335.6 6.2L319.9 8.8L324.5 8.9L320.6 12L320.7 14.6L323.1 16.1L316.6 16.9L320.3 18.1L320.8 20.1L318.7 20.3L321.3 22.3L316.8 22.4L319.1 23.4L318.5 24.2L312.9 24.5L315.4 27.1L310.4 26.8L315.7 28.8L316.5 30.6L312.9 31.1L308.9 28.9L309.6 30.4L307.3 31.6L315.3 31.8L304.5 35.7L296.4 36.5L291.6 39.8L280.4 42.6L277.6 47.1L274.4 48.9L275.2 50.7L273.2 54.9L263.5 53.1L256.7 46.8L252.1 38.6L254 35.9L257 35.1L258.3 32.3L250.6 33L251.3 30.3L257.2 30.8L248.3 28.3L250.6 26.2L242.8 19.5L237.5 18.1L223 18.2L217.2 16.1L226.5 15.2L213.4 13.7L228.6 10.6L229.4 9.7L224 8.9L235.5 6.2L234.7 5.1L259.2 3.6L271 5.4L266.2 4.1L266.5 3.1ZM497.9 304.5L501.1 305.9L497.5 307.1L497.7 304.9L497.9 304.5ZM609.9 213.3L614.7 212.1L610.1 213.7L609.9 213.3ZM392.7 258.5L393.6 257.3L396.9 259.5L399.8 258.2L399.8 249.7L401.8 254.4L403.2 254.2L406.6 250.9L411.3 251.4L418.9 243.6L422.4 243.9L423.7 252.2L422.1 251.9L421.4 254.2L422.6 255.5L425.7 254.2L424.9 257.8L414.9 269.1L399.2 272.8L396.8 271.2L396.4 265.5L394.1 261.4L392.7 258.5ZM418 259.3L416.1 259.1L414 261.4L415.5 263.2L418.7 260L418 259.3ZM418 259.3L417.7 261.9L415.5 263.2L414 261.4L417.1 258.6L418 259.3ZM125.7 118.2L130.6 117.7L138 120.9L147 119.9L152.1 125.6L153.8 126.3L156.7 124.5L162 132.3L165.7 133.5L164.3 141.3L168.2 149.6L171.1 151.2L177.2 149.5L179.4 144.6L185.9 143.4L184.3 150.9L178 151.9L177.1 153.2L179.1 156L176.5 156L175.5 159.5L172.2 156.3L166.9 156.9L153 150.9L149 147.1L149.5 143.7L147.9 140.6L135.5 126.4L133.7 121.3L130.4 119.8L130.7 123.6L141.2 139.2L140.3 140.5L135.6 136.1L135.4 133.1L129.9 129.2L131.7 127.3L126.6 120.2L125.7 118.2ZM244.7 262.2L252.4 266.4L253.6 268L252.4 271.8L250.1 273.1L244.4 272L243.1 270.7L244.3 264.1L244.7 262.2ZM253.3 270.4L252.4 266.4L244.7 262.2L252.7 254.7L252.7 252.8L250.7 251.9L251.4 248L249.2 247.8L248.4 244.2L244.1 243.6L245 234.6L243.5 230.3L239.7 230.2L239 224.5L229.2 219.4L229.3 215.3L223.5 218.1L218.9 218.1L219 214.6L215.6 215.9L213.5 214.6L212 210.1L214.2 205L220.2 202.7L221.2 195.4L220 191.6L221.6 190.6L220.4 188.9L224.9 188.2L225.9 190.3L228.9 191L233.3 187.8L231.5 187.1L230.4 183.5L233.8 184.2L238.5 180.9L240 181.3L240.1 186.5L241.9 189.8L248 188.7L248.1 187.1L254.1 188L257.4 183.2L260.1 188.9L259.2 193L262.8 193.4L262.8 195.7L264.4 194.2L270.2 196.4L270.8 199L280 199.4L285.6 203.9L288.8 204.7L290.5 209.7L289.7 213.5L282.7 222.8L281.5 233.9L278.1 243.2L276 245.6L270.7 246.5L264.7 250L263 252.3L262.2 258.7L254.6 269.1L253.3 270.4ZM220.9 218L229.3 215.3L229.2 219.4L239 224.5L239.7 230.2L243.5 230.3L245 234.6L244.3 238.7L241.8 237.3L236.4 237.9L234.6 243.9L232 243.3L231.2 245.2L227.5 243L224.3 245.4L223.1 237.4L220.8 233.2L222.7 221.7L220.9 218ZM220.2 202.7L214.2 205L212 210.1L213.5 214.6L215.6 215.9L219 214.6L218.9 218.1L220.9 218L222.7 221.7L222.1 230.7L219.3 235L208 226.5L200.5 209.4L197.5 206.9L197.2 203.7L199.4 200.7L199.1 203L201.6 204.2L202.7 203.3L204.3 199.7L208.9 196.4L209.8 193L213.9 198.1L219.9 199.1L219.2 201.5L220.2 202.7ZM226.2 190L224.9 188.2L220.4 188.9L221.6 190.6L220 191.6L221.2 195.4L220.2 202.7L218.6 201.4L219.9 199.1L213.9 198.1L209.8 193L202.3 189.7L205.7 184L204.2 176.3L205.1 173.3L208.7 171.2L210.2 167.4L213.2 167.1L216.5 164.3L217.7 165L213.4 171.8L216.1 176.8L225.3 178.9L224.4 186.4L225.6 187.7L226.2 190ZM205.3 172.9L204.2 176.3L201.8 172.2L199.2 173.8L199.2 176.2L194.1 174L194.9 170.9L197.1 172.7L200.9 170.8L204.5 172.3L205.3 172.9ZM194.9 170.9L194.1 174L190 169.7L189.8 170.9L188.7 170L188.1 167.8L192.7 167.7L194 169.9L194.9 170.9ZM192.7 167.7L188.6 167.4L184.7 163.2L190.2 158.9L193.7 158.4L192.4 167.4L192.7 167.7ZM193.7 158.4L190.2 158.9L185.4 163L181.3 159.7L184.2 156.4L190 156.1L193.2 157.8L193.7 158.4ZM181.3 159.7L184.6 161.2L184.2 162.7L180.4 161.8L180.8 159.9L181.3 159.7ZM175.5 159.5L176.5 156L179.1 156L177.1 153.2L178 151.9L181.7 152L181.5 156.4L183.5 156.7L179.8 161.3L176.6 160.4L175.5 159.5ZM181.7 152L183.8 150.7L182.1 156.4L181.7 153.8L181.7 152ZM238.5 180.9L233.8 184.2L230.4 183.5L231.5 187.1L233.3 187.8L227.3 191.2L224.4 186.4L225.3 178.9L216.1 176.8L213.4 171.8L214.2 168.9L217.3 165.8L215.9 170.2L217.5 171.9L217.2 167.7L219.7 166.7L220.1 164.9L223.6 168.6L230.2 169.7L236.2 168.2L234.5 168.9L235.2 170L240.5 173.6L237.2 179.2L238.5 180.9ZM246.9 188.5L242.9 189.9L240.7 188.7L240 181.3L237.2 179.2L240.5 173.6L245.7 179.1L243.9 183.5L245.7 186.5L246.9 188.5ZM251 187.5L248.1 187.1L246.9 188.5L244.8 185.2L243.9 183.5L245.7 179.1L252.1 179.6L251.5 186.6L251 187.5ZM256.7 183.3L254.1 188L251 187.5L252.1 179.6L256.4 182.4L256.7 183.3ZM372.4 79.3L376.2 80.3L372.1 85.6L374.9 92.5L366.2 94L366 95.3L357 94L357.6 87.2L351 82.8L350.8 81.1L356.8 81.2L356.1 78.6L358 79.6L365 75.4L371.8 79.3L372.4 79.3ZM377.5 95L378.8 94.1L378.5 97.8L377.1 95.8L377.5 95ZM209.3 193.2L208.9 196.4L204.3 199.7L202.7 203.3L201.6 204.2L199.1 203L200.5 198.9L198.1 198L198.1 195.3L199.8 191.1L202.3 189.7L208.4 192.7L209.3 193.2ZM227.4 150.3L228.8 151L225.6 151.6L225.8 150.3L227.4 150.3ZM204.9 150.4L207.6 151.8L204.5 151.8L203.3 151L204.4 150.3L204.9 150.4ZM195.5 139.6L203.3 141.2L211.6 146.3L204.5 147.3L205.8 146L202.6 143.3L196.4 140.9L190.1 142.6L195 139.9L195.5 139.6ZM422.4 243.9L416 242.2L410.5 233.6L414.1 234L419 228.8L424.7 230.5L425.7 234.1L424.5 241.3L422.4 243.9ZM418.9 243.6L411.3 251.4L406.6 250.9L401.8 254.4L399.8 249.7L399.8 243L401.8 242.9L401.8 234.7L410.5 233.6L417.6 242.5L418.9 243.6ZM399.8 249.7L399.8 258.2L396.9 259.5L393.6 257.3L392.7 258.5L390.4 255L388.5 243.6L383.5 232.6L410.2 233.2L407.2 234.8L401.8 234.7L401.8 242.9L399.8 243L399.8 249.7ZM326.6 161.6L324.7 159L327.8 155.1L330.8 154.7L335.7 159.3L337 164.3L326.6 164.4L326.3 162.7L332.3 161.8L328.8 161.6L326.6 161.6ZM337 164.3L335.7 159.3L336.7 157.5L348.9 157.3L347.1 135.6L350.2 135.5L366.3 147.6L366.3 149.1L368.5 148.9L367.3 157.1L357.9 158.5L352 161.9L349.2 169L343.9 169.4L341.7 164.6L337.1 165.1L337 164.3ZM325.9 144.6L334.1 143.9L334.3 139.4L336.1 139.2L336.1 133.3L342.6 133.4L342.6 130L350.2 135.5L347.1 135.6L348.9 157.3L336.7 157.5L335.7 159.3L330.8 154.7L327.1 155.8L326.9 145.6L325.9 144.6ZM365.4 178.5L363.7 178.7L363.3 171.9L361.5 168.8L365 164.8L367.6 168.2L365.5 174.8L365.4 178.5ZM389.7 140.4L391.8 146L390.5 154.7L387.1 159.9L389.2 162.2L388.4 164.2L386.2 161.6L378 163.4L370.9 161L368.2 161.8L367.2 166.1L362 163.3L360.7 158.6L367.3 157.1L368.5 148.9L384 139L388.3 141.2L389.7 140.4ZM365.4 178.5L368.7 161.3L378 163.4L386.2 161.6L389.2 165.1L383.5 176.8L378.5 178L377 181.9L371.8 183.1L368.7 178.4L367.1 178.5L365.4 178.5ZM389 163.3L390.9 169.9L387.9 170.9L390.9 175.2L389 182L391.7 185.9L391.9 188.9L379.3 187.6L379.6 185.8L377 182.5L377.5 180.3L380.2 176.7L383.5 176.8L388.8 166.3L388.4 163.5L389 163.3ZM361.8 167.6L363.7 178.7L362.1 179.2L360 167.5L361.8 167.6ZM360 167.5L362.1 179.2L356.1 182L354.3 181.4L353.5 178.5L354.9 174L354.1 167.7L359.1 167.4L360 167.5ZM343.9 169.4L347.6 168.7L354.3 170.7L354.3 181.4L344.6 182.8L344.9 179.7L342.8 178L344.3 173.2L343.5 169.6L343.9 169.4ZM332.6 164L339.7 165.7L341.7 164.6L343.9 169.4L343.4 175.2L341.6 176.1L340.5 173.2L339 173.7L337.8 169.8L333.5 172.4L329.7 167.5L332.6 164.7L332.6 164ZM326.6 164.4L332.6 164L332.5 165.7L329.7 167.5L326.8 164.9L326.6 164.4ZM343.1 175.2L344.6 182.8L337.1 177.3L339.5 173.5L341.6 176.1L342.6 175.1L343.1 175.2ZM333.5 172.4L337.8 169.8L339.5 173.5L337.1 177.3L333.8 174.1L333.5 172.4ZM349.2 169L351.4 162.5L357.9 158.5L360.7 158.6L362 163.3L364.4 163.9L361.8 167.6L354.1 167.7L354.3 170.7L350.1 169.5L349.2 169ZM414.7 180.8L408.8 181.1L404.8 183.6L398.9 181.3L396.9 184.8L394.3 184.3L392 187.6L389 182L390.6 175.8L395.9 174.7L405.7 167.3L406.9 172.3L414.4 180.1L414.7 180.8ZM396.9 184.8L395.3 193.8L392 201L389.2 204.3L385.2 203L383.8 204.4L382.2 202L383.7 200.7L383 199.2L385.2 197.3L388 198.5L388.9 195.9L387.7 192.8L388.6 190.1L386.6 189.8L386.2 187.6L391.9 188.9L393.1 185.5L395.6 184.7L396.9 184.8ZM382.6 187.7L385.9 187.5L386.6 189.8L388.6 190.1L387.7 192.8L388.9 195.9L388 198.5L385.2 197.3L383 199.2L383.7 200.7L382.2 202L377.6 195.4L379 190.5L382.6 190.4L382.6 187.7ZM379.3 187.6L382.6 187.7L382.6 190.4L378.6 190.2L379.3 187.6ZM421.5 212L426.5 215.1L425.4 224.3L426.4 224.9L420.4 226.8L420.5 228.4L414.1 234L406.4 233.1L403.8 229.8L403.9 222.5L408 222.5L407.8 217.9L411.5 219.9L414.3 219.5L419.4 223.3L419.2 220.8L416.7 219.9L416.9 213.9L420.7 211.8L421.5 212ZM425.5 214L428.6 216.2L429.1 224L431.4 226.4L430.1 231.4L428.9 226.4L425.4 224.3L426.5 215.1L425.5 214ZM429.1 219.3L434.9 219.4L440.6 216.5L441.6 226.6L438.9 231.2L429.6 238.3L430.9 248.2L426 251.1L425.7 254.2L424.1 254.2L422.4 243.9L425.3 239.5L425.7 231.2L420.7 229.3L420.4 226.8L426.4 224.9L428.9 226.4L430.1 231.4L431.4 226.4L428.6 221L429.1 219.3ZM424.1 254.2L422.6 255.5L421.4 254.2L422.1 251.9L424 253.2L424.1 254.2ZM386 203.8L384.4 206.1L385.2 203L386 203.8ZM384.6 206.8L392.7 206.3L394.9 211.4L398 211.2L400.2 208.8L403.5 209.6L404.3 218.3L408 218.6L408 222.5L403.9 222.5L403.8 229.8L406.4 233.1L402.8 234L386.9 231.8L383.5 232.6L387.5 218.8L384.5 207.3L384.6 206.8ZM420.9 198.4L421.5 200.6L418.7 203.2L418 199.4L419.9 198.2L420.9 198.4ZM431.4 117.8L429.9 119.7L429.8 125.1L428.5 121.2L430.2 116.9L431.6 116.4L431.4 117.7L431.4 117.8ZM431.6 116.4L430.3 116.9L432.9 113.4L432.1 115.2L431.6 116.4ZM459.1 221.5L460.8 228.9L459.3 228.9L454.2 250.1L450.8 251.6L448.1 250.2L446.7 245.1L448.9 237.5L447.9 232.8L448.9 230.1L455.4 226.4L458.4 220.5L459.1 221.5ZM430.8 120.6L430.4 118.2L431.1 119.9L430.8 120.6ZM326.6 161.6L332.3 161.8L326.3 162.7L326.6 161.6ZM379 123.3L375 114.6L376.8 108L379 107.1L380.4 108.5L382.1 107.7L380.3 114L383 116.8L379.9 122.7L379 123.3ZM342.6 130L342.7 126.6L357.4 118.8L355.7 112.1L357.6 110.9L362.9 108.8L376.8 108L375 114.6L378.1 119.1L379.6 125.3L378.6 132.9L380.6 136.9L384 139L371.4 147.8L366.3 149.1L366.3 147.6L350.2 135.5L342.6 130ZM431.1 118.5L433.7 118.7L437.6 116.2L438.4 119L434 120.5L436 122.8L432.1 125.8L429.8 125.1L431.1 119.9L431.1 118.5ZM463.2 137.2L468 137.5L472.5 133.8L470 141.2L464 140L463.2 137.7L463.2 137.2ZM461.6 136L462.6 132.9L462.2 136.5L461.6 136ZM455.9 124L456.8 127.3L453.1 126L454.6 123.8L455.9 124ZM438.4 119L437.6 116.2L442 113.8L442.6 109.4L445.6 107L449.5 107.5L452.2 110.9L450.8 114.9L454.7 118.3L457.1 124.1L449.4 125.9L440.8 119.6L438.4 119ZM470.4 140.7L472.8 135.6L479.6 141.6L475.7 146.4L475.4 149.4L469.6 153.9L466.2 154.6L464 149.2L470 146.9L471.3 142.3L470.4 140.7ZM472.5 133.8L472.7 132.2L472.8 133.4L472.5 133.8ZM694.4 229.3L695.7 230.6L694.4 229.9L694.4 229.3ZM693.6 228.8L693.3 226.4L694 228.7L693.6 228.8ZM565.2 164.9L566 160.2L574.8 160.2L575 164.5L571.6 166.3L572.5 167.7L568.7 168.8L566.2 167.2L565.2 164.9ZM570.4 160.1L566 160.2L565.2 164.9L560.2 162.1L558.4 171.6L564.3 178.6L562.3 179.8L556.3 173.7L559.2 165.5L556.4 158.1L557.8 155.7L554.8 150.5L556.5 147.6L561.1 146.7L562.6 148.2L562.1 152.6L567.9 151L571.1 159L570.4 160.1ZM574.8 160.2L570.4 160.1L571.2 157.1L567.9 151L562.1 152.6L562.6 148.2L560.2 146L562.4 143.6L563.6 144.2L563.3 141.6L564.3 141.3L566.4 145.2L568.9 145.2L569.6 147.2L567.8 148.6L570.2 150L575.1 157.9L574.8 160.2ZM560.2 146L556.5 147.6L554.8 150.5L557.8 155.7L556.4 158.1L559.2 165.5L557.1 170L557 162.7L554.3 154L550.7 156.8L548.4 156L548.6 151L544.6 143.5L550.2 131.8L554.3 130.7L554.7 128L557.4 129.7L555.2 138L557.3 137.6L559.1 140.2L558.5 142.1L562.3 142.7L560.7 145.1L560.2 146ZM568.7 168.8L572.5 167.7L571.6 166.3L575 164.5L575.1 157.9L570.2 150L567.8 148.6L569.6 147.2L568.9 145.2L566.4 145.2L564.3 141.3L570.7 139.2L576.1 143.4L571.3 149.1L577.8 157.8L578.7 162L578.4 166.1L570.3 173.1L570.2 170.1L568.7 168.8ZM621.3 95.5L619.4 99L615.1 101.6L616.4 104.8L610.6 106.4L609.4 105.4L610.8 102.4L608.5 101.2L613.7 96.8L616.4 97.6L616.1 96.4L620 94.2L621.3 95.5ZM612.3 106.2L616.7 104.2L618.9 108.4L618.2 112.3L613 113.9L612.2 108.5L613.7 108.1L612.3 106.2ZM535.5 79.7L544.5 76.2L554.5 78.7L557.7 73.4L564.1 75.2L564.5 76.9L567.4 77.8L573.8 77.4L577 79.7L581.3 80.1L588.7 77.5L593.4 78.3L591.5 83.3L596.1 82.5L599.5 84.8L586.9 90L583.7 89.3L582.7 90.8L583.7 92.4L580.8 94.4L569.9 97.3L561.7 94.9L552.7 94.8L550.6 91.3L541.9 88.9L540.6 83.4L536 81.3L535.5 79.7ZM554.7 128L554.3 130.7L550.2 131.8L545.3 142.2L544.3 138.6L543.4 140.1L542.3 138.9L544.8 135.5L539.8 134.8L539.7 133.2L537.1 132.1L536.4 133.7L537.9 134.9L536.2 136.6L537.4 137.2L537.8 143L534 143.5L533 146.6L524.4 154.8L520.6 156.3L519.7 169.1L515.1 174.6L507.1 156.1L505.3 143.8L500.9 144.9L496.4 138.5L497.7 136.9L502.1 136.9L499 131L501.2 128.6L503.6 128.8L510.5 118.8L507.5 114.1L513.7 113.3L515.7 111.4L517.8 114L517.5 120.5L522.2 123.6L520.2 126.7L530.5 131.5L536.1 132.2L537.5 128.4L537.7 130.6L539.5 131.5L544.1 131.2L543.4 129.1L549.1 125.6L552.2 125.2L552.5 127.6L554.7 128ZM545.3 142.2L544.7 145.4L542.8 140.6L541 140.5L540.5 142.7L538.1 142.2L536.2 136.6L537.9 134.9L536.4 133.7L537.1 132.1L539.7 133.2L539.8 134.8L544.8 135.5L542.3 138.9L543.4 140.1L544.3 138.6L545.3 142.2ZM543.4 129.1L544.1 131.2L537.7 130.6L540 127.9L542.5 128.5L543.4 129.1ZM536.2 128.8L536.1 132.2L534.5 132.2L520.2 126.7L523.1 123L533.9 128.6L536.2 128.8ZM515.7 111.4L513.7 113.3L507.5 114.1L510.5 118.8L503.6 128.8L501.2 128.6L499 131L502.1 136.9L497.7 136.9L496.4 138.5L492.7 134.5L483 135.3L483.7 132.6L486.6 131.4L481.7 124.4L485.1 125.5L492.7 124.2L493.9 121L498.6 119.6L503.7 109L510.3 107.6L512.4 110.4L515.7 111.4ZM493 107.1L498.4 107.6L501.6 104.5L503.7 108.5L506.5 106.8L510.3 107.6L502.5 110L503.2 112.1L501.8 114.8L499.9 114.7L500.6 116.3L498.6 119.6L493.9 121L492.7 124.2L485.1 125.5L481.7 124.4L483.6 122.3L481.1 117.1L482.4 111L486 111.6L489.5 107.6L492.4 107L493 107.1ZM495.7 107.6L496.8 105.2L494.9 103L498.7 99.3L501.3 98.8L502 100.5L499.1 100.8L498.9 102.1L507.4 102.3L507.9 104.4L509.7 104.7L510 106.9L506.5 106.8L503.7 108.5L501.6 104.5L500.2 106.6L496.3 107.8L495.7 107.6ZM501.9 95.8L503.7 94.5L507 95.3L508.4 93.4L520.5 95.6L507.4 102.3L498.9 102.1L499.1 100.8L506.1 99L500.8 97.5L502.5 96L501.9 95.8ZM465 96.9L468.2 95.7L470.9 98.1L474.2 98L473.9 96.8L477.3 94.7L493.1 105.7L493 107.1L491.5 106.4L484.5 111.9L482.4 111L482.2 109.1L474.7 105.5L467.8 107.4L467.8 103.4L465.4 100.9L465.8 99L469.5 98.8L467.4 96.1L465.6 98.4L465 96.9ZM457.1 124.1L454.7 118.3L450.8 114.9L452.3 112.3L448.5 105.7L448.2 102.3L449.6 101.7L452.3 103.9L456.1 102L458.4 106.6L461.7 108.2L467.7 108L473.2 105.3L482.2 109.1L481.1 117.1L483.6 122.3L481.7 124.4L486.6 131.4L483.7 132.6L483 135.3L474.8 133.8L473 130.5L469.4 132.1L463 128.9L460.2 123.6L457.9 123.2L457.1 124.1ZM431.4 117.8L433.2 114.3L431.8 111.6L433.5 108.3L444.7 107.4L442.6 109.4L442 113.8L433.7 118.7L431.4 117.8ZM453 103.8L447.3 100.4L447.2 98.5L449.9 98.1L453 102.2L453 103.8ZM382.1 57.7L385.3 52.1L383.9 47.9L385.2 45.8L387.1 45.8L387.1 44.1L393.5 36.7L399.8 35.8L401.3 34.2L407.1 36.9L407.8 41.3L404.4 42L402.7 45L395.7 48.8L394.2 52L397.6 54.9L393.7 58L391.8 64L385.9 65.7L383.6 61L382.1 57.7ZM416.4 63.9L421.7 65.3L421.5 67L425.4 70.4L422.6 71L423.6 73.2L421.1 75L407.1 74.4L407 69.1L411.1 68.2L414.2 64.8L416.4 63.9ZM423.6 73.2L427.5 72.7L430.7 76.7L440.1 79L439.5 82.9L429.9 86.6L430 87.8L423.4 85.6L417.4 88.8L417.7 86.2L420 86.3L417.3 82.4L415 81.6L409.7 83.3L404.2 81.7L407.8 77.1L407.1 74.4L421.1 75L421.9 73.4L423.6 73.2ZM407 69.1L407.6 71.9L406.4 72.3L408.1 76.4L405.6 80.3L392.4 77.1L388.1 71.2L388.2 69.4L395.2 66.9L406.5 68.4L407 69.1ZM394 82.4L392 85.7L389.3 86.2L379 84.7L385.9 83.9L387.2 80.6L393.8 81.6L394 82.4ZM404.2 81.7L405.4 82.9L402 86.5L396.9 87.8L392.4 85.3L394 82.4L403.7 81.9L404.2 81.7ZM413.2 82.1L417.3 82.4L420 86.3L417.7 86.2L416.5 88.4L416.3 85.4L413.8 82.4L413.2 82.1ZM416.5 88.4L419.2 88.9L417.1 92.5L414.5 91.4L405.9 92.2L400.4 86.9L406.3 82.4L413.2 82.1L416.3 85.4L416.1 87.4L416.5 88.4ZM413 65.2L411.1 68.2L407 69.1L405.5 66.9L402.5 66.1L402.1 64.2L411.1 64.1L413 65.2ZM414.6 60.9L416.4 63.9L413 65.2L409.7 63.4L402.1 64.2L403.2 61L405 60.3L406.6 62L410.3 59.8L412.9 60.9L414.6 60.9ZM416 56.3L414.6 60.9L408.6 60.2L408.9 58.8L406.9 58.3L406.7 57L409.2 56.3L416 56.3L416 56.3ZM388.2 69.4L390 75.5L384.5 77.4L387.2 80.6L385.9 83.9L374.9 83.5L376.2 80.3L373.3 79.9L372.1 77.8L372 73.8L373.7 72.9L374.2 69.6L377.6 68.8L377.1 66.7L379.8 66.6L381.9 68.9L387.3 68.7L388.2 69.4ZM405.3 91.3L417.1 92.5L416 96.4L405.9 97.9L404.8 91.8L405.3 91.3ZM412.6 111.8L407 111.9L411.5 112.1L412.6 111.8ZM405.9 97.9L413.2 97.4L412.1 99.1L407.4 99.4L408.8 100.7L405.3 100.4L408.1 106.4L406.2 105.8L406.3 109.2L405 109.3L400.3 101.9L402 99.1L405.5 98L405.9 97.9ZM449.5 107.5L433.5 108.3L432.3 110.6L432.3 108.7L429.4 108.4L428.1 109.7L421.2 108.6L419.4 109.9L415.3 108.7L412.3 102.2L418.5 98.2L422.3 98.5L427 96.4L436.7 98.8L445.2 97.4L449.6 101.7L448.2 102.3L449.5 107.5L449.5 107.5ZM412.2 96.8L416 96.4L418 98L412.7 100.7L413.2 97.4L412.2 96.8ZM402 99.1L400.3 101.9L398.8 100.4L399.5 94.8L401.2 98.5L402 99.1ZM393.1 86.1L398.8 89L391.5 90L396.9 95.3L392 93L389.8 89.4L387.3 89.2L390.7 88.5L391.5 86.7L393.1 86.1ZM379.2 83.7L380.7 86.1L374.5 87.8L372 86.6L373.5 83.7L377 83L379.2 83.7ZM372.1 77.8L372.4 79.3L371.6 77.8L372.1 77.8ZM372.3 76.2L371.3 79.1L365 75.4L371.2 75.7L372.3 76.2ZM373.8 70.1L372.3 76.2L366.6 75L369.4 71L372.1 70L373.8 70.1ZM341.9 96.7L343.5 95.8L347.2 97.8L345 101.9L345.9 105.4L344.3 108.3L342.2 108.2L342.3 105L340.9 103.9L342 97.5L341.9 96.7ZM345.1 107.7L345 101.9L347.2 97.8L343.5 95.8L341.9 96.7L341.2 94.1L344 92.4L366 95.3L364.2 98.2L361.6 98.7L359.4 102.6L360.2 103.9L355.7 108.6L351.3 108.6L349.2 110.3L347 108L345.1 107.7ZM347.6 69.2L346.4 72.9L340 73.9L341.7 71.5L340.6 69.1L344.9 66.3L344.9 68.7L346.1 68.7L347.6 69.2ZM691.6 241.2L694.2 243.7L690.9 242.6L688.1 239L690.9 240.6L691.6 241.2ZM684.2 216.9L683.4 217.7L682.6 216.3L683.8 216.8L684.2 216.9ZM683.4 214.9L681.2 211.9L682.6 213.8L683.4 214.9ZM681.7 215.5L679.4 214.1L681.4 214.9L681.7 215.5ZM679.3 211.3L679.8 212.4L676.4 209.9L677.6 210.2L679.3 211.3ZM674.3 209L675.1 209.7L673.1 208L674.3 209ZM713.8 284.8L712 287.6L709.3 287.6L710.5 285.7L707.6 283.5L709.4 278.7L705.3 272.1L708.7 273.8L711.9 279.1L717 279.4L714.1 284.4L713.8 284.8ZM699.3 292.8L705.6 285.8L706.5 287.7L707.9 286.8L708.5 288.7L705.4 292.4L706.2 293.5L702.9 294.4L701.2 298.2L698.7 299.9L693.4 299L694.1 296.4L697.9 293.7L699.3 292.8ZM655.4 286.5L656.6 286.7L655.8 292L652.1 292.8L649.5 286.3L653.8 287L655.4 286.5ZM612.3 266.8L608.4 268.5L607.3 270.6L599.8 270.8L596 273.3L590.1 271.4L591.4 265.4L586.7 252.8L587.6 253.8L586.9 251.7L588.5 253.2L586.8 248.8L588.3 242.8L588.5 244.5L593.4 240.4L601.7 238L606 230.5L607.7 232L607 230.9L611.4 225.5L614.1 224.6L619.2 227.2L621.2 221.6L625.2 220.7L623.6 218.7L624.7 218.4L630.6 221L633 220.1L633.9 221.2L631 227.3L640.4 233.5L642.5 230.5L645 217.3L647.8 226.2L649.1 225.4L650.7 227.2L652.8 236.4L657.7 239.7L659.4 244.1L661.5 244.3L666.3 252.7L667.1 257.4L665.8 265.5L660.7 274.7L660 278.8L652.6 282.5L649.8 281L650.1 279.8L647.2 281.9L641.3 280.1L639.1 275.8L636.2 274.6L636.4 271.8L633.7 273.8L635.6 268.4L632 272.9L628.5 267.7L622.7 265.2L614.2 267L612.3 266.8ZM523.6 175.6L523.3 178L520.7 179.1L519.4 174L520.3 170.3L522.6 173.2L523.6 175.6ZM579 151.1L577.3 150.4L578.2 147.3L581.6 146.8L580.7 150L579 151.1ZM520.5 95.6L521.7 93.7L519.9 89.7L524.9 88.3L526.4 84.2L530.3 84.9L531.5 81.6L535.5 79.7L541.9 85.2L541.9 88.9L550.6 91.3L552.7 94.8L561.7 94.9L569.9 97.3L578.5 95.2L583.7 92.4L582.7 90.8L583.7 89.3L586.9 90L594.8 85.7L599.3 85.6L596.1 82.5L591 82.3L593.4 78.3L595.8 79.2L598.6 77.7L601.5 73.5L600.4 71.7L604.5 70.2L611.9 71.6L615.3 78.6L618.8 79.3L622 83.1L630.1 81.5L626.2 89.2L622.1 89.6L621.3 95.5L620 94.2L616.1 96.4L616.4 97.6L613.7 96.8L608.5 101.2L602.1 103.5L604.3 100L603.3 98.8L595.1 103.9L599.4 107.5L601.6 105.9L604.7 106.9L605 108.1L602.2 108.7L598.3 112.7L603.8 120.1L602.5 122.4L604.2 124.4L603.4 128L597.3 136.5L591.8 140.5L581.6 143.7L580.9 146.1L579.8 146.3L579.7 143.7L574.1 142.8L573.5 140.5L570.7 139.2L563.3 141.6L563.6 144.2L558.5 142.1L559.1 140.2L557.3 137.6L555.2 138L557.4 129.7L555.8 127.8L552.5 127.6L552.2 125.2L549.1 125.6L545 128.8L540 127.9L537.6 130.2L537.5 128.4L531.6 128.1L517.5 120.5L517.8 114L515.7 111.4L512.4 110.4L507.4 102.3L520.2 96.1L520.5 95.6ZM603.6 136.8L601.5 142.4L600.2 138.8L603 134.8L603.9 135.5L603.6 136.8ZM380.9 85.2L387.6 86.1L387.9 88.2L384.7 88.7L385.2 91.6L396.8 100.2L396.6 101.4L393.7 100L394.1 103.5L392.2 105.6L390.8 100.9L382.4 95.6L380.4 92L377.8 91L374.9 92.5L374 91.2L373.7 87.3L380.7 86.1L380.9 85.2ZM389.5 105.3L391 105.1L390.2 108.8L384.9 106.5L385.1 105.3L387.5 105.5L389.5 105.3ZM377.4 98.9L378.4 98.2L379.6 99.9L379.3 102.9L377.6 103.5L376.3 98.8L377.4 98.9ZM379.8 66.6L377.1 66.7L376.2 63L381.2 60.3L380.5 62.2L381.8 63.2L379.3 65.5L379.8 66.6ZM384.7 64L384.2 67L381.8 64.8L384.7 64ZM347.6 69.2L344.9 68.7L344.9 66.3L348.7 67.6L347.6 69.2ZM353.8 70.2L352.7 67.5L349.8 66.4L349.9 64.8L348.8 65.9L347.7 62.5L350 58.2L354 58.2L351.9 60.7L356.1 60.4L353.8 64.3L355.8 64.5L360.9 71.3L363.4 71.8L362.9 75.1L349.5 78.1L348.4 77.7L353.2 74.8L349.5 73.5L351.6 72.8L350.8 70L353.8 70.2ZM331 40.3L330.5 41.8L332.8 43.3L322.7 47.1L314.5 46L316.4 45L312.1 43.9L315.5 42.8L311.3 42.2L312.7 40.7L318.8 41.9L327.7 40.1L331 40.3ZM452.8 96.7L455.6 98.4L457.2 96.9L460.8 100.4L459.1 100.6L457.8 104.9L456.1 102L453 103.8L449.9 98.1L453 98.6L452.3 97.1L452.8 96.7ZM452.3 103.9L449.6 101.7L451.5 102.6L452.3 103.9ZM439.9 93.1L450.9 95.3L453.3 98.3L443.1 97.5L442.9 94.9L440.6 93.8L439.9 93.1ZM601.7 163.7L600.6 161.9L603.1 162.8L602.5 164.8L601.7 163.7ZM605.2 169.9L608.2 167.1L606 172.1L604.8 170.5L605.2 169.9ZM612.8 173.5L613.1 176.3L612.4 178.4L611.7 176.1L610.7 177.3L610.8 180L608.4 178.7L607.2 174.9L603.8 176.3L607 172.9L607.7 173.9L610.9 172.2L610.8 170.4L612.6 172.7L612.8 173.5ZM597 171.5L594.3 173.6L599 166.7L598.1 169.9L597 171.5ZM604.7 151L603.5 160L607.9 161.2L608.2 164.1L605.9 161.7L601.3 161L602 159.5L599.8 157.5L601.4 150.4L604.5 150.4L604.7 151ZM604.1 166.6L603.8 165.5L606.2 166.3L604 168.9L603.9 167.8L604.1 166.6ZM611 164.9L611.6 167.5L610 166.9L609.6 169.6L608.5 164L610.5 164.1L611 164.9ZM560.2 178L565.9 180.2L568.5 189.9L562.8 186.5L560.6 179L560.2 178ZM595.8 183.3L591.7 183L589.2 189.6L581 191.1L579.7 189.8L579.3 188.2L582.3 188.6L582.7 186.7L586 185.7L588.4 182.5L590.7 182.9L593.5 176.9L598.4 180.4L597.2 182.6L595.8 183.3ZM590.9 180.3L589.3 183.6L589.2 181.6L590.9 180.3ZM387.6 86.1L393.1 86.1L390.7 88.5L387.4 88.4L387.4 87.2L387.6 86.1ZM417.2 34.3L416.9 35.9L420 37.4L418.1 39.2L420.4 41.8L419.1 43.7L420.9 45.4L420.1 46.9L423 48.5L416.1 53.9L405.7 55.5L402.6 53.4L402.1 49.1L410.8 43.4L407.1 40.4L407.1 36.9L401.3 34.2L409.5 35.2L412.4 32.5L418 32.7L417.2 34.3ZM405.1 80.2L403.7 81.9L394 82.4L397.1 79.2L403.2 79.3L405.1 80.2ZM390 75.5L397.7 79.2L393.9 81.3L390.5 80.3L388.7 81.4L384.5 77.4L389.1 75.8L390 75.5ZM432.9 159.7L433.7 153.9L436.8 151.5L438.5 156.3L446.2 163.7L444.7 164.1L440.1 159.5L435.8 158.5L435.2 160.2L432.9 159.7ZM643.8 102.9L640.5 112.2L634.4 113.4L631.6 116L630.2 113.4L622 115.1L624 116.7L622.7 120.6L620.4 120.7L620.9 118.6L618.8 116.4L625.2 111.5L631.4 111.3L633.4 107.2L634.8 108.3L638.9 105.1L640.6 98.3L642.7 97.8L643.8 101L643.8 102.9ZM649.2 91.9L650.6 90.9L651.1 93.5L648.1 94.2L646.4 96.4L643.2 94.9L642.1 97.4L639.9 97.4L639.6 95.1L642.8 93.2L643.9 88.3L647.8 91.4L649.2 91.9ZM624.7 116L627.8 114L629.5 115.2L626 117.8L624.7 117.1L624.7 116ZM243.7 239.2L244.1 243.6L248.4 244.2L249.2 247.8L251.4 248L250.4 254L248.6 255.7L242.8 255.1L244.4 250.6L238.3 247.7L234.6 243.9L236.4 237.9L241.8 237.3L243.6 238.5L243.7 239.2ZM464 149.2L466.2 154.6L464.3 157L447 163.8L445.2 157.9L446.8 152.5L454 153.9L458.2 150.1L464 149.2ZM429.9 125.4L435 124L436 122.8L434 120.5L438.4 119L449.4 125.9L454.9 126.3L460.3 131.6L464 140L470.4 140.7L471.3 142.3L470 146.9L458.2 150.1L454 153.9L446.8 152.5L445.6 155.3L438.3 144L437 138.5L429.3 128.4L429.7 126.4L429.9 125.4ZM262.7 372L272.2 373L273.3 376.6L259 378.9L251.7 378L262.7 372L262.7 372ZM227.4 377.1L236.2 377.4L238.8 375.7L240.9 376.6L239.7 378.8L228.5 377.8L227.4 377.1ZM212.2 356.5L215.9 356.3L216.5 352.4L219.5 351L223.3 356.8L222.4 358.5L217.8 359.3L211.6 359L210 357.4L212.2 356.5ZM155.3 357.9L166.4 358L167.6 359.3L156.4 358.8L155.3 357.9ZM114.8 361.9L122.6 361.5L116.8 362.8L114.8 361.9ZM105.4 361.5L111.9 362.4L108.2 362.1L105.4 361.5ZM32.6 373.3L37.5 372.8L41.6 375.4L37.7 375.7L33.9 373.9L32.6 373.3ZM720 387.3L720 399.5L0 399.5L0 387.3L1.9 386L11.2 386.9L20.1 385.4L43.9 388.8L62.9 389.4L73.8 388.1L74.2 387L52.8 385L54.3 381.2L46.3 379L58.7 379.6L67.2 377.3L60.9 375L49.3 374.4L43.9 372L43.3 369.4L57.3 370.5L67.8 368.4L67.6 365.9L89.6 363.4L117.9 363.9L132.1 362.1L135.4 364.4L144.9 365.5L159.8 364.7L154.9 363L152.6 359.6L167.3 361.9L179.8 361.2L181.5 359.4L197.1 362.4L199.4 360.7L210.2 362.4L225.3 359.2L222.9 352.9L225.1 349.3L224.5 347.4L232.7 341.8L244.4 338.1L244.8 339.4L236 341.6L234.7 343.2L235.8 344.8L228.7 348.9L236.4 355.2L238.3 362L231.3 365.6L218.8 368.8L205.5 369L212.7 371.7L204.1 372.8L204 374.6L209.3 377.1L240.6 382L243.6 383.9L260.5 380.5L274.4 381.3L278.5 379.6L302.9 377.3L300.6 374.8L288.7 375.3L288.4 372.7L302.2 368.9L325 365.3L328.6 363.9L329.2 363L327.1 362.4L329.1 360.8L339.4 356.5L345.2 357.4L346.3 355.7L359.5 357.3L375.5 353.3L381.6 355.5L386.8 353.5L414.2 354.6L424 352.8L427.7 350.1L437.3 353L469.1 343.9L482.9 348.9L488.1 347.6L497.8 348.8L499.3 351.8L495.6 354.3L498.1 355.1L495.9 357.8L499.7 358.7L507.7 353.3L515.3 352.3L518.2 349.7L525.6 347.1L533.5 347L536 344.8L539.3 347L551.6 347.5L559.4 347.2L565.7 343.4L572.4 346.5L587.2 344.1L599.7 347.3L606.4 345.5L629.5 344.8L630.1 342.8L634.9 346.6L651 346.5L657.7 349.8L668.6 350.2L683.1 354.9L702.4 357.4L698.6 361.9L692.2 363.6L687.1 367.9L687 369.8L689.5 372.3L694 373.6L683.5 374.6L679.6 378.7L698.8 385.3L716.6 386.8L720 387.3ZM425.5 112.2L429.2 111L425.8 112.3L425.5 112.2ZM425.5 112.2L428 112.5L426 113.5L424.5 112.3L425.5 112.2ZM355.7 112.1L357.4 118.8L342.7 126.6L342.4 130.6L337.2 131.1L330.5 143.5L326 143.7L331.1 132.6L340.9 124.1L340.4 121.3L342.7 116.5L346.2 114.5L348.1 110.7L354.8 112.1L355.7 112.1ZM433.7 142.3L410 142.3L410.3 120.4L417.8 122L422 120.4L423.9 121.8L428.5 121.2L429.8 125.1L427.8 129.4L424.6 124.5L431.4 137.9L431.1 139.8L433.4 141.9L433.7 142.3ZM410 142.3L410 146.9L407.7 147.9L391.7 139.1L388.3 141.2L380.6 136.9L378.6 132.9L379.9 120.8L383 116.8L390.5 118.8L391.4 120.8L398.2 123.4L401.7 117.8L409.8 119.6L410 133.9L410 142.3ZM455.6 174.5L449.9 181.4L443.7 183.8L441.5 183.1L439.1 185L432.3 182.6L425.9 175L427.7 173.6L428.5 168.4L432.9 159.7L435.2 160.2L435.8 158.5L441.8 160.4L444.7 164.1L443.5 167.5L445.6 167.8L447.4 171.8L453.9 174.5L455.6 174.5ZM444.7 164.1L446.6 164.4L445.6 167.8L443.5 167.5L444 165.1L444.7 164.1ZM457.9 166.6L457.9 171.1L455.6 174.5L447.4 171.8L445.1 168.6L446.3 166.5L448.2 168.9L457.9 166.6L457.9 166.6ZM427.8 195L419.2 195.9L422.5 184.2L428 183.1L430.1 188.5L427.8 192.6L427.8 195ZM420.8 195.4L421.5 198.1L418 199.4L419.6 196.2L420.8 195.4ZM397.1 94.9L392.9 91.7L391.9 89L398.7 89.8L398.9 92.8L397.4 93.7L397.1 94.9ZM404.8 95.7L405.9 97.9L401.2 98.5L401.5 96.3L403.8 95.7L404.8 95.7ZM397.7 87.4L400.4 86.9L405.4 90.5L404.8 95.7L398.4 92.9L398.1 88.3L397.7 87.4ZM400.1 95.1L398.7 96.7L396.9 95.3L398.4 92.9L400.5 94.6L400.1 95.1ZM401.2 96.8L400.1 95.1L401.6 93.5L403.6 94.9L401.4 96.8L401.2 96.8ZM236.6 168.1L238.2 167.9L238.1 169.6L236.7 169L236.6 168.1ZM421.7 184.8L419.4 182.3L416 182.7L407.8 173.1L411.6 168.9L413.5 171.1L417.9 171.3L420 169.2L422.7 170.3L424.8 167.4L424.1 165.4L426.4 164.9L427.9 172.9L425.9 175L430.6 180.2L426.8 184.1L422.5 184.2L421.7 184.8Z';
var MAP_CENTROIDS = {
  HK: [114.2, 22.3], TW: [121.0, 23.7], JP: [138.2, 36.2], SG: [103.8, 1.35],
  KR: [127.8, 36.5], US: [-98.6, 39.8], GB: [-2.0, 54.0], DE: [10.4, 51.2],
  FR: [2.2, 46.6], CA: [-106.3, 56.1], AU: [133.8, -25.3], TR: [35.2, 39.0],
  RU: [90.0, 60.0], NL: [5.3, 52.1], PH: [121.8, 12.9], MY: [102.0, 4.2],
  TH: [101.0, 15.1], VN: [108.3, 14.1], ID: [118.0, -2.5], IN: [78.0, 21.0],
  IT: [12.6, 41.9], ES: [-3.7, 40.2], UA: [31.2, 49.0], BR: [-52.9, -10.8],
  AR: [-64.0, -34.0], SE: [15.0, 62.0], CH: [8.2, 46.8]
};

function mapXY(lng, lat) {
  return [(lng + 180) / 360 * WORLD_W,
    (WORLD_LAT_TOP - lat) / (WORLD_LAT_TOP - WORLD_LAT_BOT) * WORLD_H];
}

/* 国家分布世界地图：气泡位置=国家经纬度，大小=节点数 */
function countryMapHtml(regionRows) {
  var pts = [];
  regionRows.forEach(function (r) {
    var c = MAP_CENTROIDS[r[0]];
    if (c) pts.push({ code: r[0], count: r[1], xy: mapXY(c[0], c[1]) });
  });
  if (!pts.length) return '';
  var counts = pts.map(function (p) { return p.count; });
  var max = Math.max.apply(null, counts), min = Math.min.apply(null, counts);
  var circles = pts.map(function (p) {
    var t = max === min ? 1 : (p.count - min) / (max - min);
    var name = (CN_NAMES[p.code] || p.code);
    return '<circle class="c-bub' + (p.count >= 7 ? ' top' : '') + '" cx="' +
      p.xy[0].toFixed(1) + '" cy="' + p.xy[1].toFixed(1) + '" r="' + (4 + t * 9).toFixed(1) +
      '" data-tip="' + flagImg(p.code) + esc(name) + ' · ' + p.count + ' 个节点"/>';
  }).join('');
  // 自定义悬浮提示（SVG 原生 title 在 Windows 下无法渲染旗帜 emoji）
  return '<div class="c-mapwrap">' +
    '<svg class="c-world" viewBox="0 0 720 326" role="img" aria-label="节点世界分布地图">' +
    '<path class="c-land" d="' + WORLD_PATH + '"/>' + circles + '</svg>' +
    '<div class="c-tip" hidden></div></div>';
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
    var label = r[0] === '未知' ? '🌐 未知' : flagImg(r[0]) + ' ' + r[0];
    return '<div class="c-row">' +
      '<div class="c-head"><div class="c-left"><span class="c-flag">' + label + '</span>' +
      '<span class="c-name">' + esc(r[2] || (r[0] === '未知' ? '未知地区' : '')) + '</span></div>' +
      '<div class="c-right"><span class="c-count">' + r[1] + ' 个节点</span>' +
      '<span class="c-pct">' + regionPcts[idx] + '%</span></div></div>' +
      '<div class="c-bar"><span class="c-fill cg-' + (idx % 8) + '" style="width:' +
      Math.round(r[1] / countryMax * 100) + '%"></span></div></div>';
  }).join('');
  var mapHtml = countryRows ? countryMapHtml(regionRows) : '';
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
    (mapHtml ?
      '<div class="c-tabs" style="margin-top:14px">' +
      '<button type="button" class="c-tab on" data-cv="c-map">分布地图</button>' +
      '<button type="button" class="c-tab" data-cv="c-list">地区列表</button></div>' : '') +
    (mapHtml ?
      '<div id="c-map" style="margin-top:12px">' + mapHtml + '</div>' +
      '<div id="c-list" style="margin-top:14px" hidden>' + countryRows + '</div>' :
      '<div style="margin-top:14px">' + countryRows + '</div>') +
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

  var mapwrap = document.querySelector('.t-country .c-mapwrap');
  if (mapwrap) {
    var tip = mapwrap.querySelector('.c-tip');
    mapwrap.addEventListener('mousemove', function (e) {
      var bub = e.target.closest('.c-bub');
      if (!bub) { tip.hidden = true; return; }
      tip.innerHTML = bub.dataset.tip || '';
      tip.hidden = false;
      var rect = mapwrap.getBoundingClientRect();
      var x = e.clientX - rect.left + 12, y = e.clientY - rect.top - 30;
      if (x + tip.offsetWidth + 8 > rect.width) x = e.clientX - rect.left - tip.offsetWidth - 12;
      if (y < 0) y = e.clientY - rect.top + 14;
      tip.style.left = x + 'px';
      tip.style.top = y + 'px';
    });
    mapwrap.addEventListener('mouseleave', function () { tip.hidden = true; });
  }
  $('#qa-node').addEventListener('click', function () { state.pendingDialog = 'add-node'; location.hash = '#/nodes'; });
  document.querySelectorAll('.c-tab').forEach(function (t) {
    t.addEventListener('click', function () {
      document.querySelectorAll('.c-tab').forEach(function (x) { x.classList.remove('on'); });
      t.classList.add('on');
      var map = $('#c-map'), list = $('#c-list');
      if (map) map.hidden = t.dataset.cv !== 'c-map';
      if (list) list.hidden = t.dataset.cv !== 'c-list';
    });
  });
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

function subDlgBody(name, clash, udp, cert) {
  return '<label class="field"><span>订阅名称 *</span><input id="f-subname" class="input" value="' + esc(name || '') + '" placeholder="订阅名"/>' +
    '</label>' +
    '<p class="pick-hint">订阅自动包含全部节点（当前 <b>' + state.nodes.length + '</b> 个），后续新增/删除节点无需修改订阅。</p>' +
    '<label class="field"><span>Clash 模板</span><input id="f-clash" class="input" value="' + esc(clash || 'clash.yaml') + '"/></label>' +
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
    subDlgBody(sub ? sub.Name : '', cfg.clash, cfg.udp, cfg.cert),
    isEdit ? '保存' : '创建', async function () {
      var name = $('#f-subname').value.trim();
      if (!name) throw new Error('订阅名称不能为空');
      if (!state.nodes.length) throw new Error('暂无节点，请先到节点管理添加节点');
      var config = JSON.stringify({
        clash: $('#f-clash').value.trim() || 'clash.yaml',
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

/* ================= 模板配置（可视化编辑） ================= */
/* ================= 模板配置（可视化编辑） ================= */
var TPL_TYPES = [
  { v: 'select', n: 'Selector（手动选择）' },
  { v: 'url-test', n: 'URLTest（自动测速）' },
  { v: 'fallback', n: 'Fallback（故障转移）' },
  { v: 'load-balance', n: 'LoadBalance（负载均衡）' },
  { v: 'relay', n: 'Relay（链式代理）' }
];

function tplState() {
  if (!state.tpl) {
    state.tpl = { file: '', parsed: null, groups: [], rules: [], providers: [], openGroup: -1, openRule: -1, tab: 'viz', dirty: false, rawDirty: false };
  }
  return state.tpl;
}

async function renderTemplates() {
  var view = $('#view');
  var t = tplState();
  view.innerHTML = '<div class="loading">加载中…</div>';
  try {
    var d = await api('/api/v1/template/get');
    state.templates = d.data || [];
  } catch (e) { view.innerHTML = errorBox(e.message); return; }

  if (!state.templates.length) {
    view.innerHTML =
      '<div class="page-bar"><span class="page-count">模板目录 ./template</span>' +
      '<button id="btn-add-tpl" class="btn btn-primary" type="button">' + icon('plus', 15) + '新建模板</button></div>' +
      '<section class="tile"><p class="empty">暂无模板文件 · 点击右上角「新建模板」创建</p></section>';
    $('#btn-add-tpl').addEventListener('click', function () { openTplDlg(null); });
    return;
  }

  var cur = state.templates.some(function (x) { return x.file === t.file; }) ? t.file : state.templates[0].file;
  view.innerHTML =
    '<div class="page-bar"><span class="page-count">模板目录 ./template · 可视化编辑策略组与规则</span>' +
    '<button id="btn-add-tpl" class="btn" type="button">' + icon('plus', 15) + '新建模板</button></div>' +
    '<div class="tpl-layout">' +
    '<aside class="tile tpl-side"><div class="tpl-side-h">模板文件<span>' + state.templates.length + '</span></div>' +
    '<div id="tpl-files">' + state.templates.map(function (x) {
      return '<div class="tpl-file' + (x.file === cur ? ' on' : '') + '" data-file="' + esc(x.file) + '">' +
        '<span class="tpl-ico">' + esc((x.file.split('.')[1] || 't')[0].toUpperCase()) + '</span>' +
        '<span class="tpl-fname">' + esc(x.file) + '</span>' +
        '<button class="tpl-del" data-act="del" aria-label="删除">' + icon('trash', 12) + '</button></div>';
    }).join('') + '</div></aside>' +
    '<div class="tpl-main" id="tpl-main"></div>' +
    '</div>';

  $('#btn-add-tpl').addEventListener('click', function () { openTplDlg(null); });
  $('#tpl-files').addEventListener('click', function (e) {
    var del = e.target.closest('button[data-act="del"]');
    if (del) {
      var f = del.closest('.tpl-file').dataset.file;
      confirmDlg('确定删除模板「' + f + '」吗？', '删除', async function () {
        await api('/api/v1/template/delete', { method: 'POST', form: { filename: f } });
        toast('删除成功', true);
        state.tpl = null;
        renderTemplates();
      });
      return;
    }
    var row = e.target.closest('.tpl-file');
    if (!row) return;
    document.querySelectorAll('.tpl-file').forEach(function (x) { x.classList.remove('on'); });
    row.classList.add('on');
    loadTplStruct(row.dataset.file);
  });
  $('#tpl-main').addEventListener('click', tplMainClick);
  $('#tpl-main').addEventListener('change', tplMainChange);
  $('#tpl-main').addEventListener('input', tplMainChange);

  loadTplStruct(cur);
}

async function loadTplStruct(file) {
  var t = tplState();
  t.file = file;
  t.openGroup = -1;
  t.openRule = -1;
  t.dirty = false;
  t.rawDirty = false;
  var main = $('#tpl-main');
  if (main) main.innerHTML = '<section class="tile"><p class="empty">解析中…</p></section>';
  try {
    var d = await api('/api/v1/template/parse?file=' + encodeURIComponent(file));
    t.parsed = d.data;
    t.groups = (d.data.groups || []).map(function (g) { return JSON.parse(JSON.stringify(g)); });
    t.rules = (d.data.rules || []).slice();
    t.providers = (d.data.providers || []).map(function (x) { return JSON.parse(JSON.stringify(x)); });
    if (t.tab === 'viz' && !d.data.hasProxyGroups) t.tab = 'raw';
    renderTplEditor();
  } catch (e) {
    if (main) main.innerHTML = errorBox(e.message);
  }
}

function tplGroupIcon(g) {
  if (g.icon) {
    return '<img src="' + esc(g.icon) + '" alt="" onerror="this.parentNode.textContent=\'◇\'"/>';
  }
  var map = { select: '◇', 'url-test': '⚡', fallback: '⇄', 'load-balance': '⚖', relay: '⛓' };
  return map[g.type] || '◇';
}

function tplTags(g) {
  var out = '';
  if (g.includeAll) out += '<span class="tag g">include-all</span>';
  if (g.filter && /SublinkX/.test(g.filter)) out += '<span class="tag o">已锁定</span>';
  else if (g.filter) out += '<span class="tag">filter</span>';
  if (!g.includeAll && !g.filter && (g.proxies || []).length) out += '<span class="tag p">节点注入</span>';
  return out;
}

function renderTplEditor() {
  var t = tplState();
  var p = t.parsed || {};
  var main = $('#tpl-main');
  if (!main) return;
  var issues = (p.issues || []).slice();
  // 前端实时补充校验
  var names = {};
  t.groups.forEach(function (g) {
    if (!g.name) issues.push('存在未命名的策略组');
    else if (names[g.name]) issues.push('策略组重名：' + g.name);
    else names[g.name] = true;
  });
  var exist = Object.assign({ DIRECT: 1, REJECT: 1 }, names);
  t.rules.forEach(function (r, i) {
    var parts = String(r).split(',');
    var target = parts[parts.length - 1];
    if (target === 'no-resolve') target = parts[parts.length - 2];
    if (parts[0] && parts[0].toUpperCase() === 'MATCH') {
      if (!exist[target]) issues.push('第 ' + (i + 1) + ' 条 MATCH 目标不存在：' + target);
    } else if (target && !exist[target] && target !== 'no-resolve') {
      issues.push('第 ' + (i + 1) + ' 条规则目标组不存在：' + target);
    }
  });
  var chip = issues.length
    ? '<span class="tpl-chip bad">⚠ ' + issues.length + ' 个问题</span>'
    : '<span class="tpl-chip ok">✓ 校验通过</span>';

  main.innerHTML =
    '<section class="tile tpl-editor">' +
    '<header class="tpl-head">' +
    '<div class="tpl-title"><b>' + esc(t.file) + '</b>' +
    '<span class="tpl-meta">' + t.groups.length + ' 组 · ' + t.rules.length + ' 规则</span></div>' +
    '<div class="tpl-tabs">' +
    '<button class="' + (t.tab === 'viz' ? 'on' : '') + '" data-tab="viz" type="button">可视化编辑</button>' +
    '<button class="' + (t.tab === 'raw' ? 'on' : '') + '" data-tab="raw" type="button">原始 YAML</button>' +
    '</div>' + chip +
    '<button class="btn btn-primary" id="btn-tpl-save" type="button">' + icon('check', 15) + '保存模板</button>' +
    '</header>' +
    (t.tab === 'viz' ? tplVizHtml(issues) : tplRawHtml()) +
    '</section>';

  if (t.tab === 'raw') {
    var ta = $('#tpl-raw-editor');
    if (ta) ta.addEventListener('input', function () { t.rawDirty = true; });
  } else {
    bindTplDrag();
  }
}

function tplVizHtml(issues) {
  var t = tplState();
  var groupRows = t.groups.map(function (g, i) {
    var open = t.openGroup === i;
    return '<div class="tpl-g' + (open ? ' open' : '') + '" draggable="true" data-gi="' + i + '">' +
      '<span class="tpl-grip">⠿</span>' +
      '<span class="tpl-gimg">' + tplGroupIcon(g) + '</span>' +
      '<span class="tpl-gn"><b>' + esc(g.name || '(未命名)') + '</b>' +
      '<i>' + esc(g.type || 'select') + (g.includeAll ? ' · 自动包含全部节点' : ' · ' + (g.proxies || []).length + ' 个候选') + '</i></span>' +
      tplTags(g) +
      '<span class="tpl-gact">' +
      '<button class="iconbtn sm" data-act="edit-group" data-gi="' + i + '" aria-label="编辑">' + icon('edit', 13) + '</button>' +
      '<button class="iconbtn sm danger" data-act="del-group" data-gi="' + i + '" aria-label="删除">' + icon('trash', 13) + '</button>' +
      '</span></div>' +
      (open ? tplGroupForm(g, i) : '');
  }).join('');

  var pvMap = {};
  (t.providers || []).forEach(function (x) { pvMap[x.name] = x; });
  var ruleRows = t.rules.map(function (r, i) {
    var parts = String(r).split(',');
    var kind = parts[0] || '';
    var tail = parts.slice(1);
    var extra = '';
    if (tail.length >= 2 && String(tail[tail.length - 1]).trim() === 'no-resolve') {
      extra = 'no-resolve';
      tail = tail.slice(0, tail.length - 1);
    }
    var target = tail.length ? tail[tail.length - 1] : '';
    var body = tail.slice(0, tail.length - 1).join(',');
    var open = t.openRule === i;
    var pv = pvMap[body];
    var src = (pv && pv.url) ? pv.url : '';
    return '<tr class="tpl-r' + (open ? ' open' : '') + '" draggable="true" data-ri="' + i + '">' +
      '<td class="n"><span class="tpl-grip">⠿</span>' + (i + 1) + '</td>' +
      '<td><span class="tag">' + esc(kind) + '</span></td>' +
      '<td class="m">' + esc(body || '—') +
      (extra ? ' <span class="tag o">no-resolve</span>' : '') + '</td>' +
      '<td class="src">' + (src
        ? '<span class="mono" title="' + esc(src) + '">' + esc(src) + '</span>'
        : '<span class="dim">—</span>') + '</td>' +
      '<td><span class="tag p">' + esc(target || '—') + '</span></td>' +
      '<td class="ops"><button class="iconbtn sm" data-act="edit-rule" data-ri="' + i + '" aria-label="编辑">' + icon('edit', 13) + '</button>' +
      '<button class="iconbtn sm danger" data-act="del-rule" data-ri="' + i + '" aria-label="删除">' + icon('trash', 13) + '</button></td></tr>' +
      (open ? tplRuleForm(r, i) : '');
  }).join('');

  return '<div class="tpl-body">' +
    (issues.length ? '<div class="tpl-warn">⚠ ' + issues.map(esc).join('；') + '</div>' : '') +
    '<div class="tpl-sec"><div class="tpl-sec-h"><b>策略组</b><span class="cnt">' + t.groups.length + ' 个</span>' +
    '<button class="tpl-add" data-act="add-group" type="button">+ 新建组</button></div>' +
    '<div class="tpl-groups">' + (groupRows || '<p class="empty">暂无策略组</p>') + '</div></div>' +

    '<div class="tpl-sec"><div class="tpl-sec-h"><b>规则</b><span class="cnt">按顺序匹配 · 拖拽调整优先级</span>' +
    '<button class="tpl-add" data-act="add-rule" type="button">+ 添加规则</button></div>' +
    '<table class="table tpl-rules"><thead><tr><th style="width:52px">#</th><th style="width:112px">类型</th><th style="width:190px">内容</th>' +
    '<th>来源</th><th style="width:132px">目标策略组</th><th style="text-align:right;width:104px">操作</th></tr></thead>' +
    '<tbody>' + (ruleRows || '<tr><td colspan="6"><p class="empty">暂无规则</p></td></tr>') + '</tbody></table></div>' +
    '</div>';
}

function tplGroupForm(g, i) {
  var opts = TPL_TYPES.map(function (x) {
    return '<option value="' + x.v + '"' + (g.type === x.v ? ' selected' : '') + '>' + x.n + '</option>';
  }).join('');
  return '<div class="tpl-form">' +
    '<label class="fl"><span>组名称</span><input class="input" data-gf="name" data-gi="' + i + '" value="' + esc(g.name) + '"/></label>' +
    '<label class="fl"><span>类型</span><select class="input" data-gf="type" data-gi="' + i + '">' + opts + '</select></label>' +
    '<label class="fl full"><span>候选（逗号分隔，可填组名 / DIRECT / REJECT）</span>' +
    '<input class="input mono" data-gf="proxies" data-gi="' + i + '" value="' + esc((g.proxies || []).join(', ')) + '"/></label>' +
    '<label class="fl"><span>图标 URL</span><input class="input mono" data-gf="icon" data-gi="' + i + '" value="' + esc(g.icon || '') + '"/></label>' +
    '<label class="fl"><span>自动包含全部节点</span><span class="tpl-inl">' +
    '<input type="checkbox" data-gf="includeAll" data-gi="' + i + '"' + (g.includeAll ? ' checked' : '') + '/>启用 include-all</span></label>' +
    '<label class="fl"><span>筛选正则 filter</span><input class="input mono" data-gf="filter" data-gi="' + i + '" value="' + esc(g.filter || '') + '"/></label>' +
    '<label class="fl"><span>排除正则 exclude-filter</span><input class="input mono" data-gf="excludeFilter" data-gi="' + i + '" value="' + esc(g.excludeFilter || '') + '"/></label>' +
    '<label class="fl"><span>测速地址 URL</span><input class="input mono" data-gf="url" data-gi="' + i + '" value="' + esc(g.url || '') + '"/></label>' +
    '<label class="fl"><span>间隔（秒）</span><input class="input" type="number" data-gf="interval" data-gi="' + i + '" value="' + (g.interval || '') + '"/></label>' +
    '<label class="fl"><span>容差 tolerance</span><input class="input" type="number" data-gf="tolerance" data-gi="' + i + '" value="' + (g.tolerance || '') + '"/></label>' +
    '</div>';
}

function tplRuleForm(r, i) {
  var parts = String(r).split(',');
  var kind = parts[0] || '';
  var tail = parts.slice(1);
  var extra = '';
  if (tail.length >= 2 && String(tail[tail.length - 1]).trim() === 'no-resolve') {
    extra = 'no-resolve';
    tail = tail.slice(0, tail.length - 1);
  }
  var target = tail.length ? tail[tail.length - 1] : '';
  var body = tail.slice(0, tail.length - 1).join(',');
  var names = ['DIRECT', 'REJECT'];
  tplState().groups.forEach(function (g) { if (g.name) names.push(g.name); });
  var sel = '<select class="input" id="tpl-rule-target-' + i + '">' + names.map(function (n) {
    return '<option' + (n === target ? ' selected' : '') + '>' + esc(n) + '</option>';
  }).join('') + (names.indexOf(target) < 0 ? '<option selected>' + esc(target) + '</option>' : '') + '</select>';
  var pv = null;
  (tplState().providers || []).forEach(function (x) { if (x.name === body) pv = x; });
  var pvHtml = tplProviderFields(i, body, pv);
  return '<tr class="tpl-form-row"><td colspan="6"><div class="tpl-form tpl-form-inline">' +
    '<label class="fl"><span>规则类型</span><input class="input mono" id="tpl-rule-kind-' + i + '" value="' + esc(kind) + '"/></label>' +
    '<label class="fl"><span>内容（RULE-SET 名 / 域名 / IP 等）</span><input class="input mono" id="tpl-rule-body-' + i + '" value="' + esc(body) + '"/></label>' +
    '<label class="fl"><span>目标策略组</span>' + sel + '</label>' +
    '<input type="hidden" id="tpl-rule-extra-' + i + '" value="' + esc(extra) + '"/>' +
    '<label class="fl"><span>&nbsp;</span><button class="btn btn-primary" data-act="save-rule" data-ri="' + i + '" type="button">应用</button></label>' +
    '</div>' + pvHtml + '</td></tr>';
}

function bindTplDrag() {
  var t = tplState();
  var dragKind = null, dragIndex = -1;

  function makeDraggable(row, kind, index) {
    row.addEventListener('dragstart', function (e) {
      dragKind = kind;
      dragIndex = index;
      row.classList.add('dragging');
      try { e.dataTransfer.setData('text/plain', kind + ':' + index); e.dataTransfer.effectAllowed = 'move'; } catch (err) {}
    });
    row.addEventListener('dragend', function () { row.classList.remove('dragging'); });
    row.addEventListener('dragover', function (e) {
      if (dragKind !== kind) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      row.classList.add('dragover');
    });
    row.addEventListener('dragleave', function () { row.classList.remove('dragover'); });
    row.addEventListener('drop', function (e) {
      e.preventDefault();
      row.classList.remove('dragover');
      if (dragKind !== kind || dragIndex === index) return;
      var arr = kind === 'g' ? t.groups : t.rules;
      var moved = arr.splice(dragIndex, 1)[0];
      arr.splice(index, 0, moved);
      t.openGroup = -1;
      t.openRule = -1;
      renderTplEditor();
      toast('顺序已更新', true);
    });
  }

  document.querySelectorAll('.tpl-groups .tpl-g').forEach(function (row) {
    var idx = +row.dataset.gi;
    if (!isNaN(idx)) makeDraggable(row, 'g', idx);
  });
  document.querySelectorAll('.tpl-rules tbody tr.tpl-r').forEach(function (row) {
    var idx = +row.dataset.ri;
    if (!isNaN(idx)) makeDraggable(row, 'r', idx);
  });
}

function tplProviderFields(idx, name, pv) {
  var type = pv ? pv.type : 'http';
  var behavior = pv ? pv.behavior : 'domain';
  var format = pv ? pv.format : 'mrs';
  var interval = pv ? (pv.interval || 86400) : 86400;
  var url = pv ? (pv.url || '') : '';
  var behOpts = ['domain', 'ipcidr', 'classical'].map(function (b) {
    return '<option' + (b === behavior ? ' selected' : '') + '>' + b + '</option>';
  }).join('');
  var fmtOpts = ['mrs', 'text', 'yaml'].map(function (f) {
    return '<option' + (f === format ? ' selected' : '') + '>' + f + '</option>';
  }).join('');
  return '<div class="tpl-pv">' +
    '<div class="tpl-pv-h">' + (pv ? '规则集定义（rule-providers.' + esc(name) + '）' : '规则集定义（将新建 rule-providers.' + esc(name) + '）') +
    '<span class="tag ' + (pv ? 'g' : 'o') + '">' + (pv ? '已存在' : '新建') + '</span></div>' +
    '<div class="tpl-pv-grid">' +
    '<label class="fl full"><span>来源 URL</span><input class="input mono" id="tpl-pv-url-' + idx + '" value="' + esc(url) + '" placeholder="https://…/AI.list"/></label>' +
    '<label class="fl"><span>behavior</span><select class="input" id="tpl-pv-behavior-' + idx + '">' + behOpts + '</select></label>' +
    '<label class="fl"><span>format</span><select class="input" id="tpl-pv-format-' + idx + '">' + fmtOpts + '</select></label>' +
    '<label class="fl"><span>刷新间隔（秒）</span><input class="input" type="number" id="tpl-pv-interval-' + idx + '" value="' + interval + '"/></label>' +
    '<label class="fl"><span>type</span><input class="input mono" id="tpl-pv-type-' + idx + '" value="' + esc(type) + '"/></label>' +
    '</div></div>';
}

function tplRawHtml() {
  var t = tplState();
  var raw = (t.parsed && t.parsed.raw) || '';
  return '<div class="tpl-body"><div class="tpl-sec"><div class="tpl-sec-h"><b>原始 YAML</b>' +
    '<span class="cnt">直接编辑全文，保存后可视化视图同步</span></div>' +
    '<textarea id="tpl-raw-editor" class="tpl-raw" spellcheck="false">' + esc(raw) + '</textarea></div></div>';
}

function tplMainClick(e) {
  var t = tplState();
  // 整行点击展开/收起规则（按钮与表单区域除外）
  var ruleRow = e.target.closest('tr.tpl-r');
  if (ruleRow && !e.target.closest('button') && !e.target.closest('.tpl-form-row')) {
    var ridx = +ruleRow.dataset.ri;
    t.openRule = (t.openRule === ridx) ? -1 : ridx;
    t.openGroup = -1;
    renderTplEditor();
    return;
  }
  // 策略组整行同样可点
  var gRow = e.target.closest('.tpl-g');
  if (gRow && !e.target.closest('button') && !e.target.closest('input') && !e.target.closest('.tpl-form')) {
    var gidx = +gRow.dataset.gi;
    t.openGroup = (t.openGroup === gidx) ? -1 : gidx;
    t.openRule = -1;
    renderTplEditor();
    return;
  }
  var tabBtn = e.target.closest('button[data-tab]');
  if (tabBtn) {
    t.tab = tabBtn.dataset.tab;
    renderTplEditor();
    return;
  }
  if (e.target.closest('#btn-tpl-save')) { saveTplStruct(); return; }

  var btn = e.target.closest('button[data-act]');
  if (!btn) return;
  var act = btn.dataset.act;

  if (act === 'edit-group') {
    var gi = +btn.dataset.gi;
    t.openGroup = (t.openGroup === gi) ? -1 : gi;
    renderTplEditor();
  } else if (act === 'del-group') {
    var dg = +btn.dataset.gi;
    t.groups.splice(dg, 1);
    t.openGroup = -1;
    renderTplEditor();
    toast('已删除策略组', true);
  } else if (act === 'add-group') {
    t.groups.push({ name: '新策略组', type: 'select', proxies: ['DIRECT'], icon: '', filter: '', excludeFilter: '', includeAll: false, url: '', interval: 0, tolerance: 0, extra: {} });
    t.openGroup = t.groups.length - 1;
    renderTplEditor();
  } else if (act === 'edit-rule') {
    var ri = +btn.dataset.ri;
    t.openRule = (t.openRule === ri) ? -1 : ri;
    renderTplEditor();
  } else if (act === 'del-rule') {
    t.rules.splice(+btn.dataset.ri, 1);
    t.openRule = -1;
    renderTplEditor();
  } else if (act === 'add-rule') {
    openAddRuleDlg();
  } else if (act === 'save-rule') {
    var idx = +btn.dataset.ri;
    var kind = $('#tpl-rule-kind-' + idx).value.trim();
    var body = $('#tpl-rule-body-' + idx).value.trim();
    var target = $('#tpl-rule-target-' + idx).value;
    if (!kind) { toast('规则类型不能为空', false); return; }
    var extraEl = document.getElementById('tpl-rule-extra-' + idx);
    var extra = extraEl ? extraEl.value : '';
    var rule = kind.toUpperCase() === 'MATCH'
      ? ('MATCH,' + target)
      : (kind + ',' + body + ',' + target + (extra ? ',' + extra : ''));
    t.rules[idx] = rule;
    // 同步规则集定义
    if (String(kind).toUpperCase().indexOf('RULE-SET') >= 0) {
      var pvUrl = $('#tpl-pv-url-' + idx) ? $('#tpl-pv-url-' + idx).value.trim() : '';
      if (pvUrl) {
        t.providers = t.providers || [];
        var pvObj = {
          name: body,
          type: $('#tpl-pv-type-' + idx).value.trim() || 'http',
          behavior: $('#tpl-pv-behavior-' + idx).value,
          format: $('#tpl-pv-format-' + idx).value,
          interval: parseInt($('#tpl-pv-interval-' + idx).value, 10) || 86400,
          url: pvUrl,
          path: '',
          extra: {}
        };
        var hit = -1;
        t.providers.forEach(function (x, k) { if (x.name === body) hit = k; });
        if (hit >= 0) t.providers[hit] = Object.assign(t.providers[hit], pvObj);
        else t.providers.push(pvObj);
      }
    }
    t.openRule = -1;
    renderTplEditor();
    toast('规则已更新', true);
  }
}

function tplMainChange(e) {
  var t = tplState();
  var f = e.target.closest('[data-gf]');
  if (!f) return;
  var gi = +f.dataset.gi;
  var key = f.dataset.gf;
  var g = t.groups[gi];
  if (!g) return;
  if (key === 'includeAll') g.includeAll = f.checked;
  else if (key === 'interval' || key === 'tolerance') g[key] = parseInt(f.value, 10) || 0;
  else if (key === 'proxies') g.proxies = f.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  else g[key] = f.value;
  t.dirty = true;
  // 名称/开关变化需要刷新卡片头部，但不要打断输入焦点
  if (key === 'type' || key === 'includeAll') {
    var saved = document.activeElement;
    renderTplEditor();
    if (saved) { var again = document.querySelector('[data-gf="' + key + '"][data-gi="' + gi + '"]'); if (again) again.focus(); }
  }
}

function openAddRuleDlg() {
  var t = tplState();
  var names = ['DIRECT', 'REJECT'];
  t.groups.forEach(function (g) { if (g.name) names.push(g.name); });
  var kindOpts = ['RULE-SET', 'DOMAIN', 'DOMAIN-SUFFIX', 'DOMAIN-KEYWORD', 'IP-CIDR', 'GEOIP', 'GEOSITE', 'MATCH']
    .map(function (k) { return '<option>' + k + '</option>'; }).join('');
  var targetOpts = names.map(function (n) { return '<option>' + esc(n) + '</option>'; }).join('');
  dlgOpen('添加规则',
    '<div class="addrule-grid">' +
    '<label class="field"><span>规则类型</span><select id="ar-kind" class="input" style="width:100%">' + kindOpts + '</select></label>' +
    '<label class="field"><span>内容（RULE-SET 名 / 域名 / IP）</span><input id="ar-body" class="input mono" placeholder="如 AI / telegram_domain"/></label>' +
    '<label class="field"><span>目标策略组</span><select id="ar-target" class="input" style="width:100%">' + targetOpts + '</select></label>' +
    '</div>' +
    '<div class="addrule-pv">' +
    '<div class="tpl-pv-h">规则集定义（选择 RULE-SET 时生效）<span class="tag o">可选</span></div>' +
    '<div class="tpl-pv-grid">' +
    '<label class="fl full"><span>来源 URL</span><input id="ar-pv-url" class="input mono" placeholder="https://…/AI.list 留空则仅引用已有规则集"/></label>' +
    '<label class="fl"><span>behavior</span><select id="ar-pv-behavior" class="input">' +
    '<option>domain</option><option>ipcidr</option><option>classical</option></select></label>' +
    '<label class="fl"><span>format</span><select id="ar-pv-format" class="input">' +
    '<option>mrs</option><option>text</option><option>yaml</option></select></label>' +
    '<label class="fl"><span>刷新间隔（秒）</span><input id="ar-pv-interval" class="input" type="number" value="86400"/></label>' +
    '</div></div>' +
    '<p class="pick-hint">规则会追加到列表末尾（MATCH 类规则建议保持最后）。</p>',
    '添加', async function () {
      var kind = $('#ar-kind').value.trim().toUpperCase();
      var body = $('#ar-body').value.trim();
      var target = $('#ar-target').value;
      if (kind !== 'MATCH' && !body) throw new Error('内容不能为空');
      var rule = kind === 'MATCH' ? ('MATCH,' + target) : (kind + ',' + body + ',' + target);
      t.rules.push(rule);
      if (kind === 'RULE-SET') {
        var pvUrl = $('#ar-pv-url').value.trim();
        if (pvUrl) {
          t.providers = t.providers || [];
          var pvObj = {
            name: body, type: 'http',
            behavior: $('#ar-pv-behavior').value,
            format: $('#ar-pv-format').value,
            interval: parseInt($('#ar-pv-interval').value, 10) || 86400,
            url: pvUrl, path: '', extra: {}
          };
          var hit = -1;
          t.providers.forEach(function (x, k) { if (x.name === body) hit = k; });
          if (hit >= 0) t.providers[hit] = Object.assign(t.providers[hit], pvObj);
          else t.providers.push(pvObj);
        }
      }
      renderTplEditor();
      toast('规则已添加，记得点击「保存模板」', true);
    }, { noFocus: false });
  var bodyInp = document.getElementById('ar-body');
  if (bodyInp) bodyInp.focus();
}

async function saveTplStruct() {
  var t = tplState();
  if (t.tab === 'raw') {
    var ta = $('#tpl-raw-editor');
    var text = ta ? ta.value : '';
    if (!text.trim()) { toast('内容不能为空', false); return; }
    try {
      await api('/api/v1/template/update', { method: 'POST', form: { filename: t.file, oldname: t.file, text: text } });
      toast('保存成功', true);
      await loadTplStruct(t.file);
    } catch (e) { toast('保存失败：' + e.message, false); }
    return;
  }
  try {
    await api('/api/v1/template/save', {
      method: 'POST',
      form: {
        file: t.file,
        groups: JSON.stringify(t.groups),
        rules: JSON.stringify(t.rules),
        providers: JSON.stringify(t.providers || [])
      }
    });
    toast('保存成功', true);
    await loadTplStruct(t.file);
  } catch (e) {
    toast('保存失败：' + e.message, false);
  }
}

async function openTplDlg(tpl) {
  var isEdit = !!tpl;
  dlgOpen(isEdit ? '编辑模板' : '新建模板',
    '<label class="field"><span>文件名 *</span><input id="f-filename" class="input" value="' + esc(isEdit ? tpl.file : '') + '" placeholder="如 clash.yaml"/></label>' +
    (isEdit ? '' : '<label class="field"><span>内容 *</span><textarea id="f-text" class="input" rows="14" placeholder="模板内容（YAML / CONF）"></textarea></label>'),
    isEdit ? '保存' : '创建', async function () {
      var filename = $('#f-filename').value.trim();
      if (!filename || filename.indexOf('/') >= 0 || filename.indexOf('\\') >= 0) throw new Error('文件名不能为空且不能包含路径分隔符');
      if (isEdit) {
        var text = '';
        await api('/api/v1/template/update', { method: 'POST', form: { filename: filename, oldname: tpl.file, text: $('#f-text') ? $('#f-text').value : tpl.text } });
        toast('保存成功', true);
      } else {
        var t = $('#f-text').value;
        if (!t.trim()) throw new Error('内容不能为空');
        await api('/api/v1/template/add', { method: 'POST', form: { filename: filename, text: t } });
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
    '<section class="tile" style="grid-column:span 6"><header class="tile-head">' +
    '<span class="head-ic blue">' + icon('lock', 15) + '</span><h3>修改账号密码</h3></header>' +
    '<form id="pwd-form" style="max-width:340px">' +
    '<label class="field"><span>新账号</span><input id="f-user" class="input" value="' + esc(me.username || '') + '" required/></label>' +
    '<label class="field" style="margin-top:14px"><span>新密码</span><input id="f-pass" class="input" type="password" required/></label>' +
    '<p class="form-error" id="pwd-error" hidden></p>' +
    '<button class="btn btn-primary" type="submit" style="margin-top:14px">保存并重新登录</button>' +
    '</form></section>' +
    '<section class="tile" style="grid-column:1/-1"><header class="tile-head">' +
    '<span class="head-ic blue">' + icon('link', 14) + '</span><h3>Telegram 机器人</h3>' +
    '<span class="chip ' + (tgConfigured ? '' : 'neutral') + '" style="margin-left:auto">' +
      (tgConfigured ? '已启用' : '未配置') + '</span>' +
    '</header>' +
    '<p style="font-size:12px;color:var(--muted);margin-bottom:12px">通过 @BotFather 创建机器人获取 Token。启用后可在 Telegram 中使用：/add 添加节点、/list 节点列表、/test 连通性测试、/del 删除节点、/sub 获取订阅链接。' +
    (tgConfigured ? (tgInfo.chatBound ? '当前已指定授权用户，其他账号发消息会被拒绝。' : '未指定授权用户，首次对话的账号将自动绑定。') : '') +
    '</p>' +
    '<form id="tg-form" style="max-width:560px">' +
    '<label class="field"><span>Bot Token' + (tgConfigured ? '（已配置，留空保持不变）' : ' *') + '</span><input id="f-tg-token" class="input mono" autocomplete="off" placeholder="' +
      (tgConfigured && tgInfo.tokenMasked ? '当前：' + esc(tgInfo.tokenMasked) + '（输入新值可替换）' : '如 123456789:AAxxxx...') +
      '" value=""/></label>' +
    '<label class="field" style="margin-top:14px"><span>授权用户 ID（留空则首次对话自动绑定）</span>' +
    '<input id="f-tg-chatid" class="input mono" autocomplete="off" placeholder="如 123456789，填 0 可解除绑定" value="' +
    esc(tgConfigured && tgInfo.chatId ? String(tgInfo.chatId) : '') + '"/></label>' +
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
          proxy: $('#f-tg-proxy').value.trim(),
          chatId: $('#f-tg-chatid').value.trim()
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
