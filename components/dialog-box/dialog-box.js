// components/dialog-box/dialog-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:{
      type:String,
      value:'请填写结束招募理由，\n理由将被队内成员看到。'
    },
    tip:{
      type:String,
      value:'提示：提示提示提示提示，提示提示提示提示提示。'
    },
    okText:{
      type:String,
      value:'确认'
    },
    cancelText:{
      type:String,
      value:'取消'
    },
    hideCancelButton:{
      type:Boolean,
      value:false,
    },
    isShow:{
      type:Boolean,
      value:false
    },
    hasInputBox:{
      type:Boolean,
      value: false
    },
    isShowInfo:{
      type:Boolean,
      value:false
    },
    infoDetail:{
      type:Object,
      value:{
        Key:'微信',
        Value:'1289uasdj',
        copyEnable:true,
      }
    
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
      this.setData({isShow:false});
      // if(this.data.hasInputBox&&!this.data.reason){return}
    },
    tapOk:function(e){
      // var t=e.currentTarget.dataset;
      if(this.data.hasInputBox){
        if(!this.data.reason)return
        this.triggerEvent('tapOk',this.data.detail);
        this.setData({isShow:false})
      }else{
        this.setData({
          isShow:false,
          hideCancelButton:false,
        });
        this.triggerEvent('tapOk',this.data.detail);
      }      
    },
    finishInput:function(e){
      this.setData({reason:e.detail.value})
    },
    tapCopy:function(e){
      this.triggerEvent('tapCopy',this.data.detail);
    },
  }
})
