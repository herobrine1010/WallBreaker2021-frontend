function t(t, e, i) {
  return (
    e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = i), t
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
      for (var e = t.split("_"), i = this.data.childs[e[0]], r = 1; r < e.length; r++) i = i.children[e[r]];
      return i;
    },
    play: function (t) {
      if (this.root.data.pauseVideo) {
        for (var e = !1, i = t.target.id, r = this.root._videos.length; r--; )
          this.root._videos[r].id === i ? (e = !0) : this.root._videos[r].pause();
        if (!e) {
          const s = wx.createVideoContext(i, this);
          (s.id = i), this.root._videos.push(s);
        }
      }
    },
    imgTap: function (t) {
      const e = this.getNode(t.target.dataset.i);
      if (e.a) return this.linkTap(e.a);
      if (!e.attrs.ignore && (this.root.triggerEvent("imgtap", e.attrs), this.root.data.previewImg)) {
        const i = this.root.imgList[e.i];
        wx.previewImage({ current: i, urls: this.root.imgList });
      }
    },
    imgLoad: function (e) {
      let i;
      const r = e.target.dataset.i;
      const s = this.getNode(r);
      s.w ? ((this.data.opts[1] && !this.data.ctrl[r]) || this.data.ctrl[r] === -1) && (i = 1) : (i = e.detail.width),
        i && this.setData(t({}, "ctrl." + r, i));
    },
    linkTap: function (t) {
      const e = t.currentTarget ? this.getNode(t.currentTarget.dataset.i) : {};
      const i = e.attrs || t;
      const r = i.href;
      this.root.triggerEvent("linktap", { innerText: this.root.getText(e.children || []), ...i }),
        r &&
          (r[0] === "#"
            ? this.root.navigateTo(r.substring(1)).catch(() => {})
            : r.includes("://")
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
    mediaError: function (e) {
      const i = e.target.dataset.i;
      const r = this.getNode(i);
      if (r.name === "video" || r.name === "audio") {
        let s = (this.data.ctrl[i] || 0) + 1;
        if ((s > r.src.length && (s = 0), s < r.src.length)) return this.setData(t({}, "ctrl." + i, s));
      } else r.name === "img" && this.data.opts[2] && this.setData(t({}, "ctrl." + i, -1));
      this.root && this.root.triggerEvent("error", { source: r.name, attrs: r.attrs, errMsg: e.detail.errMsg });
    }
  }
});
