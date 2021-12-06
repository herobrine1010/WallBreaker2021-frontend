// miniprogram/pages/welcome/webView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tongjiUrl : "https://jixingyun.tongji.edu.cn/nidp/app/login?id=Login&sid=0&option=credential&sid=0&target=https%3A%2F%2Fids.tongji.edu.cn%3A8443%2Fnidp%2Foauth%2Fnam%2Fauthz%3Fscope%3Dprofile%26response_type%3Dcode%26redirect_uri%3Dhttps%3A%2F%2Fjixingyun.tongji.edu.cn%2Fapi%2Foauth%2Fcallback%26client_id%3Da5e7f46c-5fa3-4e15-b2e2-d9defd7476ea"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let openid = options.openid
    let tongjiUrl = this.data.tongjiUrl;
    this.setData({
      tongjiUrl : `${tongjiUrl}&openid=${openid}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})