// pages/tongde/modal/Dialog/Dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    content:{
      type:String,
      value:'请填写结束招募理由，\n理由将被队内成员看到。'
    },
    okText:{
      type:String,
      value:'确认'
    },
    cancelText:{
      type:String,
      value:'取消'
    },
    showCancel: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapCancel:function(e){

      this.triggerEvent('tapCancel',this.data.detail);
      this.close();
      // if(this.data.hasInputBox&&!this.data.reason){return}
    },
    tapOk:function(e){
      // var t=e.currentTarget.dataset;
      this.triggerEvent('tapOk',this.data.detail);
      this.close();
    },
    open() {
      const popupModal = this.selectComponent('#popup-modal');
      popupModal.open();
    },
    close() {
      const popupModal = this.selectComponent('#popup-modal');
      popupModal.close();
    }
  }
})
