// pages/jiren/groupDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarList:[]

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //拼接 发起人 和 参与者列表
    // {"avatar":"...","me":false,"initiator":false,"id":1}
    this.setData({avatarList:[
      {"initiator":true,"avatar":'https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02'},
      {"me":true,"avatar":"https://s3-alpha.figma.com/profile/06efcf65-977c-4154-b8a3-3db3f6a2f79f"},
      {"avatar":"https://s3-alpha.figma.com/profile/dda831f2-b8ec-4bb9-b165-1708bad4fb9e"},{},{},{},{},{},{},{}
    ]});
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