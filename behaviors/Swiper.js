// swiper相关数据 函数 用于左右滑动切换 应用见tongde/main.js
module.exports = Behavior({
  data: {
    tabIndex: 0, // 当前swiper选中项目
    tab: 0, //当前tab对应的项目
  },
  methods: {
    // 绑定在点击tab上函数，通过点击切换swiper
    changeItem: function(e) {
      this.setData({
        tabIndex: e.currentTarget.dataset.item
      });
    },
    // 绑定在swiper上的函数，用来改变tab
    changeTab: function(e) {
      var current = e.detail.current;
      this.setData({
        tab: e.detail.current
      });
    },
  }
})