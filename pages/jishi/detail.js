// pages/jishi/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like:false,
    title:'破壁者首次文艺汇演来啦！！',
    userAvater:'/static/icon/default-user.png',
    userName:"破壁者1号",
    time:'2021年6月9日    21:40',
    description:"为了增进学院同学对本专业就业领域和就业方向的了解，提升就业技巧，获取就业信息，学院于……",
    pictures:['','','','','','','',''],
    chooseSize:false,
    animationData:{}
  },
  Like:function(){
    this.setData({
      like: true
    })
  },
  cancelLike:function(){
    this.setData({
      like: false
    })
  },

  chooseSezi:function(e){
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation  = wx.createAnimation({
      // 动画持续时间
        duration:200,
        // 定义动画效果，当前是匀速
        timingFunction:'linear'
      })
      // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize:true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function(){
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    },200)
  },
  hideModal:function(e){
    var that = this;
    var animation = wx.createAnimation({
      duration:200,
      timingFunction:'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData:animation.export()
      
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
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