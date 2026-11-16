(() => {
"use strict";

/* ---------- constants ---------- */
const SIZES = {
  square:   {w:1080,h:1080,label:"বর্গ",ratio:"১:১"},
  portrait: {w:1080,h:1350,label:"পোর্ট্রেট",ratio:"৪:৫"},
  wide:     {w:1200,h:630, label:"চওড়া",ratio:"১.৯:১"}
};
const BN_FONTS = {
  "Noto Sans Bengali": {title:700,bold:600,body:400,label:"নোটো সান্স বাংলা"},
  "Anek Bangla":       {title:700,bold:600,body:400,label:"অনেক বাংলা"},
  "Baloo Da 2":        {title:700,bold:600,body:400,label:"বালু দা"},
  "Noto Serif Bengali":{title:700,bold:700,body:400,label:"নোটো সেরিফ বাংলা"},
  "Tiro Bangla":       {title:400,bold:400,body:400,label:"তিরো বাংলা"}
};
const CODE_FONTS = ["JetBrains Mono","Fira Code","IBM Plex Mono"];
const LANGS = [
  ["auto","নিজে বুঝে নিক"],["javascript","JavaScript"],["typescript","TypeScript"],["python","Python"],
  ["java","Java"],["cpp","C++"],["c","C"],["csharp","C#"],["go","Go"],["rust","Rust"],["php","PHP"],
  ["kotlin","Kotlin"],["swift","Swift"],["dart","Dart"],["ruby","Ruby"],["sql","SQL"],["bash","Bash / Shell"],
  ["xml","HTML / XML"],["css","CSS"],["scss","SCSS"],["json","JSON"],["yaml","YAML"],["markdown","Markdown"],["plaintext","সাধারণ লেখা"]
];
const LANG_LABEL = Object.fromEntries(LANGS);
const THEMES = {
  msilabs:{name:"msilabs",bg1:"#0E182D",bg2:"#1B2B4D",dot:"#FFFFFF",fg:"#F5F7FB",muted:"#A3B2CE",accent:"#1ED6A8",onAccent:"#14213D",
    card:"#0A1325",cardLine:"rgba(30,214,168,0.16)",shadow:"rgba(0,0,0,0.5)",gutter:"#3A4B6E",
    syn:{fg:"#E6EBF5",kw:"#9A8CFF",str:"#5EEBC4",num:"#FFB020",com:"#66779A",fn:"#7CC4FF",type:"#C4B5FD",bi:"#1ED6A8",attr:"#FFD27A",tag:"#9A8CFF",meta:"#8FA0BF",punc:"#A3B2CE"}},
  night:{name:"রাত",bg1:"#0B1220",bg2:"#1B2643",dot:"#FFFFFF",fg:"#F2F5FB",muted:"#9AA6BF",accent:"#FFB547",onAccent:"#1A1206",
    card:"#090F1D",cardLine:"rgba(255,255,255,0.09)",shadow:"rgba(0,0,0,0.5)",gutter:"#3D4863",
    syn:{fg:"#E3E9F4",kw:"#FF7AB6",str:"#A6E07A",num:"#FFB547",com:"#6A7794",fn:"#7CC7FF",type:"#C9A2FF",bi:"#5EE0D0",attr:"#FFD58A",tag:"#FF7AB6",meta:"#8FA0BF",punc:"#9AA6BF"}},
  emerald:{name:"পান্না",bg1:"#05261F",bg2:"#0C4D41",dot:"#B8FFF0",fg:"#ECFBF6",muted:"#93C2B5",accent:"#5EEAD4",onAccent:"#032620",
    card:"#031A16",cardLine:"rgba(94,234,212,0.16)",shadow:"rgba(0,0,0,0.45)",gutter:"#2A5A50",
    syn:{fg:"#DDF4EE",kw:"#F9A8D4",str:"#BEF264",num:"#FDBA74",com:"#5E8C80",fn:"#7DD3FC",type:"#C4B5FD",bi:"#5EEAD4",attr:"#FDE68A",tag:"#F9A8D4",meta:"#7FA99D",punc:"#93C2B5"}},
  dawn:{name:"ভোর",bg1:"#EEF3FA",bg2:"#D6E2F4",dot:"#1B2A44",fg:"#0F1A2E",muted:"#4A5873",accent:"#2457D6",onAccent:"#FFFFFF",
    card:"#FFFFFF",cardLine:"rgba(15,26,46,0.10)",shadow:"rgba(30,50,90,0.20)",gutter:"#B6C0D0",light:true,
    syn:{fg:"#1F2937",kw:"#C0287A",str:"#15803D",num:"#B45309",com:"#8A94A6",fn:"#1D4ED8",type:"#7C3AED",bi:"#0E7490",attr:"#A16207",tag:"#C0287A",meta:"#64748B",punc:"#475569"}},
  dusk:{name:"গোধূলি",bg1:"#22101B",bg2:"#4D1B2B",dot:"#FFD9CC",fg:"#FFF1EC",muted:"#D3A7A0",accent:"#FF9466",onAccent:"#2A0E05",
    card:"#16080F",cardLine:"rgba(255,148,102,0.16)",shadow:"rgba(0,0,0,0.5)",gutter:"#5C3440",
    syn:{fg:"#F7E4DE",kw:"#FF8FB1",str:"#C8E68C",num:"#FFC27A",com:"#8A6670",fn:"#8FD3FF",type:"#E0B3FF",bi:"#FFB4A2",attr:"#FFD9A0",tag:"#FF8FB1",meta:"#B48C92",punc:"#D3A7A0"}},
  ink:{name:"কালি",bg1:"#131313",bg2:"#232323",dot:"#FFFFFF",fg:"#FAFAFA",muted:"#A3A3A3",accent:"#FACC15",onAccent:"#141414",
    card:"#0A0A0A",cardLine:"rgba(255,255,255,0.10)",shadow:"rgba(0,0,0,0.55)",gutter:"#3A3A3A",
    syn:{fg:"#E5E5E5",kw:"#FACC15",str:"#D4D4D4",num:"#FACC15",com:"#6B6B6B",fn:"#FFFFFF",type:"#FFFFFF",bi:"#E5E5E5",attr:"#BDBDBD",tag:"#FACC15",meta:"#8A8A8A",punc:"#8A8A8A"}}
};

/* ---------- helpers ---------- */
const $ = id => document.getElementById(id);
const bn = n => String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
const uid = () => Math.random().toString(36).slice(2, 10);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const seg = (typeof Intl !== "undefined" && Intl.Segmenter) ? new Intl.Segmenter("bn", {granularity:"grapheme"}) : null;
const graphemes = s => seg ? Array.from(seg.segment(s), x => x.segment) : Array.from(s);
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const clone = o => JSON.parse(JSON.stringify(o));
function rgba(hex, a){
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || ""); if (!m) return hex;
  const n = parseInt(m[1], 16); return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;
}
function rr(ctx, x, y, w, h, r){
  r = Math.min(r, w/2, h/2);
  ctx.beginPath(); ctx.moveTo(x+r, y); ctx.arcTo(x+w, y, x+w, y+h, r); ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r); ctx.arcTo(x, y, x+w, y, r); ctx.closePath();
}
const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

