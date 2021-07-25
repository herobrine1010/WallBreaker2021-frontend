// pages/personal/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personBrief : {
      nickname: '默认昵称',
      college: '土木工程',
      major: '防灾减灾',
      grade: '2020级',
      qualification: '研究生'
    },
    labels:[{
      type : 'personal',
      name : '细节控'
    },{
      type : 'personal',
      name : '好学小白'
    },{
      type : 'interest',
      name : '编程'
    },{
      type : 'interest',
      name : '口才'
    },{
      type : 'interest',
      name : '设计'
    }]
  },
  // 以下两个事件，目的用户进入“管理帖子”页面，或者“收藏帖子”页面
  changeToPersonalManagement:function(){
    let app = getApp();
    app.globalData.personalManagementOrCollection = 0;
  },
  changeToPersonalCollection:function(){
    let app = getApp();
    app.globalData.personalManagementOrCollection = 1;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //下面这个请求是用来测试的，之后的版本要删掉。。
    wx.request(
      {
        url: 'http://localhost:8080/userFavouritePosting/myFavouritePosting',
        header: {
          'content-type': 'application/json',
          'cookie':wx.getStorageSync("token")
        },
        method:'GET',
        success:function(res){
            console.log(res)
        }
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2 //0,1,2 0-济事  1-济人  2-我的
      })
   }
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