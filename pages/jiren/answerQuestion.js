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


    //调试用
    console.log("form的submit的数据",answerList)
  },
  isMaxlength: function(e) {
    var textLength = e.detail.value.length
    console.log(textLength)
    if (textLength==50)
    {
      this.setData({
        maxlengthMessage: "字符数已达上限！"
      })
    }



  }

})