/* ---------- posts (tabs) ---------- */
const MAX_TABS = 5;
const KEY = {tabs: "kodpot.tabs", current: "kodpot.currentPoster", archive: "kodpot.archive", archiveHidden: "kodpot.archiveHidden", pane: "kodpot.pane"};
const DESIGN_KEYS = ["size","theme","accent","logo","fontBn","fontCode","codeSize","handle","footer","showLineNo","showChrome"];
function samplePost(){
  return {
    id: uid(), updated: Date.now(),
    size: "portrait", theme: "msilabs", accent: null, logo: null, fontBn: "Noto Sans Bengali", fontCode: "JetBrains Mono",
    codeSize: 0, handle: "msilabs", footer: "প্রতি সপ্তাহে নতুন কোড টিপস", showLineNo: true, showChrome: true,
    ...SAMPLE_CONTENT
  };
}
const SAMPLE_CONTENT = {
  tag: "আলো টিপস", title: "কম্পোনেন্ট বানানো এত সহজ!",
  body: "`components/` ফোল্ডারে একটা `Card.alo` বানান, ব্যস! যেকোনো পেজে `<Card title=\"…\">` লিখলেই চলবে, `import`-এর ঝামেলা নেই। ভেতরের লেখা বসে `<slot />`-এ, আর `<style>` থাকে **শুধু কার্ডের ভেতরে**।",
  code: "<template>\n  <article class=\"card\">\n    <h3>{{ props.title }}</h3>\n    <slot />\n  </article>\n</template>\n\n<style>\n  .card { padding: 24px; }\n</style>",
  lang: "xml", file: "components/Card.alo"
};
// আগের ডিফল্ট sample কেউ না ছুঁয়ে থাকলে নতুন sample দিয়ে বদলায়
const OLD_SAMPLE_CODE = "const prices = [120, 250, 80];\n\n// ১৫% ভ্যাট যোগ করে নতুন দাম\nconst withVat = prices.map((price) =>\n  Math.round(price * 1.15)\n);\n\nconsole.log(withVat); // [138, 288, 92]\nconsole.log(prices);  // [120, 250, 80]";
function isOldSample(p){ return p.code === OLD_SAMPLE_CODE && p.title === "map() নতুন অ্যারে বানায়" && p.file === "map.js"; }
function loadLibrary(){
  let list = store.get(KEY.tabs, null);
  if (!Array.isArray(list)) {
    // প্রথমবার: পুরোনো লাইব্রেরির সর্বশেষ ৫টা ট্যাবে আসে, বাকিগুলো মুছে না ফেলে আলাদা key-তে থাকে
    const old = store.get("kodpot.posters", []).filter(p => p && p.id).sort((a, b) => b.updated - a.updated);
    list = old.slice(0, MAX_TABS);
    if (old.length > MAX_TABS) store.set(KEY.archive, old.slice(MAX_TABS));
  }
  list = list.filter(p => p && p.id).slice(0, MAX_TABS);
  list.forEach(p => {
    if (!BN_FONTS[p.fontBn]) p.fontBn = "Noto Sans Bengali";
    if (isOldSample(p)) Object.assign(p, SAMPLE_CONTENT);
  });
  if (!list.length) list = [samplePost()];
  store.set(KEY.tabs, list);
  return list;
}
let library = loadLibrary();
let state = clone(library.find(p => p.id === store.get(KEY.current, null)) || library[0]);

let saveTimer, dirty = false;
function commit(){
  clearTimeout(saveTimer);
  if (dirty) { state.updated = Date.now(); dirty = false; }
  const i = library.findIndex(p => p.id === state.id);
  if (i >= 0) library[i] = clone(state); else library.push(clone(state));
  store.set(KEY.tabs, library);
  store.set(KEY.current, state.id);
  renderTabs();
}
function changed(){
  dirty = true; state.saved = false;
  schedule();
  clearTimeout(saveTimer); saveTimer = setTimeout(commit, 500);
}

/* ---------- fonts ---------- */
// layout.alo-তে শুধু ডিফল্ট ফন্টগুলো আসে; বাকিগুলো বাছাই করলে তখন নামে
const FONT_QUERY = {
  "Baloo Da 2": "Baloo+Da+2:wght@400;600;700",
  "Noto Serif Bengali": "Noto+Serif+Bengali:wght@400;700",
  "Tiro Bangla": "Tiro+Bangla",
  "Fira Code": "Fira+Code:wght@400;600",
  "IBM Plex Mono": "IBM+Plex+Mono:wght@400;600"
};
const fontLinks = {};
function linkFont(name){
  const q = FONT_QUERY[name];
  if (!q) return Promise.resolve();
  return fontLinks[name] || (fontLinks[name] = new Promise(resolve => {
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = `https://fonts.googleapis.com/css2?family=${q}&display=swap`;
    l.onload = l.onerror = resolve;
    document.head.append(l);
  }));
}
let fontsKey = "";
async function ensureFonts(){
  const key = state.fontBn + "|" + state.fontCode;
  if (key === fontsKey) return;
  await Promise.all([linkFont(state.fontBn), linkFont(state.fontCode)]);
  const f = BN_FONTS[state.fontBn], sample = "বাংলা কোড ক্ষ্ম Abc ১২৩ {}";
  const reqs = [f.title, f.bold, f.body].map(w => `${w} 40px "${state.fontBn}"`)
    .concat([`400 40px "${state.fontCode}"`, `600 40px "${state.fontCode}"`]);
  if (document.fonts && document.fonts.load) await Promise.all(reqs.map(r => document.fonts.load(r, sample).catch(() => null)));
  fontsKey = key;
}

/* ---------- logo ---------- */
// state.logo খালি থাকলে msilabs-এর লোগো; আপলোড করলে ছোট করা PNG data URL
const DEFAULT_LOGO = new URL("msilabs-logo.png", document.baseURI).href;
let logoSlot = {src: "", img: null};
const logoSrc = () => state.logo || DEFAULT_LOGO;
function ensureLogo(){
  const src = logoSrc();
  if (logoSlot.src === src) return Promise.resolve();
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => { logoSlot = {src, img}; resolve(); };
    img.onerror = () => { logoSlot = {src, img: null}; resolve(); };
    img.src = src;
  });
}
function shrinkImage(file, max){
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (!img.width || !img.height) { reject(new Error("no size")); return; }
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(img.width * k)); c.height = Math.max(1, Math.round(img.height * k));
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("bad image")); };
    img.src = url;
  });
}
function drawLogo(ctx, img, x, y, size, radius){
  const k = Math.min(size / img.width, size / img.height);
  const w = img.width * k, h = img.height * k;
  const squarish = Math.abs(img.width / img.height - 1) < 0.1;
  ctx.save();
  if (squarish) { rr(ctx, x, y, size, size, radius); ctx.clip(); }
  ctx.drawImage(img, x + (size - w) / 2, y + (size - h) / 2, w, h);
  ctx.restore();
}

