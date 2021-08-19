// pages/tongde/detail.js
/**
 * 2021-8-19
 * Q:
 * 联系方式是只
 * 
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:'寻物中',/* 别的状态(?) */
    title:'物品名称物品名称物品名称',
    userAvatar:'/static/icon/default-user-big.png',
    userName:"破壁者1号",
    time:'2021年6月9日 21:40',
    tag:['#雨伞','#其他'],
    description:"什么时候在哪里丢了什么，求助什么时候在哪里丢了什么，求助什么时候在哪里丢了什么，求助什么时候在哪里丢了什么，求助",
    location:'这里这里这里这里这里这里这里',
    contact:'1561533343',
    pictures:['','','','','','','',''],

    personalInfo:{
        "avatar":"https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02",
        "nickname":"小砂糖星!",
        "wxId":"abcdefg123456789",
        "description":"START:DASH!",
        "school":"建筑学院",
        "major":"风景园林",
        "grade":"2018级",
        "identity":"本科生",

        "wxIdPublic":true,
        "schoolPublic":true,
        "majorPublic":true,
        "gradePublic":true,
        "identityPublic":true,

        "personalLabel":['细节控','好学小白','996'],
        "interestLabel":['口才','设计','文字'],
        "isCheckAnswerButtonShow":false,
      },

    dialog:{
      isDialogShow: false,
      content:'该同学所留联系方式如下，请保护好同学隐私噢',
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      isShowInfo:true,
      infoDetail:{
        key:"微信",
        value:"124kjkajsd",
        copyEnable:true
      }
    
      /*tapOkEvent:"dialogTapOkForAcceptApplying"*/
    },
  },
  showPersonDetail:function(e){
    this.selectComponent("#personalAnimation1").showModal();
  },
  tapCopy:function(e){
    var that = this;
    let info = that.data.dialog.infoDetail.value;
    console.log(info)
    wx.setClipboardData({
      data: info,
      success:function(res){
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  contactDetail:function(e){
    //需要获得发布者的联系信息
    var that = this;
    that.setData({
      'dialog.isDialogShow':true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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