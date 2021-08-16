// pages/tongde/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentItem: 0, // 当前swiper选中项目
    tab: 0, //当前tab对应的项目

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 绑定在点击tab上函数，通过点击切换swiper
  changeItem: function(e) {

    this.setData({
      currentItem: e.currentTarget.dataset.item
    }
    )

  },
  // 绑定在swiper上的函数，用来改变tab
  changeTab: function(e) {
    var current = e.detail.current;
    console.log('current',current);
    // TODO 根据current不同的值发送不同的请求，获取不同的数据列表
    this.setData({
      tab: e.detail.current
    })

  }
})