/* ---------- text layout ---------- */
function fontStr(style, size){
  const f = BN_FONTS[state.fontBn];
  if (style.code) return `${style.bold || style.title ? 600 : 400} ${size}px "${state.fontCode}", "${state.fontBn}", monospace`;
  const w = style.title ? f.title : style.bold ? f.bold : (style.weight || f.body);
  return `${w} ${size}px "${state.fontBn}", "Noto Sans Bengali", sans-serif`;
}
function parseInline(s){
  const runs = [], re = /`([^`]+)`|\*\*([^*]+)\*\*/g; let last = 0, m;
  while ((m = re.exec(s))) {
    if (m.index > last) runs.push({t: s.slice(last, m.index)});
    if (m[1] != null) runs.push({t: m[1], code: true}); else runs.push({t: m[2], bold: true});
    last = re.lastIndex;
  }
  if (last < s.length) runs.push({t: s.slice(last)});
  return runs;
}
function layoutRich(ctx, text, size, maxW, base){
  // শিরোনামে inline code box ছাড়া শুধু accent রঙে বসে, তাই প্যাডিং প্রায় লাগে না
  const lines = [], codeSize = size * (base.title ? 0.84 : 0.86), codePad = size * (base.title ? 0.04 : 0.28);
  const measure = (t, st) => { ctx.font = fontStr(st, st.code ? codeSize : size); return ctx.measureText(t).width + (st.code ? codePad * 2 : 0); };
  for (const para of String(text || "").split("\n")) {
    let cur = [], curW = 0;
    const push = () => { while (cur.length && cur[cur.length-1].space) curW -= cur.pop().w; lines.push({atoms: cur, w: curW}); cur = []; curW = 0; };
    for (const run of parseInline(para)) {
      const st = Object.assign({}, base, {code: !!run.code, bold: !!run.bold || !!base.bold});
      const pieces = run.code ? [run.t] : run.t.split(/(\s+)/).filter(Boolean);
      for (const p of pieces) {
        if (!run.code && /^\s+$/.test(p)) {
          if (!cur.length) continue;
          const sw = measure(" ", st); cur.push({t: " ", st, w: sw, space: true}); curW += sw; continue;
        }
        const w = measure(p, st);
        if (curW + w > maxW && cur.length) {
          // লাইন ভাঙে শুধু ফাঁকা জায়গায়: `import`-এর মতো জোড়া লাগা অংশ একসাথে পরের লাইনে যায়
          let carry = [];
          if (!cur[cur.length - 1].space) {
            const s = cur.map(a => !!a.space).lastIndexOf(true);
            if (s >= 0) carry = cur.splice(s + 1);
          }
          const carryW = carry.reduce((n, a) => n + a.w, 0);
          curW -= carryW; push();
          cur = carry; curW = carryW;
        }
        if (w > maxW) {
          let chunk = "";
          for (const g of graphemes(p)) {
            if (measure(chunk + g, st) > maxW && chunk) { cur.push({t: chunk, st, w: measure(chunk, st)}); push(); chunk = g; }
            else chunk += g;
          }
          if (chunk) { const cw = measure(chunk, st); cur.push({t: chunk, st, w: cw}); curW += cw; }
          continue;
        }
        cur.push({t: p, st, w}); curW += w;
      }
    }
    push();
  }
  while (lines.length && !lines[lines.length-1].atoms.length) lines.pop();
  return {lines, size, lh: size * (base.title ? 1.28 : 1.6), codeSize, codePad};
}
// শিরোনামের লাইনগুলো সমান ভাগে ভাঙে, যাতে শেষ লাইনে একটা শব্দ একা না পড়ে (CSS-এর text-wrap: balance-এর মতো)
function balanceRich(ctx, text, L, maxW, base){
  const n = L.lines.length;
  if (n < 2) return L;
  let widestWord = 0;
  for (const line of L.lines) for (const a of line.atoms) if (!a.space) widestWord = Math.max(widestWord, a.w);
  let lo = Math.max(maxW * 0.5, widestWord), hi = maxW, best = L;
  for (let i = 0; i < 8; i++) {
    const mid = (lo + hi) / 2, M = layoutRich(ctx, text, L.size, mid, base);
    if (M.lines.length <= n) { best = M; hi = mid; } else lo = mid;
  }
  return best;
}
// ব্যাখ্যার শেষ লাইনে একটা শব্দ একা পড়লে লাইন একটু আগে ভাঙে, লাইনের সংখ্যা না বাড়িয়ে
function avoidOrphan(ctx, text, L, maxW, base){
  const n = L.lines.length;
  // শব্দ গোনা হয় ফাঁকা জায়গা দিয়ে, কারণ "**ভেতরে**।"-এর মতো একটা শব্দ দুই টুকরো হতে পারে
  const lastWords = M => 1 + M.lines[M.lines.length - 1].atoms.filter(a => a.space).length;
  if (n < 2 || lastWords(L) >= 2) return L;
  for (let w = maxW * 0.96; w >= maxW * 0.75; w -= maxW * 0.03) {
    const M = layoutRich(ctx, text, L.size, w, base);
    if (M.lines.length === n && lastWords(M) >= 2) return M;
  }
  return L;
}
function fitRich(ctx, text, maxW, maxSize, minSize, maxLines, base, maxH){
  const done = L => (base.title ? balanceRich : avoidOrphan)(ctx, text, L, maxW, base);
  for (let s = maxSize; s >= minSize; s -= 2) {
    const L = layoutRich(ctx, text, s, maxW, base);
    if (L.lines.length <= maxLines && (!maxH || L.lines.length * L.lh <= maxH)) return done(L);
  }
  return done(layoutRich(ctx, text, minSize, maxW, base));
}
function drawRich(ctx, L, x, y, color, strong, accent){
  ctx.textBaseline = "middle";
  L.lines.forEach((line, i) => {
    const cy = y + i * L.lh + L.lh / 2;
    let cx = x;
    for (const a of line.atoms) {
      if (a.st.code) {
        ctx.font = fontStr(a.st, L.codeSize);
        if (!a.st.title) {
          ctx.fillStyle = rgba(accent, 0.16);
          rr(ctx, cx, cy - L.codeSize * 0.78, a.w, L.codeSize * 1.56, L.codeSize * 0.3); ctx.fill();
        }
        ctx.fillStyle = accent; ctx.fillText(a.t, cx + L.codePad, cy + L.codeSize * 0.04);
      } else {
        ctx.font = fontStr(a.st, L.size);
        ctx.fillStyle = a.st.bold && !a.st.title ? strong : color;
        ctx.fillText(a.t, cx, cy);
      }
      cx += a.w;
    }
  });
}
const richH = L => L.lines.length * L.lh;

/* ---------- code highlighting ---------- */
function normalizeCode(code){
  let lines = String(code || "").replace(/\r\n?/g, "\n").replace(/\t/g, "    ").split("\n");
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length-1].trim()) lines.pop();
  const ind = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length));
  if (isFinite(ind) && ind > 0) lines = lines.map(l => l.slice(ind));
  return lines.map(l => l.replace(/\s+$/, "")).join("\n");
}
function hlLines(code, lang){
  code = normalizeCode(code);
  let html, detected = lang;
  try {
    if (!window.hljs || lang === "plaintext") html = esc(code);
    else if (lang === "auto") { const r = hljs.highlightAuto(code); html = r.value; detected = r.language || "plaintext"; }
    else html = hljs.highlight(code, {language: lang, ignoreIllegals: true}).value;
  } catch { html = esc(code); }
  const tpl = document.createElement("template"); tpl.innerHTML = html;
  const lines = [[]];
  (function walk(node, scope){
    for (const c of node.childNodes) {
      if (c.nodeType === 3) {
        c.nodeValue.split("\n").forEach((p, k) => { if (k > 0) lines.push([]); if (p) lines[lines.length-1].push({t: p, s: scope}); });
      } else if (c.nodeType === 1) {
        const sc = Array.from(c.classList).map(x => x.replace(/^hljs-/, "").replace(/_+$/, "")).join(" ");
        walk(c, sc || scope);
      }
    }
  })(tpl.content, "");
  return {lines, detected};
}
function tokColor(s, p){
  if (!s) return p.fg;
  const [a, b] = s.split(" ");
  if (a === "comment" || a === "quote") return p.com;
  if (["string","regexp","char","symbol","template-tag","addition"].includes(a)) return p.str;
  if (a === "number" || a === "literal") return p.num;
  if (["keyword","selector-tag","doctag","deletion"].includes(a)) return p.kw;
  if (a === "built_in") return p.bi;
  if (a === "type" || a === "class" || (a === "title" && b === "class")) return p.type;
  if (a === "title" || a === "function" || a === "section") return p.fn;
  if (["attr","attribute","property","selector-class","selector-id","selector-attr","selector-pseudo","variable","template-variable"].includes(a)) return p.attr;
  if (a === "tag" || a === "name") return p.tag;
  if (a === "meta") return p.meta;
  if (a === "operator" || a === "punctuation") return p.punc;
  return p.fg;
}
const codeFont = (size, bold) => `${bold ? 600 : 400} ${size}px "${state.fontCode}", "${state.fontBn}", monospace`;

function layoutCode(ctx, hl, boxW, boxH, u){
  const padX = 34*u, padTop = state.showChrome ? 74*u : 34*u, padBot = 34*u, lhR = 1.58;
  const n = Math.max(1, hl.lines.length);
  ctx.font = codeFont(100);
  let maxW100 = 0;
  for (const line of hl.lines) { let w = 0; for (const t of line) w += ctx.measureText(t.t).width; maxW100 = Math.max(maxW100, w); }
  const digits100 = state.showLineNo ? ctx.measureText(String(n)).width : 0;
  const gutGap = state.showLineNo ? 26*u : 0;
  let size;
  if (state.codeSize > 0) size = state.codeSize * u * 1.35;
  else {
    const sizeW = (boxW - padX*2 - gutGap) * 100 / Math.max(1, maxW100 + digits100);
    const sizeH = (boxH - padTop - padBot) / (n * lhR);
    size = clamp(Math.min(32*u, sizeW, sizeH), 17*u, 32*u);
  }
  const lh = size * lhR;
  const gutterW = state.showLineNo ? digits100 * size / 100 + gutGap : 0;
  const textW = boxW - padX*2 - gutterW;
  ctx.font = codeFont(size);
  const indentW = ctx.measureText("  ").width;
  const vis = [];
  hl.lines.forEach((line, li) => {
    let cur = [], x = 0, first = true;
    const flush = () => { vis.push({toks: cur, num: first ? li + 1 : null}); cur = []; x = indentW; first = false; };
    for (const t of line) {
      const w = ctx.measureText(t.t).width;
      if (x + w <= textW) { cur.push({t: t.t, s: t.s, x}); x += w; continue; }
      let chunk = "", cx = x;
      for (const g of graphemes(t.t)) {
        if (cx + ctx.measureText(chunk + g).width > textW && (chunk || cur.length)) {
          if (chunk) cur.push({t: chunk, s: t.s, x: cx});
          flush(); chunk = g.trim() ? g : ""; cx = x;
        } else chunk += g;
      }
      if (chunk) { cur.push({t: chunk, s: t.s, x: cx}); x = cx + ctx.measureText(chunk).width; }
    }
    flush();
  });
  const fitN = Math.max(1, Math.floor((boxH - padTop - padBot) / lh));
  let shown = vis, truncated = false;
  if (vis.length > fitN) { shown = vis.slice(0, fitN - 1).concat([{toks: [{t: "…", s: "comment", x: 0}], num: null}]); truncated = true; }
  return {vis: shown, size, lh, padX, padTop, padBot, gutterW, h: padTop + shown.length * lh + padBot, truncated, n};
}
function drawCodeCard(ctx, C, x, y, w, t, u, label){
  ctx.save();
  ctx.shadowColor = t.shadow; ctx.shadowBlur = 50*u; ctx.shadowOffsetY = 18*u;
  ctx.fillStyle = t.card; rr(ctx, x, y, w, C.h, 26*u); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = t.cardLine; ctx.lineWidth = 2*u; rr(ctx, x, y, w, C.h, 26*u); ctx.stroke();
  ctx.textBaseline = "middle";
  if (state.showChrome) {
    ["#FF5F57","#FEBC2E","#28C840"].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x + 34*u + i*26*u, y + 36*u, 8*u, 0, Math.PI*2); ctx.fill(); });
    if (label) {
      // macOS-এর মতো জানালার মাঝখানে; দুই পাশে বোতামের জায়গা বাদ রেখে
      ctx.font = codeFont(23*u); ctx.fillStyle = t.muted; ctx.textAlign = "center";
      ctx.fillText(fitText(ctx, label, w - 240*u), x + w/2, y + 37*u); ctx.textAlign = "left";
    }
  }
  const tx = x + C.padX + C.gutterW;
  C.vis.forEach((v, i) => {
    const cy = y + C.padTop + i * C.lh + C.lh / 2;
    if (state.showLineNo && v.num != null) {
      ctx.font = codeFont(C.size); ctx.fillStyle = t.gutter; ctx.textAlign = "right";
      ctx.fillText(String(v.num), tx - 26*u, cy); ctx.textAlign = "left";
    }
    for (const tk of v.toks) {
      ctx.font = codeFont(C.size, tk.s && /^(keyword|title)/.test(tk.s));
      ctx.fillStyle = tokColor(tk.s, t.syn);
      ctx.fillText(tk.t, tx + tk.x, cy);
    }
  });
}

/* ---------- poster renderer ---------- */
function fitText(ctx, s, maxW){
  if (ctx.measureText(s).width <= maxW) return s;
  const g = graphemes(s);
  while (g.length > 1 && ctx.measureText(g.join("") + "…").width > maxW) g.pop();
  return g.join("") + "…";
}
let lastCode = null;
function renderPoster(canvas){
  const S = SIZES[state.size] || SIZES.portrait, W = S.w, H = S.h;
  if (canvas.width !== W) canvas.width = W;
  if (canvas.height !== H) canvas.height = H;
  const ctx = canvas.getContext("2d");
  const t = THEMES[state.theme] || THEMES.night, accent = state.accent || t.accent;
  // ব্যাখ্যা muted-এর চেয়ে উজ্জ্বল, শিরোনামের চেয়ে একটু হালকা: ফোনে পড়তে স্পষ্ট
  const bodyInk = rgba(t.fg, 0.88);
  const wide = W / H > 1.4;
  const u = Math.min(W / 1080, H * 1.35 / 1080);
  const P = (wide ? 56 : 76) * u;
  const bold = BN_FONTS[state.fontBn].bold;
  ctx.textAlign = "left"; ctx.textBaseline = "middle";

  // background: gradient + dot grid fading from the top-right corner
  const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, t.bg1); g.addColorStop(1, t.bg2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const sp = 30*u, R = Math.max(W, H) * 0.75;
  ctx.fillStyle = t.dot;
  for (let yy = sp/2; yy < H; yy += sp) for (let xx = sp/2; xx < W; xx += sp) {
    const a = (1 - Math.hypot(W - xx, yy) / R) * 0.16;
    if (a <= 0) continue;
    ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(xx, yy, 1.8*u, 0, Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  const hasCode = !!normalizeCode(state.code).trim();
  if (!hasCode) {
    ctx.font = `600 ${(wide ? 520 : 640)*u}px "${state.fontCode}", monospace`;
    ctx.fillStyle = rgba(accent, t.light ? 0.08 : 0.07); ctx.textAlign = "right"; ctx.textBaseline = "alphabetic";
    ctx.fillText("{}", W + 40*u, H - 40*u); ctx.textAlign = "left"; ctx.textBaseline = "middle";
  }

  // header: brand mark + page name
  const mk = 54*u;
  const logo = logoSlot.src === logoSrc() ? logoSlot.img : null;
  if (logo) drawLogo(ctx, logo, P, P, mk, 13*u);
  else {
    ctx.fillStyle = accent; rr(ctx, P, P, mk, mk, 14*u); ctx.fill();
    ctx.fillStyle = t.onAccent; ctx.font = codeFont(21*u, true); ctx.textAlign = "center";
    ctx.fillText("</>", P + mk/2, P + mk/2 + 1*u); ctx.textAlign = "left";
  }
  ctx.fillStyle = t.fg; ctx.font = fontStr({weight: bold}, 28*u);
  const handleX = P + mk + 18*u;
  ctx.fillText(state.handle || "", handleX, P + mk/2 + 1*u);
  const handleEnd = handleX + (state.handle ? ctx.measureText(state.handle).width : 0);

  // tag: হেডারের ডান দিকে; লম্বা হলে পেজের নামের সাথে না লেগে "…" দিয়ে কাটে
  const tag = (state.tag || "").trim();
  if (tag) {
    const tagH = 46*u, padX = 20*u;
    ctx.font = fontStr({weight: bold}, 22*u);
    const maxText = W - P - (handleEnd + 32*u) - padX*2;
    if (maxText > 60*u) {
      const text = fitText(ctx, tag, maxText);
      const tw = ctx.measureText(text).width + padX*2, tx = W - P - tw, ty = P + (mk - tagH)/2;
      ctx.fillStyle = rgba(accent, 0.16); rr(ctx, tx, ty, tw, tagH, tagH/2); ctx.fill();
      ctx.strokeStyle = rgba(accent, 0.35); ctx.lineWidth = 1.5*u; rr(ctx, tx, ty, tw, tagH, tagH/2); ctx.stroke();
      ctx.fillStyle = accent; ctx.fillText(text, tx + padX, ty + tagH/2 + 1*u);
    }
  }

  // footer
  if (state.footer) {
    ctx.font = fontStr({}, 24*u); ctx.fillStyle = t.muted;
    ctx.fillText(fitText(ctx, state.footer, W - 2*P), P, H - P - 14*u);
  }
  ctx.fillStyle = accent; ctx.fillRect(0, H - 8*u, W, 8*u);

  const top = P + mk + 50*u, bottom = H - P - (state.footer ? 74*u : 20*u);
  const avail = bottom - top;
  const hl = hasCode ? hlLines(state.code, state.lang) : null;
  const label = state.file || (hl ? (LANG_LABEL[hl.detected] || hl.detected || "") : "");
  lastCode = null;

  if (wide && hasCode) {
    const gap = 52*u, lw = (W - 2*P - gap) * 0.42, rx = P + lw + gap, rw = W - P - rx;
    const TL = fitRich(ctx, state.title, lw, 54*u, 30*u, 4, {title: true});
    const BL = fitRich(ctx, state.body, lw, 29*u, 20*u, 99, {}, avail - richH(TL) - 22*u);
    const leftH = richH(TL) + (state.body ? 22*u + richH(BL) : 0);
    let y = top + Math.max(0, (avail - leftH) / 2);
    drawRich(ctx, TL, P, y, t.fg, t.fg, accent); y += richH(TL) + 22*u;
    if (state.body) drawRich(ctx, BL, P, y, bodyInk, t.fg, accent);
    const C = layoutCode(ctx, hl, rw, avail + 30*u, u);
    drawCodeCard(ctx, C, rx, top - 15*u + Math.max(0, (avail + 30*u - C.h) / 2), rw, t, u, label);
    lastCode = C; return;
  }

  const cw = W - 2*P;
  if (!hasCode) {
    const TL = fitRich(ctx, state.title, cw, (wide ? 64 : 92)*u, 40*u, wide ? 3 : 5, {title: true});
    const BL = fitRich(ctx, state.body, cw * (wide ? 1 : 0.92), (wide ? 30 : 36)*u, 22*u, 99, {}, avail - richH(TL) - 140*u);
    const gh = richH(TL) + (state.body ? 34*u + richH(BL) : 0);
    let y = top + Math.max(0, (avail - gh) * 0.46);
    drawRich(ctx, TL, P, y, t.fg, t.fg, accent); y += richH(TL);
    if (state.body) drawRich(ctx, BL, P, y + 34*u, bodyInk, t.fg, accent);
    return;
  }

  // বর্গে উচ্চতা কম, তাই লেখা একটু ছোট রেখে কোডকে জায়গা দেওয়া হয়
  // কোড কাটা পড়লে লেখা ধাপে ধাপে ছোট করে আবার চেষ্টা করে
  const square = W === H, codeGap = 42*u;
  let TL, BL, textH, C;
  for (const k of [1, 0.9, 0.8]) {
    TL = fitRich(ctx, state.title, cw, (square ? 58 : 66)*k*u, 36*u, 3, {title: true});
    BL = state.body ? fitRich(ctx, state.body, cw, (square ? 30 : 34)*k*u, 22*u, 99, {}, avail * 0.3) : {lines: [], lh: 0};
    textH = richH(TL) + (state.body ? 22*u + richH(BL) : 0);
    C = layoutCode(ctx, hl, cw, Math.max(180*u, avail - textH - codeGap), u);
    if (!C.truncated && C.size >= 21*u) break;
  }
  let y = top + Math.max(0, (avail - (textH + codeGap + C.h)) * 0.42);
  drawRich(ctx, TL, P, y, t.fg, t.fg, accent); y += richH(TL);
  if (state.body) { y += 22*u; drawRich(ctx, BL, P, y, bodyInk, t.fg, accent); y += richH(BL); }
  drawCodeCard(ctx, C, P, y + codeGap, cw, t, u, label);
  lastCode = C;
}

/* ---------- render loop ---------- */
const poster = $("poster"), stage = $("stage");
let renderTimer;
function schedule(){ clearTimeout(renderTimer); renderTimer = setTimeout(doRender, 60); }
async function doRender(){
  await Promise.all([ensureFonts(), ensureLogo()]);
  renderPoster(poster);
  stage.style.setProperty("--glow", accentOf(state));
  updateCodeMeta();
}
function updateCodeMeta(){
  const meta = $("codeMeta"), cnt = $("codeCount"), msg = $("codeMsg");
  if (!lastCode) { meta.dataset.s = "none"; cnt.textContent = "কোড নেই"; msg.textContent = "শুধু লেখার পোস্টার হবে"; return; }
  cnt.textContent = `${bn(lastCode.n)} লাইন`;
  if (lastCode.truncated) {
    meta.dataset.s = "bad";
    msg.textContent = state.size === "portrait"
      ? "ছবিতে পুরোটা ধরছে না, শেষের অংশ কাটা পড়েছে। লাইন কমান।"
      : "ছবিতে পুরোটা ধরছে না। লাইন কমান, অথবা মাপ পোর্ট্রেট করুন।";
  } else if (lastCode.n > 15) {
    meta.dataset.s = "warn"; msg.textContent = "ফোনে ছোট দেখাবে। ১৫ লাইনের মধ্যে রাখলে পড়তে সুবিধা।";
  } else {
    meta.dataset.s = "ok"; msg.textContent = "ফোনেও আরামে পড়া যাবে";
  }
}

/* ---------- form ---------- */
const F = {title: $("fTitle"), body: $("fBody"), code: $("fCode"), lang: $("fLang"), tag: $("fTag"), file: $("fFile")};
LANGS.forEach(([v, l]) => { const o = document.createElement("option"); o.value = v; o.textContent = l; F.lang.append(o); });
for (const k in F) F[k].addEventListener("input", () => { state[k] = F[k].value; changed(); });
F.code.addEventListener("keydown", e => {
  if (e.key === "Tab" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
    e.preventDefault(); const el = F.code;
    el.setRangeText("  ", el.selectionStart, el.selectionEnd, "end"); el.dispatchEvent(new Event("input"));
  }
});
$("btnPaste").addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (!text.trim()) { toast("ক্লিপবোর্ড খালি"); return; }
    F.code.value = text; state.code = text; changed();
    toast("কোড বসানো হয়েছে");
  } catch {
    toast("ক্লিপবোর্ড পড়া গেল না, কোড বক্সে ক্লিক করে পেস্ট করুন");
    F.code.focus();
  }
});

const sizeBox = $("sizes");
for (const [k, s] of Object.entries(SIZES)) {
  const b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "radio"); b.dataset.k = k;
  b.append(s.label); const sm = document.createElement("small"); sm.textContent = s.ratio; b.append(sm);
  b.addEventListener("click", () => { state.size = k; syncAll(); changed(); });
  sizeBox.append(b);
}

const themeBox = $("themes"), themeGrid = $("themeGrid");
for (const [k, th] of Object.entries(THEMES)) {
  const pick = () => { state.theme = k; state.accent = null; syncAll(); changed(); };

  const d = document.createElement("button"); d.type = "button"; d.className = "dot"; d.setAttribute("role", "radio");
  d.dataset.k = k; d.title = th.name; d.setAttribute("aria-label", th.name);
  const sw = document.createElement("i"); sw.className = "sw";
  sw.style.background = `linear-gradient(135deg, ${th.bg1}, ${th.bg2})`; sw.style.setProperty("--a", th.accent);
  d.append(sw); d.addEventListener("click", pick); themeBox.append(d);

  const c = document.createElement("button"); c.type = "button"; c.className = "tcard"; c.setAttribute("role", "radio"); c.dataset.k = k;
  const pv = document.createElement("span"); pv.className = "tprev";
  const vars = {"--b1": th.bg1, "--b2": th.bg2, "--a": th.accent, "--f": th.fg, "--m": th.muted, "--c": th.card, "--cl": th.cardLine, "--k": th.syn.kw, "--s": th.syn.str, "--n": th.syn.fn};
  for (const v in vars) pv.style.setProperty(v, vars[v]);
  pv.innerHTML = '<i class="tl t1"></i><i class="tl t2"></i><i class="tl t3"></i><span class="tcode"><i></i><i></i><i></i></span>';
  const nm = document.createElement("span"); nm.textContent = th.name;
  c.append(pv, nm); c.addEventListener("click", pick); themeGrid.append(c);
}

const dFontBn = $("dFontBn");
for (const [k, v] of Object.entries(BN_FONTS)) { const o = document.createElement("option"); o.value = k; o.textContent = v.label; dFontBn.append(o); }
const dFontCode = $("dFontCode");
CODE_FONTS.forEach(k => { const o = document.createElement("option"); o.value = k; o.textContent = k; dFontCode.append(o); });
const D = {fontBn: dFontBn, fontCode: dFontCode, handle: $("dHandle"), footer: $("dFooter")};
for (const k in D) D[k].addEventListener("input", () => { state[k] = D[k].value; changed(); });
const T = {showLineNo: $("tLine"), showChrome: $("tChrome")};
for (const k in T) T[k].addEventListener("change", () => { state[k] = T[k].checked; changed(); });
$("dCodeSize").addEventListener("input", e => { state.codeSize = +e.target.value; syncAll(); changed(); });
$("dAccent").addEventListener("input", e => { state.accent = e.target.value; changed(); });
$("dAccentReset").addEventListener("click", () => { state.accent = null; syncAll(); changed(); });
$("logoUp").addEventListener("click", () => $("dLogo").click());
$("logoReset").addEventListener("click", () => { state.logo = null; syncAll(); changed(); toast("msilabs-এর লোগো বসানো হয়েছে"); });
$("dLogo").addEventListener("change", async e => {
  const file = e.target.files[0]; e.target.value = "";
  if (!file) return;
  try {
    state.logo = await shrinkImage(file, 256);
    syncAll(); changed(); toast("লোগো বদলানো হয়েছে");
  } catch { toast("এই ফাইল থেকে লোগো নেওয়া গেল না, PNG বা JPG দিন"); }
});

function syncAll(){
  for (const k in F) F[k].value = state[k] || (k === "lang" ? "auto" : "");
  for (const k in D) D[k].value = state[k] ?? "";
  for (const k in T) T[k].checked = !!state[k];
  sizeBox.querySelectorAll("button").forEach(b => b.setAttribute("aria-checked", b.dataset.k === state.size ? "true" : "false"));
  document.querySelectorAll("#themes [data-k], #themeGrid [data-k]").forEach(b => b.setAttribute("aria-checked", b.dataset.k === state.theme ? "true" : "false"));
  $("dAccent").value = state.accent || THEMES[state.theme].accent;
  $("logoPrev").src = logoSrc();
  $("dCodeSize").value = state.codeSize || 0;
  $("dCodeSizeVal").textContent = state.codeSize ? bn(state.codeSize) : "নিজে থেকে";
}

/* ---------- panel tabs & mobile view ---------- */
const PANES = {tabWrite: "paneWrite", tabDesign: "paneDesign"};
function showPane(id){
  for (const t in PANES) {
    const on = t === id;
    $(t).setAttribute("aria-selected", String(on)); $(t).tabIndex = on ? 0 : -1; $(PANES[t]).hidden = !on;
  }
  store.set(KEY.pane, id);
}
for (const t in PANES) {
  $(t).addEventListener("click", () => showPane(t));
  $(t).addEventListener("keydown", e => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = t === "tabWrite" ? "tabDesign" : "tabWrite";
    showPane(next); $(next).focus();
  });
}

const work = $("work"), viewBtns = $("viewSeg").querySelectorAll("button");
function setView(v){
  work.dataset.view = v;
  viewBtns.forEach(b => b.setAttribute("aria-checked", String(b.dataset.v === v)));
}
viewBtns.forEach(b => b.addEventListener("click", () => { setView(b.dataset.v); window.scrollTo({top: 0}); }));

/* ---------- poster tabs ---------- */
const X_SVG = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const OK_SVG = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
function accentOf(p){ return p.accent || (THEMES[p.theme] || THEMES.night).accent; }
function titleOf(p){ return (p.title || "").trim() || "শিরোনাম নেই"; }
function shortTitle(p){ const s = titleOf(p); return s.length > 24 ? s.slice(0, 23) + "…" : s; }
function ago(ts){
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 1) return "এইমাত্র";
  if (m < 60) return `${bn(m)} মিনিট আগে`;
  const h = Math.round(m / 60);
  if (h < 24) return `${bn(h)} ঘণ্টা আগে`;
  const d = Math.round(h / 24);
  if (d < 30) return `${bn(d)} দিন আগে`;
  try { return new Date(ts).toLocaleDateString("bn-BD", {day: "numeric", month: "long"}); } catch { return ""; }
}

function renderTabs(){
  const box = $("tabs"); box.textContent = "";
  library.forEach(p => {
    const on = p.id === state.id;
    const tab = document.createElement("div"); tab.className = on ? "ptab on" : "ptab";
    const open = document.createElement("button"); open.type = "button"; open.className = "ptab-open"; open.title = titleOf(p);
    if (on) open.setAttribute("aria-current", "true");
    const dot = document.createElement("i"); dot.className = "pdot"; dot.style.setProperty("--a", accentOf(p));
    const nm = document.createElement("span"); nm.className = "pt"; nm.textContent = titleOf(p);
    open.append(dot, nm);
    if (p.saved) {
      const ok = document.createElement("span"); ok.className = "pok"; ok.title = "ছবি সেভ করা হয়েছে"; ok.innerHTML = OK_SVG;
      open.append(ok);
    }
    open.addEventListener("click", () => { if (p.id !== state.id) loadPost(p.id); });
    tab.append(open);
    if (library.length > 1) {
      const x = document.createElement("button"); x.type = "button"; x.className = "ptab-x";
      x.setAttribute("aria-label", `“${shortTitle(p)}” মুছুন`); x.title = "মুছুন"; x.innerHTML = X_SVG;
      x.addEventListener("click", () => closeTab(p.id));
      tab.append(x);
    }
    box.append(tab);
  });
  $("tabAdd").title = library.length >= MAX_TABS ? "৫টা ট্যাবই ভরা, একটা সরিয়ে নতুন বানাতে হবে" : "নতুন পোস্টার";
  $("tabCount").textContent = `${bn(library.length)}/${bn(MAX_TABS)}`;
}
function focusTab(){
  requestAnimationFrame(() => {
    const on = $("tabs").querySelector(".ptab.on");
    if (on) on.scrollIntoView({block: "nearest", inline: "nearest"});
  });
}
function loadPost(id){
  commit();
  const p = library.find(x => x.id === id); if (!p) return;
  state = clone(p);
  store.set(KEY.current, id);
  syncAll(); schedule(); renderTabs(); focusTab();
}
function startNew(){
  const p = {id: uid(), updated: Date.now(), saved: false, tag: "", title: "পোস্টের শিরোনাম লিখুন", body: "এখানে ছোট করে ব্যাখ্যা লিখুন।", code: "// এখানে আপনার কোড পেস্ট করুন", lang: "auto", file: ""};
  DESIGN_KEYS.forEach(k => p[k] = state[k]);
  library.push(clone(p)); state = p; dirty = false;
  commit(); syncAll(); schedule(); focusTab();
  showPane("tabWrite"); setView("edit");
  F.title.focus(); F.title.select();
}
const snapshot = () => ({library: clone(library), current: state.id});
function undoAction(snap){
  return {label: "ফিরিয়ে আনুন", fn: () => {
    library = clone(snap.library);
    state = clone(library.find(p => p.id === snap.current) || library[0]);
    dirty = false;
    commit(); syncAll(); schedule(); focusTab();
    toast("ফিরিয়ে আনা হয়েছে");
  }};
}
function closeTab(id){
  if (library.length < 2) return;
  commit();
  const snap = snapshot();
  const i = library.findIndex(p => p.id === id); if (i < 0) return;
  const gone = library[i];
  library.splice(i, 1);
  if (id === state.id) { state = clone(library[Math.min(i, library.length - 1)]); syncAll(); schedule(); }
  commit();
  toast(`“${shortTitle(gone)}” মুছে ফেলা হয়েছে`, undoAction(snap));
}

const replaceDlg = $("replaceDlg");
function openReplace(){
  commit();
  const list = $("replaceList"); list.textContent = "";
  const oldest = library.reduce((a, b) => (b.updated < a.updated ? b : a));
  library.forEach(p => {
    const lb = document.createElement("label");
    const r = document.createElement("input"); r.type = "radio"; r.name = "victim"; r.value = p.id; r.checked = p.id === oldest.id;
    const dot = document.createElement("i"); dot.className = "pdot"; dot.style.setProperty("--a", accentOf(p));
    const tx = document.createElement("span"); tx.className = "pt";
    const b = document.createElement("b"); b.textContent = titleOf(p);
    const sm = document.createElement("small");
    sm.textContent = [ago(p.updated), p.saved ? "ছবি সেভ করা" : "", p.id === oldest.id ? "সবচেয়ে পুরোনো" : ""].filter(Boolean).join(" · ");
    tx.append(b, sm); lb.append(r, dot, tx); list.append(lb);
  });
  replaceDlg.returnValue = "";
  replaceDlg.showModal();
}
replaceDlg.addEventListener("close", () => {
  if (replaceDlg.returnValue !== "ok") return;
  const r = $("replaceList").querySelector("input:checked"); if (!r) return;
  const victim = library.find(p => p.id === r.value); if (!victim) return;
  const snap = snapshot();
  library = library.filter(p => p.id !== victim.id);
  startNew();
  toast(`“${shortTitle(victim)}” সরিয়ে নতুন পোস্টার খোলা হলো`, undoAction(snap));
});
$("tabAdd").addEventListener("click", () => {
  if (library.length >= MAX_TABS) { openReplace(); return; }
  commit(); startNew();
  toast("নতুন পোস্টার, ডিজাইন আগেরটার মতো রাখা হয়েছে");
});

/* ---------- toast ---------- */
let toastT;
function hideToast(){ $("toast").classList.remove("show"); }
function toast(msg, action){
  const el = $("toast"); el.textContent = "";
  const s = document.createElement("span"); s.textContent = msg; el.append(s);
  if (action) {
    const b = document.createElement("button"); b.type = "button"; b.className = "toastBtn"; b.textContent = action.label;
    b.addEventListener("click", () => { hideToast(); action.fn(); });
    el.append(b);
  }
  el.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(hideToast, action ? 6000 : 3200);
}
function flash(btn, text){
  const label = btn.querySelector(".bt");
  if (!label.dataset.t) label.dataset.t = label.textContent;
  btn.classList.add("ok"); label.textContent = text;
  clearTimeout(btn._f);
  btn._f = setTimeout(() => { btn.classList.remove("ok"); label.textContent = label.dataset.t; }, 1600);
}

/* ---------- save / copy ---------- */
const fileName = () => "msilabs-" + ((state.title || "poster").trim().replace(/[\\/:*?"<>|`(){}\[\]]+/g, "").replace(/\s+/g, "-").slice(0, 40) || "poster") + ".png";
const toBlob = c => new Promise(r => c.toBlob(r, "image/png"));
function freshCanvas(){ const c = document.createElement("canvas"); renderPoster(c); return c; }
function showFallback(c){ $("modalImg").src = c.toDataURL("image/png"); $("saveDlg").showModal(); }
function download(blob, name){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
function markSaved(){ state.saved = true; commit(); }

$("btnSave").addEventListener("click", async () => {
  const btn = $("btnSave"); if (btn.disabled) return; btn.disabled = true;
  try {
    await Promise.all([ensureFonts(), ensureLogo()]);
    const c = freshCanvas();
    const blob = await toBlob(c);
    if (!blob || !("download" in HTMLAnchorElement.prototype)) { showFallback(c); return; }
    download(blob, fileName());
    markSaved(); flash(btn, "সেভ হয়েছে");
    toast("ছবি সেভ হয়েছে");
  } catch (e) { console.error(e); toast("ছবি বানাতে সমস্যা হলো, আবার চেষ্টা করুন"); }
  finally { btn.disabled = false; }
});
$("btnCopy").addEventListener("click", () => {
  const btn = $("btnCopy");
  const fail = () => toast("এখানে ছবি কপি করা যাচ্ছে না, “ছবি সেভ করুন” ব্যবহার করুন");
  try {
    if (!navigator.clipboard || !window.ClipboardItem) return fail();
    const blob = Promise.all([ensureFonts(), ensureLogo()]).then(() => toBlob(freshCanvas()));
    navigator.clipboard.write([new ClipboardItem({"image/png": blob})])
      .then(() => { markSaved(); flash(btn, "কপি হয়েছে"); toast("ছবি কপি হয়েছে, পোস্টে পেস্ট করুন"); })
      .catch(fail);
  } catch { fail(); }
});
document.querySelectorAll("dialog").forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close("cancel"); }));
document.addEventListener("keydown", e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") { e.preventDefault(); $("btnSave").click(); }
});
$("kbd").textContent = /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent) ? "⌘S" : "Ctrl+S";

/* ---------- old posters that did not fit in the tabs ---------- */
const archive = store.get(KEY.archive, []);
function hideArchive(){ store.set(KEY.archiveHidden, true); $("archNote").hidden = true; }
if (archive.length && !store.get(KEY.archiveHidden, false)) {
  $("archCount").textContent = bn(archive.length);
  $("archNote").hidden = false;
}
$("archDl").addEventListener("click", () => {
  download(new Blob([JSON.stringify(archive, null, 2)], {type: "application/json"}), "code-poster-archive.json");
  hideArchive(); toast("JSON ফাইল ডাউনলোড হয়েছে");
});
$("archHide").addEventListener("click", hideArchive);

/* ---------- boot ---------- */
const savedPane = store.get(KEY.pane, "tabWrite");
showPane(PANES[savedPane] ? savedPane : "tabWrite");
setView("edit");
syncAll(); renderTabs(); focusTab(); doRender();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fontsKey = ""; schedule(); });
})();
