// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionTitle : "",
    leftButtonTitle : "",
    rightButtonTitle : "",
    //默认初试选择左边 帖子按钮 
    isNoticeOrTeam : 0,
    background : "backgroundLeft",
    btnColor1 : "btnColorLeft",
    btnColor2 : "btnColorUnselected",

    jirenItemList:[
      {
      'labelText':'未分类',
      'title':'示例标题示例标题示例标题…',
      'rightTagBackgroundClass':'rightTagColorRefuse',
      'rightTagText':'申请未通过',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'initiator':'发起人: 示例用户',
      'badgeType':'我发起的',
      'peopleCount':'3/5',
      'postingPic':''
    },
    {
      'labelText':'熬夜秃头',
      'title':'示例标题示例标题示例标题…',
      'rightTagBackgroundClass':'rightTagColorMine',
      'rightTagText':'我已入队',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'initiator':'发起人: 示例用户',
      'badgeType':'我发起的',
      'peopleCount':'3/5',
      'postingPic':''
    },
    {
      'labelText':'熬夜秃头',
      'title':'示例标题示例标题示例标题…',
      'rightTagBackgroundClass':'',
      'rightTagText':'',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'initiator':'发起人: 示例用户',
      'badgeType':'我发起的',
      'peopleCount':'0/5',
      'postingPic':''
    }
  ],
    jishiItemList : [
      {
        'labelText':'教务',
        'title':'学生评学评教通知',
        'rightTagText':'',
        'userName':'新生院张老师',
        'publishTime':'2天前',
        
        'description':'请大家登陆1.tongji.edu.cn，尽快完成评学评教！',
        'postingPic':''
      },
      {
        'labelText':'活动',
        'title':'十大歌手领票',
        'rightTagText':'我发布的',
        'userName':'学生会小王',
        'publishTime':'1天前',
        'description':'这是一段描述性文字，仅用于测试。这是一段……',
        'postingPic':''
      }
    ]
  },
//以下两个事件为：点击帖子(收藏或管理)按钮，或者点击组队(收藏或管理)按钮.
//切换按钮颜色、页面背景；
  onLeftNoticeBtnTap:function(){
    this.setData({
      isNoticeOrTeam : 0,
      background : "backgroundLeft",
      btnColor1 : "btnColorLeft",
      btnColor2 : "btnColorUnselected"
    })
  },
  onRightTeamBtnTap:function(){
    this.setData({
      isNoticeOrTeam : 1,
      background : "backgroundRight",
      btnColor1 : "btnColorUnselected",
      btnColor2 : "btnColorRight"
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
    // 1.首先判断是 组队管理页面 还是 我的收藏页面
    let app = getApp();
    if(app.globalData.personalManagementOrCollection === 0){
      this.setData({
        collectionTitle : "帖子·组队管理",
        leftButtonTitle : "我的帖子",
        rightButtonTitle : "我的组队"
      })
    }
    else if(app.globalData.personalManagementOrCollection === 1){
      this.setData({
        collectionTitle : "我的收藏",
        leftButtonTitle : "帖子收藏",
        rightButtonTitle : "组队收藏"
      })
    }

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