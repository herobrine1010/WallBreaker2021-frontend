function t(t) {
  for (var i = Object.create(null), s = t.split(","), e = s.length; e--; ) i[s[e]] = !0;
  return i;
}
function i(t, i) {
  for (let s = t.indexOf("&"); -1 !== s; ) {
    const e = t.indexOf(";", s + 3);
    let n = void 0;
    if (e === -1) break;
    t[s + 1] === "#"
      ? ((n = parseInt((t[s + 2] === "x" ? "0" : "") + t.substring(s + 2, e))),
        isNaN(n) || (t = t.substr(0, s) + String.fromCharCode(n) + t.substr(e + 1)))
      : ((n = t.substring(s + 1, e)),
        (a.entities[n] || (n === "amp" && i)) && (t = t.substr(0, s) + (a.entities[n] || "&") + t.substr(e + 1))),
      (s = t.indexOf("&", s + 1));
  }
  return t;
}
function s(t) {
  (this.options = t.data || {}),
    (this.tagStyle = { ...a.tagStyle, ...this.options.tagStyle }),
    (this.imgList = t.imgList || []),
    (this.plugins = t.plugins || []),
    (this.attrs = Object.create(null)),
    (this.stack = []),
    (this.nodes = []),
    (this.pre =
      (this.options.containerStyle || "").includes("white-space") && this.options.containerStyle.includes("pre")
        ? 2
        : 0);
}
function e(t) {
  this.handler = t;
}
var a = {
  trustTags: t(
    "a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"
  ),
  blockTags: t("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),
  ignoreTags: t(
    "area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr"
  ),
  voidTags: t(
    "area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"
  ),
  entities: {
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    ensp: " ",
    emsp: " ",
    nbsp: " ",
    semi: ";",
    ndash: "–",
    mdash: "—",
    middot: "·",
    lsquo: "‘",
    rsquo: "’",
    ldquo: "“",
    rdquo: "”",
    bull: "•",
    hellip: "…"
  },
  tagStyle: {
    address: "font-style:italic",
    big: "display:inline;font-size:1.2em",
    caption: "display:table-caption;text-align:center",
    center: "text-align:center",
    cite: "font-style:italic",
    dd: "margin-left:40px",
    mark: "background-color:yellow",
    pre: "font-family:monospace;white-space:pre",
    s: "text-decoration:line-through",
    small: "display:inline;font-size:0.8em",
    strike: "text-decoration:line-through",
    u: "text-decoration:underline"
  }
};
const n = { h1: "_0", h2: "_1", h3: "_2", h4: "_3", li: "_4", p: "_5" };
const r = wx.getSystemInfoSync();
const o = r.windowWidth;
const h = r.system;
const l = t(" ,\r,\n,\t,\f");
let c = 0;
(s.prototype.parse = function (t) {
  for (let i = this.plugins.length; i--; ) this.plugins[i].onUpdate && (t = this.plugins[i].onUpdate(t, a) || t);
  for (new e(this).parse(t); this.stack.length; ) this.popNode();
  return this.nodes;
}),
  (s.prototype.expose = function () {
    for (let t = this.stack.length; t--; ) {
      const i = this.stack[t];
      if (i.c || i.name === "a" || i.name === "video" || i.name === "audio") return;
      i.c = 1;
    }
  }),
  (s.prototype.hook = function (t) {
    for (let i = this.plugins.length; i--; )
      if (this.plugins[i].onParse && !1 === this.plugins[i].onParse(t, this)) return !1;
    return !0;
  }),
  (s.prototype.getUrl = function (t) {
    const i = this.options.domain;
    return (
      t[0] === "/"
        ? t[1] === "/"
          ? (t = (i ? i.split("://")[0] : "http") + ":" + t)
          : i && (t = i + t)
        : !i || t.includes("data:") || t.includes("://") || (t = i + "/" + t),
      t
    );
  }),
  (s.prototype.parseStyle = function (t) {
    const i = t.attrs;
    const s = (this.tagStyle[t.name] || "").split(";").concat((i.style || "").split(";"));
    const e = {};
    let a = "";
    i.id &&
      !this.xml &&
      (this.options.useAnchor
        ? this.expose()
        : "img" !== t.name && "a" !== t.name && "video" !== t.name && "audio" !== t.name && (i.id = void 0)),
      i.width && ((e.width = parseFloat(i.width) + (i.width.includes("%") ? "%" : "px")), (i.width = void 0)),
      i.height && ((e.height = parseFloat(i.height) + (i.height.includes("%") ? "%" : "px")), (i.height = void 0));
    for (let n = 0, r = s.length; n < r; n++) {
      const h = s[n].split(":");
      if (!(h.length < 2)) {
        const c = h.shift().trim().toLowerCase();
        let d = h.join(":").trim();
        if ((d[0] === "-" && d.lastIndexOf("-") > 0) || d.includes("safe")) a += ";".concat(c, ":").concat(d);
        else if (!e[c] || d.includes("import") || !e[c].includes("import")) {
          if (d.includes("url")) {
            let p = d.indexOf("(") + 1;
            if (p) {
              for (; d[p] === '"' || d[p] === "'" || l[d[p]]; ) p++;
              d = d.substr(0, p) + this.getUrl(d.substr(p));
            }
          } else {
            d.includes("rpx") &&
              (d = d.replace(/[0-9.]+\s*rpx/g, t => {
                return (parseFloat(t) * o) / 750 + "px";
              }));
          }
          e[c] = d;
        }
      }
    }
    return (t.attrs.style = a), e;
  }),
  (s.prototype.onTagName = function (t) {
    (this.tagName = this.xml ? t : t.toLowerCase()), this.tagName === "svg" && (this.xml = (this.xml || 0) + 1);
  }),
  (s.prototype.onAttrName = function (t) {
    (t = this.xml ? t : t.toLowerCase()),
      t.substr(0, 5) === "data-"
        ? "data-src" !== t || this.attrs.src
          ? this.tagName === "img" || this.tagName === "a"
            ? (this.attrName = t)
            : (this.attrName = void 0)
          : (this.attrName = "src")
        : ((this.attrName = t), (this.attrs[t] = "T"));
  }),
  (s.prototype.onAttrVal = function (t) {
    const s = this.attrName || "";
    s === "style" || s === "href"
      ? (this.attrs[s] = i(t, !0))
      : s.includes("src")
      ? (this.attrs[s] = this.getUrl(i(t, !0)))
      : s && (this.attrs[s] = t);
  }),
  (s.prototype.onOpenTag = function (t) {
    const i = Object.create(null);
    (i.name = this.tagName), (i.attrs = this.attrs), (this.attrs = Object.create(null));
    const s = i.attrs;
    const e = this.stack[this.stack.length - 1];
    const r = e ? e.children : this.nodes;
    const h = this.xml ? t : a.voidTags[i.name];
    if ((n[i.name] && (s.class = n[i.name] + (s.class ? " " + s.class : "")), i.name === "embed")) {
      const l = s.src || "";
      l.includes(".mp4") || l.includes(".3gp") || l.includes(".m3u8") || (s.type || "").includes("video")
        ? (i.name = "video")
        : (l.includes(".mp3") ||
            l.includes(".wav") ||
            l.includes(".aac") ||
            l.includes(".m4a") ||
            (s.type || "").includes("audio")) &&
          (i.name = "audio"),
        s.autostart && (s.autoplay = "T"),
        (s.controls = "T");
    }
    if (
      (("video" !== i.name && "audio" !== i.name) ||
        ("video" !== i.name || s.id || (s.id = "v" + c++),
        s.controls || s.autoplay || (s.controls = "T"),
        (i.src = []),
        s.src && (i.src.push(s.src), (s.src = void 0)),
        this.expose()),
      h)
    ) {
      if (!this.hook(i) || a.ignoreTags[i.name])
        return void ("base" !== i.name || this.options.domain
          ? i.name === "source" && e && (e.name === "video" || e.name === "audio") && s.src && e.src.push(s.src)
          : (this.options.domain = s.href));
      const d = this.parseStyle(i);
      if (i.name === "img") {
        if (
          s.src &&
          (s.src.includes("webp") && (i.webp = "T"),
          s.src.includes("data:") && !s["original-src"] && (s.ignore = "T"),
          !s.ignore || i.webp || s.src.includes("cloud://"))
        ) {
          for (let p = this.stack.length; p--; ) {
            const u = this.stack[p];
            if (u.name === "a") {
              i.a = u.attrs;
              break;
            }
            const g = u.attrs.style || "";
            if (
              !g.includes("flex:") ||
              g.includes("flex:0") ||
              g.includes("flex: 0") ||
              (d.width && d.width.includes("%"))
            ) {
              if (g.includes("flex") && d.width === "100%") {
                for (let f = p + 1; f < this.stack.length; f++) {
                  const m = this.stack[f].attrs.style || "";
                  if (!m.includes(";width") && !m.includes(" width") && 0 !== m.indexOf("width")) {
                    d.width = "";
                    break;
                  }
                }
              } else
                g.includes("inline-block") &&
                  (d.width && d.width[d.width.length - 1] === "%"
                    ? ((u.attrs.style += ";max-width:" + d.width), (d.width = ""))
                    : (u.attrs.style += ";max-width:100%"));
            } else {
              (d.width = "100% !important"), (d.height = "");
              for (let v = p + 1; v < this.stack.length; v++)
                this.stack[v].attrs.style = (this.stack[v].attrs.style || "").replace("inline-", "");
            }
            u.c = 1;
          }
          i.i = this.imgList.length;
          let y = s["original-src"] || s.src;
          if (this.imgList.includes(y)) {
            let x = y.indexOf("://");
            if (-1 !== x) {
              x += 3;
              for (var b = y.substr(0, x); x < y.length && "/" !== y[x]; x++)
                b += Math.random() > 0.5 ? y[x].toUpperCase() : y[x];
              (b += y.substr(x)), (y = b);
            }
          }
          this.imgList.push(y);
        }
        d.display === "inline" && (d.display = ""),
          s.ignore && ((d["max-width"] = d["max-width"] || "100%"), (s.style += ";-webkit-touch-callout:none")),
          parseInt(d.width) > o && (d.height = void 0),
          d.width &&
            (d.width.includes("auto")
              ? (d.width = "")
              : ((i.w = "T"), d.height && !d.height.includes("auto") && (i.h = "T")));
      } else if (i.name === "svg") return r.push(i), this.stack.push(i), void this.popNode();
      for (const w in d) d[w] && (s.style += ";".concat(w, ":").concat(d[w].replace(" !important", "")));
      s.style = s.style.substr(1) || void 0;
    } else
      (i.name === "pre" || ((s.style || "").includes("white-space") && s.style.includes("pre"))) &&
        2 !== this.pre &&
        (this.pre = i.pre = 1),
        (i.children = []),
        this.stack.push(i);
    r.push(i);
  }),
  (s.prototype.onCloseTag = function (t) {
    t = this.xml ? t : t.toLowerCase();
    let i;
    for (i = this.stack.length; i-- && this.stack[i].name !== t; );
    if (-1 !== i) for (; this.stack.length > i; ) this.popNode();
    else if (t === "p" || t === "br") {
      const s = this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes;
      s.push({ name: t, attrs: { class: n[t], style: this.tagStyle[t] } });
    }
  }),
  (s.prototype.popNode = function () {
    const t = this.stack.pop();
    let i = t.attrs;
    const s = t.children;
    const e = this.stack[this.stack.length - 1];
    const n = e ? e.children : this.nodes;
    if (!this.hook(t) || a.ignoreTags[t.name])
      return (
        t.name === "title" &&
          s.length &&
          s[0].type === "text" &&
          this.options.setTitle &&
          wx.setNavigationBarTitle({ title: s[0].text }),
        void n.pop()
      );
    if (t.pre && 2 !== this.pre) {
      this.pre = t.pre = void 0;
      for (let r = this.stack.length; r--; ) this.stack[r].pre && (this.pre = 1);
    }
    if (t.name === "svg") {
      if (this.xml > 1) return void this.xml--;
      let h = "";
      const l = i.style;
      return (
        (i.style = ""),
        i.viewbox && (i.viewBox = i.viewbox),
        (i.xmlns = "http://www.w3.org/2000/svg"),
        (function t(i) {
          if (i.type === "text") return void (h += i.text);
          h += "<" + i.name;
          for (const s in i.attrs) {
            const e = i.attrs[s];
            e && (h += " ".concat(s, '="').concat(e, '"'));
          }
          if (i.children) {
            h += ">";
            for (let a = 0; a < i.children.length; a++) t(i.children[a]);
            h += "</" + i.name + ">";
          } else h += "/>";
        })(t),
        (t.name = "img"),
        (t.attrs = { src: "data:image/svg+xml;utf8," + h.replace(/#/g, "%23"), style: l, ignore: "T" }),
        (t.children = void 0),
        void (this.xml = !1)
      );
    }
    const c = {};
    if (
      (i.align &&
        (t.name === "table"
          ? i.align === "center"
            ? (c["margin-inline-start"] = c["margin-inline-end"] = "auto")
            : (c.float = i.align)
          : (c["text-align"] = i.align),
        (i.align = void 0)),
      i.dir && ((c.direction = i.dir), (i.dir = void 0)),
      t.name === "font" &&
        (i.color && ((c.color = i.color), (i.color = void 0)),
        i.face && ((c["font-family"] = i.face), (i.face = void 0)),
        i.size))
    ) {
      let d = parseInt(i.size);
      isNaN(d) ||
        (d < 1 ? (d = 1) : d > 7 && (d = 7),
        (c["font-size"] = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"][d - 1])),
        (i.size = void 0);
    }
    if (
      ((i.class || "").includes("align-center") && (c["text-align"] = "center"),
      Object.assign(c, this.parseStyle(t)),
      "table" !== t.name && parseInt(c.width) > o && ((c["max-width"] = "100%"), (c["box-sizing"] = "border-box")),
      a.blockTags[t.name])
    )
      t.name = "div";
    else if (a.trustTags[t.name] || this.xml) {
      if (t.name === "a" || t.name === "ad") this.expose();
      else if (t.name === "video" || t.name === "audio") t.children = void 0;
      else if (("ul" !== t.name && "ol" !== t.name) || !t.c) {
        if (t.name === "table") {
          let p = parseFloat(i.cellpadding);
          let u = parseFloat(i.cellspacing);
          const g = parseFloat(i.border);
          if (
            (t.c && (isNaN(p) && (p = 2), isNaN(u) && (u = 2)),
            g && (i.style += ";border:" + g + "px solid gray"),
            t.flag && t.c)
          ) {
            (t.flag = void 0),
              (c.display = "grid"),
              u
                ? ((c["grid-gap"] = u + "px"), (c.padding = u + "px"))
                : g && (i.style += ";border-left:0;border-top:0");
            const f = [];
            const m = [];
            const v = [];
            const y = {};
            !(function t(i) {
              for (let s = 0; s < i.length; s++) i[s].name === "tr" ? m.push(i[s]) : t(i[s].children || []);
            })(s);
            for (let x = 1; x <= m.length; x++) {
              for (var b = 1, w = 0; w < m[x - 1].children.length; w++, b++) {
                const k = m[x - 1].children[w];
                if (k.name === "td" || k.name === "th") {
                  for (; y[x + "." + b]; ) b++;
                  k.c = 1;
                  let N = k.attrs.style || "";
                  const T = N.indexOf("width") ? N.indexOf(";width") : 0;
                  if (-1 !== T) {
                    let O = N.indexOf(";", T + 6);
                    O === -1 && (O = N.length),
                      k.attrs.colspan || (f[b] = N.substring(T ? T + 7 : 6, O)),
                      (N = N.substr(0, T) + N.substr(O));
                  }
                  if (
                    ((N +=
                      (g ? ";border:".concat(g, "px solid gray") + (u ? "" : ";border-right:0;border-bottom:0") : "") +
                      (p ? ";padding:".concat(p, "px") : "")),
                    k.attrs.colspan &&
                      ((N += ";grid-column-start:"
                        .concat(b, ";grid-column-end:")
                        .concat(b + parseInt(k.attrs.colspan))),
                      k.attrs.rowspan || (N += ";grid-row-start:".concat(x, ";grid-row-end:").concat(x + 1)),
                      (b += parseInt(k.attrs.colspan) - 1)),
                    k.attrs.rowspan)
                  ) {
                    (N += ";grid-row-start:".concat(x, ";grid-row-end:").concat(x + parseInt(k.attrs.rowspan))),
                      k.attrs.colspan || (N += ";grid-column-start:".concat(b, ";grid-column-end:").concat(b + 1));
                    for (let C = 1; C < k.attrs.rowspan; C++)
                      for (let S = 0; S < (k.attrs.colspan || 1); S++) y[x + C + "." + (b - S)] = 1;
                  }
                  N && (k.attrs.style = N), v.push(k);
                }
              }
              if (x === 1) {
                for (var A = "", z = 1; z < b; z++) A += (f[z] ? f[z] : "auto") + " ";
                c["grid-template-columns"] = A;
              }
            }
            t.children = v;
          } else {
            t.c && (c.display = "table"),
              isNaN(u) || (c["border-spacing"] = u + "px"),
              (g || p || t.c) &&
                (function i(s) {
                  for (let e = 0; e < s.length; e++) {
                    const a = s[e];
                    t.c && (a.c = 1),
                      a.name === "th" || a.name === "td"
                        ? (g && (a.attrs.style = "border:".concat(g, "px solid gray;").concat(a.attrs.style || "")),
                          p && (a.attrs.style = "padding:".concat(p, "px;").concat(a.attrs.style || "")))
                        : a.children && i(a.children);
                  }
                })(s);
          }
          if (this.options.scrollTable && !(i.style || "").includes("inline")) {
            const I = { ...t };
            (t.name = "div"), (t.attrs = { style: "overflow-x:auto;padding:1px" }), (t.children = [I]), (i = I.attrs);
          }
        } else if (("td" !== t.name && "th" !== t.name) || (!i.colspan && !i.rowspan)) {
          if (t.name === "ruby") {
            t.name = "span";
            for (let j = 0; j < s.length - 1; j++)
              s[j].type === "text" &&
                s[j + 1].name === "rt" &&
                ((s[j] = {
                  name: "span",
                  attrs: { style: "display:inline-block;text-align:center" },
                  children: [
                    {
                      name: "div",
                      attrs: { style: "font-size:50%;" + (s[j + 1].attrs.style || "") },
                      children: s[j + 1].children
                    },
                    s[j]
                  ]
                }),
                s.splice(j + 1, 1));
          }
        } else {
          for (let L = this.stack.length; L--; ) {
            if (this.stack[L].name === "table") {
              this.stack[L].flag = 1;
              break;
            }
          }
        }
      } else {
        const q = { a: "lower-alpha", A: "upper-alpha", i: "lower-roman", I: "upper-roman" };
        q[i.type] && ((i.style += ";list-style-type:" + q[i.type]), (i.type = void 0)), (t.c = 1);
        for (let F = s.length; F--; ) s[F].name === "li" && (s[F].c = 1);
      }
    } else t.name = "span";
    if ((c.display || "").includes("flex") && !t.c) {
      for (let U = s.length; U--; ) {
        const V = s[U];
        V.f && ((V.attrs.style = (V.attrs.style || "") + V.f), (V.f = void 0));
      }
    }
    const _ = e && (e.attrs.style || "").includes("flex") && !t.c && !(c.display || "").includes("inline");
    _ && (t.f = ";max-width:100%");
    for (const B in c) {
      if (c[B]) {
        const P = ";".concat(B, ":").concat(c[B].replace(" !important", ""));
        _ &&
        ((B.includes("flex") && "flex-direction" !== B) ||
          B === "align-self" ||
          c[B][0] === "-" ||
          (B === "width" && P.includes("%")))
          ? ((t.f += P), B === "width" && (i.style += ";width:100%"))
          : (i.style += P);
      }
    }
    i.style = i.style.substr(1) || void 0;
  }),
  (s.prototype.onText = function (t) {
    if (!this.pre) {
      for (var s, e = "", a = 0, n = t.length; a < n; a++)
        l[t[a]] ? (" " !== e[e.length - 1] && (e += " "), "\n" !== t[a] || s || (s = !0)) : (e += t[a]);
      if (e === " " && s) return;
      t = e;
    }
    const r = Object.create(null);
    if (((r.type = "text"), (r.text = i(t)), this.hook(r))) {
      this.options.selectable === "force" && h.includes("iOS") && (this.expose(), (r.us = "T"));
      (this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes).push(r);
    }
  }),
  (e.prototype.parse = function (t) {
    (this.content = t || ""), (this.i = 0), (this.start = 0), (this.state = this.text);
    for (let i = this.content.length; -1 !== this.i && this.i < i; ) this.state();
  }),
  (e.prototype.checkClose = function (t) {
    const i = this.content[this.i] === "/";
    return (
      !!(this.content[this.i] === ">" || (i && this.content[this.i + 1] === ">")) &&
      (t && this.handler[t](this.content.substring(this.start, this.i)),
      (this.i += i ? 2 : 1),
      (this.start = this.i),
      this.handler.onOpenTag(i),
      this.handler.tagName === "script"
        ? ((this.i = this.content.indexOf("</", this.i)),
          -1 !== this.i && ((this.i += 2), (this.start = this.i)),
          (this.state = this.endTag))
        : (this.state = this.text),
      !0)
    );
  }),
  (e.prototype.text = function () {
    if (((this.i = this.content.indexOf("<", this.i)), this.i === -1))
      return void (
        this.start < this.content.length && this.handler.onText(this.content.substring(this.start, this.content.length))
      );
    const t = this.content[this.i + 1];
    if ((t >= "a" && t <= "z") || (t >= "A" && t <= "Z"))
      this.start !== this.i && this.handler.onText(this.content.substring(this.start, this.i)),
        (this.start = ++this.i),
        (this.state = this.tagName);
    else if (t === "/" || t === "!" || t === "?") {
      this.start !== this.i && this.handler.onText(this.content.substring(this.start, this.i));
      const i = this.content[this.i + 2];
      if (t === "/" && ((i >= "a" && i <= "z") || (i >= "A" && i <= "Z")))
        return (this.i += 2), (this.start = this.i), void (this.state = this.endTag);
      let s = "--\x3e";
      (t === "!" && this.content[this.i + 2] === "-" && this.content[this.i + 3] === "-") || (s = ">"),
        (this.i = this.content.indexOf(s, this.i)),
        -1 !== this.i && ((this.i += s.length), (this.start = this.i));
    } else this.i++;
  }),
  (e.prototype.tagName = function () {
    if (l[this.content[this.i]]) {
      for (this.handler.onTagName(this.content.substring(this.start, this.i)); l[this.content[++this.i]]; );
      this.i < this.content.length && !this.checkClose() && ((this.start = this.i), (this.state = this.attrName));
    } else this.checkClose("onTagName") || this.i++;
  }),
  (e.prototype.attrName = function () {
    let t = this.content[this.i];
    if (l[t] || t === "=") {
      this.handler.onAttrName(this.content.substring(this.start, this.i));
      for (let i = t === "=", s = this.content.length; ++this.i < s; ) {
        if (((t = this.content[this.i]), !l[t])) {
          if (this.checkClose()) return;
          if (i) return (this.start = this.i), void (this.state = this.attrVal);
          if ("=" !== this.content[this.i]) return (this.start = this.i), void (this.state = this.attrName);
          i = !0;
        }
      }
    } else this.checkClose("onAttrName") || this.i++;
  }),
  (e.prototype.attrVal = function () {
    const t = this.content[this.i];
    const i = this.content.length;
    if (t === '"' || t === "'") {
      if (((this.start = ++this.i), (this.i = this.content.indexOf(t, this.i)), this.i === -1)) return;
      this.handler.onAttrVal(this.content.substring(this.start, this.i));
    } else {
      for (; this.i < i; this.i++) {
        if (l[this.content[this.i]]) {
          this.handler.onAttrVal(this.content.substring(this.start, this.i));
          break;
        }
        if (this.checkClose("onAttrVal")) return;
      }
    }
    for (; l[this.content[++this.i]]; );
    this.i < i && !this.checkClose() && ((this.start = this.i), (this.state = this.attrName));
  }),
  (e.prototype.endTag = function () {
    const t = this.content[this.i];
    if (l[t] || t === ">" || t === "/") {
      if (
        (this.handler.onCloseTag(this.content.substring(this.start, this.i)),
        ">" !== t && ((this.i = this.content.indexOf(">", this.i)), this.i === -1))
      )
        return;
      (this.start = ++this.i), (this.state = this.text);
    } else this.i++;
  }),
  (module.exports = s);
