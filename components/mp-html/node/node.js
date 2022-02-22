function t(t, i, e) {
  return (
    i in t ? Object.defineProperty(t, i, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : (t[i] = e), t
  );
}
Component({
  data: { ctrl: {} },
  properties: { childs: Array, opts: Array },
  attached: function () {
    this.triggerEvent("add", this, { bubbles: !0, composed: !0 });
  },
  methods: {
    noop: function () {},
    getNode: function (t) {
      for (var i = t.split("_"), e = this.data.childs[i[0]], r = 1; r < i.length; r++) e = e.children[i[r]];
      return e;
    },
    play: function (t) {
      if (this.root.data.pauseVideo) {
        for (var i = !1, e = t.target.id, r = this.root._videos.length; r--; )
          this.root._videos[r].id === e ? (i = !0) : this.root._videos[r].pause();
        if (!i) {
          const s = wx.createVideoContext(e, this);
          (s.id = e), this.root._videos.push(s);
        }
      }
    },
    imgTap: function (t) {
      const i = this.getNode(t.target.dataset.i);
      if (i.a) return this.linkTap(i.a);
      if (!i.attrs.ignore && (this.root.triggerEvent("imgtap", i.attrs), this.root.data.previewImg)) {
        const e = this.root.imgList[i.i];
        wx.previewImage({ current: e, urls: this.root.imgList });
      }
    },
    imgLoad: function (i) {
      let e;
      const r = i.target.dataset.i;
      const s = this.getNode(r);
      s.w ? ((this.data.opts[1] && !this.data.ctrl[r]) || this.data.ctrl[r] === -1) && (e = 1) : (e = i.detail.width),
        e && this.setData(t({}, "ctrl." + r, e));
    },
    linkTap: function (t) {
      const i = t.currentTarget ? this.getNode(t.currentTarget.dataset.i) : {};
      const e = i.attrs || t;
      const r = e.href;
      this.root.triggerEvent("linktap", { innerText: this.root.getText(i.children || []), ...e }),
        r &&
          (r[0] === "#"
            ? this.root.navigateTo(r.substring(1)).catch(() => {})
            : r.split("?")[0].includes("://")
            ? this.root.data.copyLink &&
              wx.setClipboardData({
                data: r,
                success: function () {
                  return wx.showToast({ title: "链接已复制" });
                }
              })
            : wx.navigateTo({
                url: r,
                fail: function () {
                  wx.switchTab({ url: r, fail: function () {} });
                }
              }));
    },
    mediaError: function (i) {
      const e = i.target.dataset.i;
      const r = this.getNode(e);
      if (r.name === "video" || r.name === "audio") {
        let s = (this.data.ctrl[e] || 0) + 1;
        if ((s > r.src.length && (s = 0), s < r.src.length)) return this.setData(t({}, "ctrl." + e, s));
      } else r.name === "img" && this.data.opts[2] && this.setData(t({}, "ctrl." + e, -1));
      this.root && this.root.triggerEvent("error", { source: r.name, attrs: r.attrs, errMsg: i.detail.errMsg });
    }
  }
});
