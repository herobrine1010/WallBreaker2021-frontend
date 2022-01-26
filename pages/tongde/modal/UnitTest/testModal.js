// pages/tongde/modal/UnitTest/testModal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showModal() {
    wx.showModal({
      title: 'a title',
      content: 'popup modal content. Or a line text',
      showCancel: true,
      cancelText:'can',
      cancelColor: '#eee',
      confirmColor: '#555',
      confirmText: 'conf',
      // editable: true,
      success: () => { console.log('confirm')},
      fail: (res) => {console.log('cancel', res)},

    })
  },
  showCustomModal() {
    const vm = this.selectComponent('#popup-modal');
    vm.open();
  }
})