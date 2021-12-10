// pages/tongde/myLost.js

/**
 * 2021-8-19
 * 
 * TODO 
 * >>点击'关闭'按钮时根据帖子的id将对应帖子的状态设为关闭
 * >>点击帖子显示对应帖子内容
 * [需要进一步匹配数据库的设计内容]
 */




Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowClose:true,

    myPostList:[
      {
        'labelText':'雨伞',
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'',
        'closeConditon':false,
      },
      {
        'labelText':'雨伞',
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'a',
        'closeConditon':false,
      },
      {
        'labelText':'雨伞',
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'a',
        'closeConditon':false,
      },
      {
        'labelText':'雨伞',
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'a',
        'closeConditon':false,
      },
      {
        'labelText':'雨伞',
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'a',
        'closeConditon':false,
      },
      {
        'labelText':'雨伞',
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'a',
        'closeConditon':false,
      },
      {
        'labelText':'雨伞',
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'a',
        'closeConditon':false,
      },
    
    ],
    dialog:{
      isDialogShow: false,
      content:'该条信息关闭后不可重启，确定要关闭吗?',
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      isShowInfo:false,
      /*tapOkEvent:"dialogTapOkForAcceptApplying"*/
    },
  },
  tapClose:function(e){
    //关闭帖子，提示是否确认关闭
    var that = this;
    that.setData({
      'dialog.isDialogShow':true,
      
    })
  },
  tapOk:function(e){
    var that = this;
    wx.showToast({
      title: '成功关闭帖子',
    })
    //TODO 根据帖子的id显示关闭按钮
    that.setData({
      'myPostList[0].closeCondition':true
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