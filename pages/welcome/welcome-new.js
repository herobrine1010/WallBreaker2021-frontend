// pages/welcome/welcome-new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownText : '获取验证码',
    hasMail : false,
    isVertifyBolck : false,

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

  },

  onInputMail(e){
    let mailStr = e.detail.value;
    if(mailStr.length > 0){
      this.setData({
        hasMail : true
      })
    }else{
      this.setData({
        hasMail : false
      })
    }
  },

// 递归设置定时器
  countDown(time,interval = 1,callback){
    let self = this;
    let setSingleTimeout = function(){
      if(time>1){
        time --;
        self.setData({
          countDownText : time +'s'
        })
        setTimeout(setSingleTimeout,interval * 1000)
      }else{
        self.setData({
          countDownText : '获取验证码'
        });
        callback?callback():'';
      }
    };
    setSingleTimeout();    
  },

  getVertifyNum(){
    let self = this;
    if(this.data.hasMail && (!this.data.isVertifyBolck)){
      // 
      wx.showToast({
        title: '已发送',
      });
      this.setData({
        isVertifyBolck : true
      })
      this.countDown(60,1,function(){
        self.setData({
          isVertifyBolck : false
        })
      });
    }
  },

  onSubmit(e){
    console.log(e.detail.value);
    // {mail: "222", vertifyNum: "456"}
    // 进行邮箱验证；
    // 判断手机号是否授权
    // 返回相应的错误信息
  }
})