(() => {
"use strict";

/* ---------- constants ---------- */
const SIZES = {
  square:   {w:1080,h:1080,label:"বর্গ",ratio:"১:১"},
  portrait: {w:1080,h:1350,label:"পোর্ট্রেট",ratio:"৪:৫"},
  wide:     {w:1200,h:630, label:"চওড়া",ratio:"১.৯:১"}
};
const BN_FONTS = {
  "Hind Siliguri":     {title:700,bold:600,body:400,label:"হিন্দ শিলিগুড়ি"},
  "Anek Bangla":       {title:700,bold:600,body:400,label:"অনেক বাংলা"},
  "Baloo Da 2":        {title:700,bold:600,body:400,label:"বালু দা"},
  "Noto Sans Bengali": {title:700,bold:700,body:400,label:"নোটো সান্স বাংলা"},
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

/* ---------- posts ---------- */
const DESIGN_KEYS = ["size","theme","accent","fontBn","fontCode","codeSize","handle","footer","showLineNo","showChrome"];
function samplePost(){
  return {
    id: uid(), updated: Date.now(),
    size: "portrait", theme: "night", accent: null, fontBn: "Hind Siliguri", fontCode: "JetBrains Mono",
    codeSize: 0, handle: "msilabs", footer: "প্রতি সপ্তাহে নতুন কোড টিপস", showLineNo: true, showChrome: true,
    tag: "JavaScript টিপস", title: "map() নতুন অ্যারে বানায়",
    body: "প্রতিটা উপাদান বদলে একটা **নতুন অ্যারে** ফেরত দেয়, মূল অ্যারে যেমন ছিল তেমনই থাকে। শুধু কাজ চালাতে চাইলে `forEach()` যথেষ্ট।",
    code: "const prices = [120, 250, 80];\n\n// ১৫% ভ্যাট যোগ করে নতুন দাম\nconst withVat = prices.map((price) =>\n  Math.round(price * 1.15)\n);\n\nconsole.log(withVat); // [138, 288, 92]\nconsole.log(prices);  // [120, 250, 80]",
    lang: "javascript", file: "map.js"
  };
}
let library = store.get("kodpot.posters", []);
let state = library.find(p => p.id === store.get("kodpot.currentPoster", null)) || library[0];
if (!state) { state = samplePost(); library = [clone(state)]; }
state = clone(state);

let saveTimer;
function commit(){
  state.updated = Date.now();
  const i = library.findIndex(p => p.id === state.id);
  if (i >= 0) library[i] = clone(state); else library.unshift(clone(state));
  library.sort((a, b) => b.updated - a.updated);
  library = library.slice(0, 80);
  store.set("kodpot.posters", library);
  store.set("kodpot.currentPoster", state.id);
  if ($("libBox").open) renderLib();
}
function persist(){ clearTimeout(saveTimer); saveTimer = setTimeout(commit, 500); }

/* ---------- fonts ---------- */
let fontsKey = "";
async function ensureFonts(){
  const key = state.fontBn + "|" + state.fontCode;
  if (key === fontsKey) return;
  const f = BN_FONTS[state.fontBn], sample = "বাংলা কোড ক্ষ্ম Abc ১২৩ {}";
  const reqs = [f.title, f.bold, f.body].map(w => `${w} 40px "${state.fontBn}"`)
    .concat([`400 40px "${state.fontCode}"`, `600 40px "${state.fontCode}"`]);
  if (document.fonts && document.fonts.load) await Promise.all(reqs.map(r => document.fonts.load(r, sample).catch(() => null)));
  fontsKey = key;
}

/* ---------- text layout ---------- */
function fontStr(style, size){
  const f = BN_FONTS[state.fontBn];
  if (style.code) return `${style.bold ? 600 : 400} ${size}px "${state.fontCode}", "${state.fontBn}", monospace`;
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
  const lines = [], codeSize = size * 0.86, codePad = size * 0.28;
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
        if (curW + w > maxW && cur.length) push();
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
function fitRich(ctx, text, maxW, maxSize, minSize, maxLines, base, maxH){
  for (let s = maxSize; s >= minSize; s -= 2) {
    const L = layoutRich(ctx, text, s, maxW, base);
    if (L.lines.length <= maxLines && (!maxH || L.lines.length * L.lh <= maxH)) return L;
  }
  return layoutRich(ctx, text, minSize, maxW, base);
}
function drawRich(ctx, L, x, y, color, strong, accent){
  ctx.textBaseline = "middle";
  L.lines.forEach((line, i) => {
    const cy = y + i * L.lh + L.lh / 2;
    let cx = x;
    for (const a of line.atoms) {
      if (a.st.code) {
        ctx.font = fontStr(a.st, L.codeSize);
        ctx.fillStyle = rgba(accent, 0.16);
        rr(ctx, cx, cy - L.codeSize * 0.78, a.w, L.codeSize * 1.56, L.codeSize * 0.3); ctx.fill();
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
      ctx.font = codeFont(20*u); ctx.fillStyle = t.syn.com; ctx.textAlign = "right";
      ctx.fillText(label, x + w - 32*u, y + 37*u); ctx.textAlign = "left";
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
let lastCode = null;
function renderPoster(canvas){
  const S = SIZES[state.size] || SIZES.portrait, W = S.w, H = S.h;
  if (canvas.width !== W) canvas.width = W;
  if (canvas.height !== H) canvas.height = H;
  const ctx = canvas.getContext("2d");
  const t = THEMES[state.theme] || THEMES.night, accent = state.accent || t.accent;
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
  ctx.fillStyle = accent; rr(ctx, P, P, mk, mk, 14*u); ctx.fill();
  ctx.fillStyle = t.onAccent; ctx.font = codeFont(21*u, true); ctx.textAlign = "center";
  ctx.fillText("</>", P + mk/2, P + mk/2 + 1*u); ctx.textAlign = "left";
  ctx.fillStyle = t.fg; ctx.font = fontStr({weight: bold}, 28*u);
  ctx.fillText(state.handle || "", P + mk + 18*u, P + mk/2 + 1*u);

  // footer
  if (state.footer) {
    ctx.font = fontStr({}, 24*u); ctx.fillStyle = t.muted;
    let f = state.footer; const maxF = W - 2*P;
    while (f.length > 1 && ctx.measureText(f).width > maxF) f = f.slice(0, -2) + "…";
    ctx.fillText(f, P, H - P - 14*u);
  }
  ctx.fillStyle = accent; ctx.fillRect(0, H - 8*u, W, 8*u);

  const top = P + mk + 50*u, bottom = H - P - (state.footer ? 74*u : 20*u);
  const avail = bottom - top;
  const hl = hasCode ? hlLines(state.code, state.lang) : null;
  const label = state.file || (hl ? (LANG_LABEL[hl.detected] || hl.detected || "") : "");
  const tagH = 46*u;
  const drawTag = (x, y) => {
    ctx.font = fontStr({weight: bold}, 22*u);
    const tw = ctx.measureText(state.tag).width + 36*u;
    ctx.fillStyle = rgba(accent, 0.16); rr(ctx, x, y, tw, tagH, tagH/2); ctx.fill();
    ctx.fillStyle = accent; ctx.fillText(state.tag, x + 18*u, y + tagH/2 + 1*u);
  };
  lastCode = null;

  if (wide && hasCode) {
    const gap = 52*u, lw = (W - 2*P - gap) * 0.42, rx = P + lw + gap, rw = W - P - rx;
    const TL = fitRich(ctx, state.title, lw, 54*u, 30*u, 4, {title: true});
    const tagB = state.tag ? tagH + 22*u : 0;
    const BL = fitRich(ctx, state.body, lw, 26*u, 18*u, 99, {}, avail - richH(TL) - tagB - 22*u);
    const leftH = tagB + richH(TL) + (state.body ? 22*u + richH(BL) : 0);
    let y = top + Math.max(0, (avail - leftH) / 2);
    if (state.tag) { drawTag(P, y); y += tagB; }
    drawRich(ctx, TL, P, y, t.fg, t.fg, accent); y += richH(TL) + 22*u;
    if (state.body) drawRich(ctx, BL, P, y, t.muted, t.fg, accent);
    const C = layoutCode(ctx, hl, rw, avail + 30*u, u);
    drawCodeCard(ctx, C, rx, top - 15*u + Math.max(0, (avail + 30*u - C.h) / 2), rw, t, u, label);
    lastCode = C; return;
  }

  const cw = W - 2*P;
  if (!hasCode) {
    const TL = fitRich(ctx, state.title, cw, (wide ? 64 : 92)*u, 40*u, wide ? 3 : 5, {title: true});
    const BL = fitRich(ctx, state.body, cw * (wide ? 1 : 0.92), (wide ? 30 : 36)*u, 22*u, 99, {}, avail - richH(TL) - 140*u);
    const gh = (state.tag ? tagH + 30*u : 0) + richH(TL) + (state.body ? 34*u + richH(BL) : 0);
    let y = top + Math.max(0, (avail - gh) * 0.46);
    if (state.tag) { drawTag(P, y); y += tagH + 30*u; }
    drawRich(ctx, TL, P, y, t.fg, t.fg, accent); y += richH(TL);
    if (state.body) drawRich(ctx, BL, P, y + 34*u, t.muted, t.fg, accent);
    return;
  }

  const tagB = state.tag ? tagH + 24*u : 0;
  const TL = fitRich(ctx, state.title, cw, 66*u, 40*u, 3, {title: true});
  const BL = state.body ? fitRich(ctx, state.body, cw, 30*u, 22*u, 99, {}, avail * 0.3) : {lines: [], lh: 0};
  const textH = tagB + richH(TL) + (state.body ? 22*u + richH(BL) : 0);
  const codeGap = 42*u;
  const C = layoutCode(ctx, hl, cw, Math.max(180*u, avail - textH - codeGap), u);
  let y = top + Math.max(0, (avail - (textH + codeGap + C.h)) * 0.42);
  if (state.tag) { drawTag(P, y); y += tagB; }
  drawRich(ctx, TL, P, y, t.fg, t.fg, accent); y += richH(TL);
  if (state.body) { y += 22*u; drawRich(ctx, BL, P, y, t.muted, t.fg, accent); y += richH(BL); }
  drawCodeCard(ctx, C, P, y + codeGap, cw, t, u, label);
  lastCode = C;
}

/* ---------- render loop ---------- */
const poster = $("poster");
let renderTimer;
function schedule(){ clearTimeout(renderTimer); renderTimer = setTimeout(doRender, 60); }
async function doRender(){
  await ensureFonts();
  renderPoster(poster);
  const note = $("codeNote");
  if (lastCode && (lastCode.truncated || lastCode.n > 22)) {
    note.hidden = false;
    note.textContent = lastCode.truncated
      ? (state.size === "portrait" ? "কোডটা ছবিতে পুরোটা ধরছে না, শেষের অংশ কেটে গেছে। লাইন কমিয়ে দিন।" : "কোডটা ছবিতে পুরোটা ধরছে না, শেষের অংশ কেটে গেছে। লাইন কমান, অথবা মাপ পোর্ট্রেট করুন।")
      : `কোডে ${bn(lastCode.n)} লাইন, ফোনে ছোট দেখাবে। ১৫ লাইনের মধ্যে রাখলে পড়তে সুবিধা।`;
  } else note.hidden = true;
}

/* ---------- form ---------- */
const F = {title: $("fTitle"), body: $("fBody"), code: $("fCode"), lang: $("fLang"), tag: $("fTag"), file: $("fFile")};
LANGS.forEach(([v, l]) => { const o = document.createElement("option"); o.value = v; o.textContent = l; F.lang.append(o); });
for (const k in F) F[k].addEventListener("input", () => { state[k] = F[k].value; schedule(); persist(); });
F.code.addEventListener("keydown", e => {
  if (e.key === "Tab" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
    e.preventDefault(); const el = F.code;
    el.setRangeText("  ", el.selectionStart, el.selectionEnd, "end"); el.dispatchEvent(new Event("input"));
  }
});

const sizeBox = $("sizes");
for (const [k, s] of Object.entries(SIZES)) {
  const b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "radio"); b.dataset.k = k;
  b.append(s.label); const sm = document.createElement("small"); sm.textContent = s.ratio; b.append(sm);
  b.addEventListener("click", () => { state.size = k; syncAll(); schedule(); persist(); });
  sizeBox.append(b);
}
const themeBox = $("themes");
for (const [k, th] of Object.entries(THEMES)) {
  const b = document.createElement("button"); b.type = "button"; b.className = "dot"; b.setAttribute("role", "radio");
  b.dataset.k = k; b.title = th.name; b.setAttribute("aria-label", th.name);
  b.style.background = `linear-gradient(135deg, ${th.bg1}, ${th.bg2})`; b.style.setProperty("--a", th.accent);
  b.addEventListener("click", () => { state.theme = k; state.accent = null; syncAll(); schedule(); persist(); });
  themeBox.append(b);
}
const dFontBn = $("dFontBn");
for (const [k, v] of Object.entries(BN_FONTS)) { const o = document.createElement("option"); o.value = k; o.textContent = v.label; dFontBn.append(o); }
const dFontCode = $("dFontCode");
CODE_FONTS.forEach(k => { const o = document.createElement("option"); o.value = k; o.textContent = k; dFontCode.append(o); });
const D = {fontBn: dFontBn, fontCode: dFontCode, handle: $("dHandle"), footer: $("dFooter")};
for (const k in D) D[k].addEventListener("input", () => { state[k] = D[k].value; schedule(); persist(); });
const T = {showLineNo: $("tLine"), showChrome: $("tChrome")};
for (const k in T) T[k].addEventListener("change", () => { state[k] = T[k].checked; schedule(); persist(); });
$("dCodeSize").addEventListener("input", e => { state.codeSize = +e.target.value; syncAll(); schedule(); persist(); });
$("dAccent").addEventListener("input", e => { state.accent = e.target.value; schedule(); persist(); });
$("dAccentReset").addEventListener("click", () => { state.accent = null; syncAll(); schedule(); persist(); });

function syncAll(){
  for (const k in F) F[k].value = state[k] || (k === "lang" ? "auto" : "");
  for (const k in D) D[k].value = state[k] ?? "";
  for (const k in T) T[k].checked = !!state[k];
  sizeBox.querySelectorAll("button").forEach(b => b.setAttribute("aria-checked", b.dataset.k === state.size ? "true" : "false"));
  themeBox.querySelectorAll(".dot").forEach(b => b.setAttribute("aria-checked", b.dataset.k === state.theme ? "true" : "false"));
  $("dAccent").value = state.accent || THEMES[state.theme].accent;
  $("dCodeSize").value = state.codeSize || 0;
  $("dCodeSizeVal").textContent = state.codeSize ? bn(state.codeSize) : "নিজে থেকে";
}

/* ---------- earlier posters ---------- */
const fmtDate = ts => { try { return new Date(ts).toLocaleDateString("bn-BD", {day: "numeric", month: "long"}); } catch { return ""; } };
function armed(btn, label, fn){
  btn.addEventListener("click", () => {
    if (btn.dataset.arm === "1") { clearTimeout(btn._t); fn(); return; }
    btn.dataset.arm = "1"; const old = btn.textContent; btn.textContent = label; btn.classList.add("arm");
    btn._t = setTimeout(() => { btn.dataset.arm = ""; btn.textContent = old; btn.classList.remove("arm"); }, 3000);
  });
}
function renderLib(){
  const box = $("libList"); box.textContent = "";
  library.forEach(p => {
    const row = document.createElement("div"); row.className = "libitem"; row.setAttribute("aria-current", p.id === state.id ? "true" : "false");
    const tx = document.createElement("div"); tx.className = "t";
    const b = document.createElement("b"); b.textContent = p.title || "শিরোনাম নেই";
    const sm = document.createElement("small"); sm.textContent = (p.id === state.id ? "খোলা আছে · " : "") + fmtDate(p.updated);
    tx.append(b, sm); row.append(tx);
    if (p.id !== state.id) {
      const o = document.createElement("button"); o.className = "ib"; o.type = "button"; o.textContent = "খুলুন";
      o.addEventListener("click", () => loadPost(p.id));
      const d = document.createElement("button"); d.className = "ib warn"; d.type = "button"; d.textContent = "মুছুন";
      armed(d, "নিশ্চিত?", () => { library = library.filter(x => x.id !== p.id); store.set("kodpot.posters", library); renderLib(); toast("পোস্টার মুছে ফেলা হয়েছে"); });
      row.append(o, d);
    }
    box.append(row);
  });
}
$("libBox").addEventListener("toggle", () => { if ($("libBox").open) renderLib(); });
function loadPost(id){
  clearTimeout(saveTimer); commit();
  const p = library.find(x => x.id === id); if (!p) return;
  state = clone(p); store.set("kodpot.currentPoster", id);
  syncAll(); schedule(); renderLib(); toast("পোস্টার খোলা হয়েছে");
}
$("libNew").addEventListener("click", () => {
  clearTimeout(saveTimer); commit();
  const p = {id: uid(), updated: Date.now(), tag: "", title: "পোস্টের শিরোনাম লিখুন", body: "এখানে ছোট করে ব্যাখ্যা লিখুন।", code: "// এখানে আপনার কোড পেস্ট করুন", lang: "auto", file: ""};
  DESIGN_KEYS.forEach(k => p[k] = state[k]);
  state = p; commit(); syncAll(); schedule();
  F.title.focus(); F.title.select();
  toast("নতুন পোস্টার শুরু হলো, ডিজাইন আগেরটার মতো রাখা হয়েছে");
});

/* ---------- save / copy ---------- */
let toastT;
function toast(msg){ const el = $("toast"); el.textContent = msg; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => el.hidden = true, 3200); }
const fileName = () => "msilabs-" + ((state.title || "poster").trim().replace(/[\\/:*?"<>|`(){}\[\]]+/g, "").replace(/\s+/g, "-").slice(0, 40) || "poster") + ".png";
const toBlob = c => new Promise(r => c.toBlob(r, "image/png"));
function freshCanvas(){ const c = document.createElement("canvas"); renderPoster(c); return c; }
function showFallback(c){ $("modalImg").src = c.toDataURL("image/png"); $("modal").hidden = false; $("modalClose").focus(); }

$("btnSave").addEventListener("click", async () => {
  const btn = $("btnSave"); if (btn.disabled) return; btn.disabled = true;
  try {
    await ensureFonts();
    const c = freshCanvas();
    const blob = await toBlob(c);
    if (!blob || !("download" in HTMLAnchorElement.prototype)) { showFallback(c); return; }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = fileName();
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    toast("ছবি সেভ হয়েছে");
  } catch (e) { console.error(e); toast("ছবি বানাতে সমস্যা হলো, আবার চেষ্টা করুন"); }
  finally { btn.disabled = false; }
});
$("btnCopy").addEventListener("click", () => {
  const fail = () => toast("এখানে ছবি কপি করা যাচ্ছে না, “ছবি সেভ করুন” ব্যবহার করুন");
  try {
    if (!navigator.clipboard || !window.ClipboardItem) return fail();
    navigator.clipboard.write([new ClipboardItem({"image/png": toBlob(freshCanvas())})])
      .then(() => toast("ছবি কপি হয়েছে, পোস্টে পেস্ট করুন")).catch(fail);
  } catch { fail(); }
});
$("modalClose").addEventListener("click", () => $("modal").hidden = true);
$("modal").addEventListener("click", e => { if (e.target === $("modal")) $("modal").hidden = true; });
document.addEventListener("keydown", e => { if (e.key === "Escape") $("modal").hidden = true; });

/* ---------- boot ---------- */
syncAll(); doRender();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fontsKey = ""; schedule(); });
})();
