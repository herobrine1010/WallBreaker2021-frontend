// pages/jiren/answerQuestion.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isDialogShow: false,
    dialogContent: "确认提交回答吗？",
    dialogTip: "",
    dialogCancelText: "取消",
    dialogOkText: "确认",

    questionList: [
      {
        question:
          "问题1示例问题示例问题示例问题示例问题问题1示例问题示例问题示例问题示例问题问题1示例问题示例问题示例问题示例问题题示例问题题示例问题?",
        answer: "",
        textLength: 0,
        showCount: false,
        showWarning: false
      },
      {
        question: "问题2示例问题示例问题示例问题示例问题",
        answer: "",
        textLength: 0,
        showCount: false,
        showWarning: false
      },
      {
        question: "问题3示例问题示例问题示例问题示例问题",
        answer: "",
        textLength: 0,
        showCount: false,
        showWarning: false
      },
      {
        question: "问题4示例问题示例问题示例问题示例问题",
        answer: "",
        textLength: 0,
        showCount: false,
        showWarning: false
      },
      {
        question: "问题5示例问题示例问题示例问题示例问题",
        answer: "",
        textLength: 0,
        showCount: false,
        showWarning: false
      },
      {
        question: "问题6示例问题示例问题示例问题示例问题",
        answer: "",
        textLength: 0,
        showCount: false,
        showWarning: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.enableAlertBeforeUnload({
      message: "您确定要退出吗？",
      success: function (res) {},
      fail: function (errMsg) {}
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title : '欢迎注册使用济星云小程序！',
      path : '/pages/welcome/welcome?sharedPage=/pages/jiren/guide-new&tabbar=0'
    }
  },

  tapTextArea: function (e) {},
  checkLength: function (e) {
    const that = this;

    const currentIndex = e.currentTarget.dataset.index;
    this.data.questionList.forEach((item, i) => {
      // 手动遍历列表
      if (Number(i) == currentIndex) {
        // 找到当前事件对应的列表元素
        const setShowWarning = "questionList[" + i + "].showWarning";
        // var setShowCount = "list[" + i + "].showCount";
        if (e.detail.value.length >= 50) {
          that.setData({
            [setShowWarning]: true
            // [setCount]: true
          });
        } else {
          that.setData({
            [setShowWarning]: false
            // [setCount]: true
          });
        }
      }
    });
  },

  tapOk: function (e) {
    wx.showToast({
      title: "成功提交！",
      icon: "none",
      duration: 1000
    });
  },
  tapSubmit: function (e) {
    this.setData({ isDialogShow: true });
  }
});
