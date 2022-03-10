// components/dialog-box/dialog-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
    },
    content:{
      type:String,
      value:'请填写结束招募理由，\n理由将被队内成员看到。'
    },
    tip:{
      type:String,
      value:'提示：提示提示提示提示，提示提示提示提示提示。'
    },
    hideCancelButton:{
      type:Boolean,
      value:false
    },
    okText:{
      type:String,
      value:'确认'
    },
    cancelText:{
      type:String,
      value:'取消'
    },
    isShow:{
      type:Boolean,
      value:false
    },
    hasInputBox:{
      type:Boolean,
      value: false
    },
    contactList:{
      type:Array,
      value:[]
    
    },
    buttonColor:{
      type:String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    button_color:'#17B2E5'
  },

  lifetimes:{
    attached:function(){
      let buttonColor=this.properties.buttonColor
      if(buttonColor=='purple'){
        this.setData({button_color:'#957D95'})
      }else{
        this.setData({button_color:buttonColor})
      }
    },
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
      this.triggerEvent('tapOk',this.data.detail);
      this.setData({isShow:false});
    },
    finishInput:function(e){
      this.setData({reason:e.detail.value})
    },
    tapCopy:function(e){
      console.log(e)
      wx.setClipboardData({
        data: e.currentTarget.dataset.value,
      })
      this.triggerEvent('tapCopy',this.data.detail);
    },
  }
})
