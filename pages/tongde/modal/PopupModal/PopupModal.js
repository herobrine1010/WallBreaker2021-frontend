// pages/tongde/modal/PopupModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: String,
      value: '516rpx'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isVisible: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    open() {
      this.setData({
        isVisible : true
      });
    },
    close() {
      this.setData({
        isVisible: false
      });
    },
    _none() {}, // 空函数阻止冒泡
    _preventDefault() {return false;}
  }
})
