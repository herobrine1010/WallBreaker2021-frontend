// pages/jiren/anwserQuestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxlengthMessage: "",
    questionItems: [
      {
        index: 1,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      }

    ]

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

  submitAnswer: function(e) {
    var answerList = e.detail.value
    console.log("form的submit的数据",answerList)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('getResult', {data: true});
    //调试用
    wx.navigateBack({
      delta: 0,
    });
    wx.showToast({
      title: '申请已提交',
      icon:'success',
      duration:2000
    });
  },
  isMaxlength: function(e) {
    console.log(e);
    var textLength = e.detail.value.length
    console.log(textLength)
    let questions=this.data.questionItems;
    let index=e.target.dataset.index;
    if (textLength==50)
    {
      questions[index].message='字符数已达上限！';
      questions[index].isMaxlength=true;
      this.setData({questionItems:questions})
    }else if(questions[index].isMaxlength==true&&textLength<50){
      questions[index].message='';
      questions[index].isMaxlength=false;
      this.setData({questionItems:questions})
    }
  }
})