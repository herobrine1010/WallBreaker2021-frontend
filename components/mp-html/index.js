function e(e, t, n) {
  return (
    t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e
  );
}
/* !
 * mp-html v2.2.0
 * https://github.com/jin-yufeng/mp-html
 *
 * Released under the MIT license
 * Author: Jin Yufeng
 */
const t = require("./parser");
const n = [];
Component({
  data: { nodes: [] },
  properties: {
    containerStyle: String,
    content: {
      type: String,
      value: "",
      observer: function (e) {
        this.setContent(e);
      }
    },
    copyLink: { type: Boolean, value: !0 },
    domain: String,
    errorImg: String,
    lazyLoad: Boolean,
    loadingImg: String,
    pauseVideo: { type: Boolean, value: !0 },
    previewImg: { type: Boolean, value: !0 },
    scrollTable: Boolean,
    selectable: null,
    setTitle: { type: Boolean, value: !0 },
    showImgMenu: { type: Boolean, value: !0 },
    tagStyle: Object,
    useAnchor: null
  },
  created: function () {
    this.plugins = [];
    for (let e = n.length; e--; ) this.plugins.push(new n[e](this));
  },
  detached: function () {
    clearInterval(this._timer), this._hook("onDetached");
  },
  methods: {
    in: function (e, t, n) {
      e && t && n && (this._in = { page: e, selector: t, scrollTop: n });
    },
    navigateTo: function (t, n) {
      const o = this;
      return new Promise((r, i) => {
        if (!o.data.useAnchor) return void i(Error("Anchor is disabled"));
        const a = wx
          .createSelectorQuery()
          .in(o._in ? o._in.page : o)
          .select((o._in ? o._in.selector : "._root") + (t ? "".concat(">>>", "#").concat(t) : ""))
          .boundingClientRect();
        o._in
          ? a.select(o._in.selector).scrollOffset().select(o._in.selector).boundingClientRect()
          : a.selectViewport().scrollOffset(),
          a.exec(t => {
            if (!t[0]) return void i(Error("Label not found"));
            const a = t[1].scrollTop + t[0].top - (t[2] ? t[2].top : 0) + (n || parseInt(o.data.useAnchor) || 0);
            o._in ? o._in.page.setData(e({}, o._in.scrollTop, a)) : wx.pageScrollTo({ scrollTop: a, duration: 300 }),
              r();
          });
      });
    },
    getText: function (e) {
      let t = "";
      return (
        (function e(n) {
          for (let o = 0; o < n.length; o++) {
            const r = n[o];
            if (r.type === "text") t += r.text.replace(/&amp;/g, "&");
            else if (r.name === "br") t += "\n";
            else {
              const i =
                r.name === "p" ||
                r.name === "div" ||
                r.name === "tr" ||
                r.name === "li" ||
                (r.name[0] === "h" && r.name[1] > "0" && r.name[1] < "7");
              i && t && "\n" !== t[t.length - 1] && (t += "\n"),
                r.children && e(r.children),
                i && "\n" !== t[t.length - 1] ? (t += "\n") : ("td" !== r.name && "th" !== r.name) || (t += "\t");
            }
          }
        })(e || this.data.nodes),
        t
      );
    },
    getRect: function () {
      const e = this;
      return new Promise((t, n) => {
        wx.createSelectorQuery()
          .in(e)
          .select("._root")
          .boundingClientRect()
          .exec(e => {
            return e[0] ? t(e[0]) : n(Error("Root label not found"));
          });
      });
    },
    setContent: function (e, n) {
      const o = this;
      (this.imgList && n) || (this.imgList = []), (this._videos = []);
      const r = {};
      const i = new t(this).parse(e);
      if (n) for (let a = this.data.nodes.length, l = i.length; l--; ) r["nodes[".concat(a + l, "]")] = i[l];
      else r.nodes = i;
      this.setData(r, () => {
        o._hook("onLoad"), o.triggerEvent("load");
      });
      let s;
      clearInterval(this._timer),
        (this._timer = setInterval(() => {
          o.getRect()
            .then(e => {
              e.height === s && (o.triggerEvent("ready", e), clearInterval(o._timer)), (s = e.height);
            })
            .catch(() => {});
        }, 350));
    },
    _hook: function (e) {
      for (let t = n.length; t--; ) this.plugins[t][e] && this.plugins[t][e]();
    },
    _add: function (e) {
      e.detail.root = this;
    }
  }
});
