import {request} from "../../request/request.js";
// components/dialog-box/dialog-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:''
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
    buttonColor:{
      type:String,
      value:'',
    },
    

    /** 举报功能新增变量  */
    reportSource:{
      type:String,
      value:'',
    },
    reportSourceId:{
      type:Number,
      value:0,
    },
    hideOkButton:{
      type:Boolean,
      value:false
    },
    hideCancelButton:{
      type:Boolean,
      value:false
    },
    inputPlaceholder:{
      type:String,
      value:'请详细描述申请理由（0~300字）'
    },
    hasPictureBox:{
      type:Boolean,
      value:true
    },
    reportType:{
      type:String,
      value:'账号',
    }

  },
  lifetimes:{
    attached:function(){
      this.setData({button_color:this.properties.buttonColor})
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    step:1,
    reportReason:['违法违规','色情低俗','赌博诈骗','人身攻击',
      '侵犯隐私','敏感词汇','与该板块主题无关','其他'],
    reasonIndex:-1,
    otherReason:'',
    title:'举报原因',
    content:'',
    tip:'',
    tapOk:'tapOk',
    tapCancel:'tapBack',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show:function(){
      this.goToStep(1)
    },
    goToStep:function(step){
      this.setData({step})
      switch(step){
        case 1:
          this.setData({
            isShow:true,
            title:'举报'+this.data.reportType,
            content:'举报原因（必选）',
            hideOkButton:true,
            cancelText:'取消',
          })
          break
        case 2:
          this.setData({
            title:'举报原因',
            content:'',
            hideOkButton:false,
            cancelText:'返回',
            okText:'下一步',
            tapOk:'goToWriteContent',
          })
          break
        case 3:
          this.setData({
            title:'举报理由',
            content:'',
            hideOkButton:false,
            cancelText:'返回',
            okText:'提交',
            tapOk:'publishReport',
          })
      }
    },
    tapBack:function(){
      switch(this.data.step){
        case 1:
          this.setData({isShow:false})
          break
        case 2:
          this.goToStep(1)
          break
        case 3:
          if(this.data.reasonIndex==7){
            this.goToStep(2)
          }else{
            this.goToStep(1)
          }
          break
      }
    },
    goToWriteOtherReason:function(){
      this.setData({
        step:2,
        title:'举报原因',
        content:'',
        hide
      })
    },
    goToWriteContent:function(){
      if(this.data.otherReason.length>2){
        this.goToStep(3)
      }
    },
    tapReason:function(e){
      this.setData({reasonIndex:e.currentTarget.dataset.index})
      if(e.currentTarget.dataset.index!=7){
        this.goToStep(3)
        // this.goToWriteContent()
      }else{
        this.goToStep(2)
        // this.setData({step:2})
      }
    },
    tapCancel:function(e){

      this.triggerEvent('tapCancel',this.data.detail);
      if(this.data.hasInputBox)
      {
        return
      }

      this.setData({isShow:false});
    },
    tapOk:function(e){
      // var t=e.currentTarget.dataset;
      this.triggerEvent('tapOk',this.data.detail);
      if(this.data.hasInputBox&&!this.data.reason){return}
      this.setData({isShow:false});
    },
    changeOtherReasonInput:function(e){
      console.log(e.detail.value)
      this.setData({otherReason:e.detail.value})
    },
    changeContentInput:function(e){
      this.setData({reportContent:e.detail.value})
    },
    publishReport:function(){
      // if(this.data.reportContent.trim()=='')return
      let that=this
      this.selectComponent('#image-group').getImageUploaded().then(res=>{
        console.log(res)
        let data={
          source:this.properties.reportSource,
          sourceId:this.properties.reportSourceId,
          content:this.data.reportContent,
          type:this.data.reasonIndex,
        }
        if(this.data.reasonIndex==7){
          data.specificType=this.data.otherReason
        }
        if(res.firstPicUrl){
          data.picUrl=res.allPicUrl
        }
        request({
          url : '/report/addReport',
          method: 'POST',
          header: {
            'content-type': 'application/json',
          },
          data : data,
        }).then(res=>{
          console.log(res)
          that.setData({isShow:false})
          wx.showToast({
            title: '举报已提交',
            icon:'success',
          })
        });
      })
    },
  }
})
