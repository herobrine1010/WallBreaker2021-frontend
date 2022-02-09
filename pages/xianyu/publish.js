// pages/xianyu/publish.js
var app=getApp();
import {request} from "../../request/request.js";
import WxValidate from "../../utils/WxValidate"; // 表单验证
const FormData = require('../../lib/wx-formdata-master/formData.js'); //实现文件上传
function mergePathThenUploadImage(imagePath) {
  /* 上传图片的请求封装
  根据图片的本地路径获取的二进制数据,打包为formData形式,之后上传多张图片
  参数：imagePath: 传入图片路径,数组
  返回：promise对象
  */
  var imageData = new FormData();
  for (let i in imagePath) {
    imageData.appendFile("files",imagePath[i])
  }
  var data = imageData.getData();
  var promise = request({
    url : '/team/jirenUploadPhotos',
    method: 'POST',
    header: {
      'content-type': data.contentType,
       
    },
    data : data.buffer
  });
  return promise;
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选中标签列表
    selectedLabelList: [],
    height:'auto',
    //------------确认提交的弹窗，用于渲染------------
    isDialogShow:false,
    dialogContent:"确认发布失物招领吗？",
    dialogTip:"",
    dialogCancelText:"取消",
    dialogOkText:"确认",



    type:'sale',
    typeName:'出售',
    haveEdited:false,
    
    priceInputWidth:12,

    contactTypeRange:['微信','QQ','手机号','邮箱','其他'],
    objectTypeList:['图书','美妆','日用','数码','虚拟商品','出行','其他'],
    zoneList:['四平路校区','彰武路校区','嘉定校区','沪西校区','沪北校区','铁岭校区','线上'],
    detail:{
      // content:'something'
      contactList:[{
        index:-1,
        type:'',
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let typeName
    if(options.type=='sale'){
      typeName='出售'
    }else if(options.type=='need'){
      typeName='求购'
    }
    this.setData({
      type:options.type,
      typeName,
      id:options.id,
      mode:options.mode,
    })
    if(options.mode=='edit'){
      this.initializeAll()
    }else if(options.mode=='new'){
      this.initializeWx()
    }

    this.changeScrollHeight();
    this.initContactType();

    
    let editHistory=wx.getStorageSync('xianyuEditHistory')
    console.log(editHistory)
    if(editHistory){
      this.setData({
        dialog:{
          isDialogShow: true,
          title:'是否恢复上次编辑内容？',
          tapOkEvent:"confirmRestoreEditedContent"
        },
      })
    }
  },
  onUnload:function(e){
    if(this.data.mode=='new'&&this.data.haveEdited){
      wx.setStorageSync('xianyuEditHistory', this.data.detail)
    }
  },
  confirmRestoreEditedContent:function(e){
    let editHistory=wx.getStorageSync('xianyuEditHistory')
    this.setData({detail:editHistory})
    wx.removeStorageSync('xianyuEditHistory')
    this.changePriceInputWidth()
  },
  onShareAppMessage: function () {
    return {
      title : '欢迎注册使用济星云小程序！',
      path:app.getSharedUrl()
    }
  },
  initializeAll:function(e){
    
  },
  initializeWx:function(e){
    console.log('?')
    request({
      url : "/user/myInfo",
      header: {
        'content-type': 'x-www-form-urlencoded',
         
      }
    }).then(res=>{
      let wxId=res.data.data.wxId
      if(wxId){
        this.setData({['detail.contactList']:[{
          index:0,
          type:'微信',
          content:wxId,
        }]})
      }
    })
  },

  goBack:function(e){
    console.log('www')
    if(this.data.mode=='edit'&&this.data.haveEdited){
      this.setData({
        dialog:{
          isDialogShow: true,
          title:'确定离开？',
          content:'本次编辑内容不会保存',
          tapOkEvent:"confirmGoBack"
        },
      })
    }else{
      this.confirmGoBack()
    }
  },

  confirmGoBack:function(e){
    if(getCurrentPages().length>1){
      wx.navigateBack({
        delta: 1
      });
    }else{
      wx.reLaunch({
        url: '/pages/xianyu/main?type={{type}}',
      })
    }
  },

  changeName(e){
    this.setData({
      ['detail.name']:e.detail.value,
      ['errors.name']:e.detail.value.length>=12?'字数已达上线':'',
      haveEdited:true,
    })
  },

  changeContent(e){
    this.setData({
      ['detail.content']:e.detail.value,
      ['errors.content']:e.detail.value.length>=200?'字数已达上线':'',
      haveEdited:true,
    })
  },

  changeObjectType(e){
    this.setData({
      ['detail.typeIndex']:e.detail.value,
      ['errors.type']:'',
      haveEdited:true,
    })
  },

  changeZone(e){
    this.setData({
      ['detail.zoneIndex']:e.detail.value,
      ['errors.location']:'',
      haveEdited:true,
    })
  },

  changeContactType:function(e){
    console.log(e)
    this.setData({
      ['detail.contactList['+e.currentTarget.dataset.index+'].index']:e.detail.value,
      haveEdited:true,
    })
  },
  
  changePrice:function(e){
    let value=e.detail.value
    this.setData({
      ['detail.price']:value,
      haveEdited:true,
    })
    if(value){
      this.setData({['errors.price']:''})
    }
    this.changePriceInputWidth()
  },

  changePriceInputWidth(e){
    let value=this.data.detail.price
    let length;
    if(value){
      length=6+11*value.replace(/[^\x00-\xff]/g, "ab").length
      length-=(value.split('.').length-1)*6  
    }else{
      length=12
    }
    this.setData({
      priceInputWidth:length,
    })
    
  },

  addNewContact:function(e){
    let list=this.data.detail.contactList
    list.push({
      index:-1,
      type:'',
      content:''
    })
    this.setData({['detail.contactList']:list})
  },

  deleteContact:function(e){
    let list=this.data.detail.contactList
    list.splice(e.currentTarget.dataset.index,1)
    this.setData({['detail.contactList']:list})
  },

  formValidation:function(e){
    let errors={}
    let detail=this.data.detail
    if(!detail.name){
      errors.name='该项未填写'
    }
    if(!detail.content){
      errors.content='该项未填写'
    }
    if(!detail.price){
      errors.price='该项未填写'
    }
    if(!detail.typeIndex){
      errors.type='该项未填写'
    }
    if(!detail.zoneIndex){
      errors.location='该项未填写'
    }
    for(let i=0;i<detail.contactList.length;i++){
      if(detail.contactList[i].index==0||detail.contactList[i].content.trim()==''){
        errors.contact='请至少选择一种联系方式'
        break
      }
    }
    this.setData({errors})
    return Object.keys(errors).length
  },

  // haveEdited:function(){
  //   let detail=this.data.detail
  //   if(detail.name||detail.content||detail.price||detail.typeIndex||detail.zoneIndex){
  //     return true
  //   }
  //   return false
  // },
  cancelPublishDetail:function(e){

  },

  publishDetail:function(e){
    this.setData({
      dialog:{
        isDialogShow: true,
        title:'确定发布出售帖子？',
        tapOkEvent:"dialogTapOkForAcceptAllApplications"
      },
    })
    if(this.formValidation()){
      return
    }else{

    }
  },


  initContactType: function() {
      // 初始化联系方式种类，QQ，微信，手机号，从数据库获取数据，修改页面数据
      let that = this;
      request({
        url : "/label",
        header: {
          'content-type': 'x-www-form-urlencoded',
        },
        data: {
          type: "contactType"
        }
      }).then(res => {
        let data = res.data.data;
        // data = data.map(item => item.content);
        data = [{content:'联系方式',id: 0}, ...data];
        that.setData({
          contactType: data,
          contactTypeIndex: 0
        });
        console.log(data)
      })
  },
  initValidate:  function(isLocationRequired) {
    const rules = {
      name: {
        required: true,
        maxlength:24 // input组件设置了maxlength=25, 这里-1才能触发条件
      },
      content: {
        required: true,
        maxlength: 499
      },
      type: {
        required: true,
      },
      location: {
        required: isLocationRequired,
        maxlength:24 
      },
      contactType: {
        required: true,
        isNone: this.data.contactTypeIndex
      },
      contact: {
        required: true,
      },
      selectedLabels: {
        required: true
      }
    }

    const messages = {
      name: {
        required: '该项未填写',
        maxlength:'字符数已达上限!'
      },
      content: {
        required: '该项未填写',
        maxlength:'字符数已达上限!'
      },
      type: {
        required: '该项未填写',
        minlength:'请输入正确的名称'
      },
      location: {
        required: '该项未填写',
        maxlength:'字符数已达上限!'
      },
      contactType: {
        required: '该项未填写',
      },
      contact: {
        required: '该项未填写',
      },
      selectedLabels: {
        required: '请选择标签'
      }
    }
    this.WxValidate = new WxValidate(rules, messages);
    this.WxValidate.addMethod('isNone', (value, param)=>{return param!=0;},'0');
    console.log(this.WxValidate);

  },
  submitForm: function(e) {
    // 这个函数只是用来传递表单数据, 具体的事情在弹窗函数tapOk完成
    let value = e.detail.value;
    value['contactType'] = parseInt(value['contactType']) + 38; // 解析为数字后相加
    this.setData({
      formValue: value,
      isDialogShow: true,
      tapOkEvent : 'tapOk'
    });
  },
  tapOk: function() {
    this.initValidate(this.data.formValue.type==1); // 初始化表单校验 当type==0（物品遗失）时地点可选，当type==1寻找失主时 地点必填
    let formValue = this.data.formValue; // 用户填写的表单数据
    let selectedLabels = this.data.selectedLabelList;

    if(this.WxValidate.checkForm({...formValue, selectedLabels})) {
    // 上传本地图片,拿到oss图片url
    let imagePromise= mergePathThenUploadImage(formValue.allPicPaths);
    wx.showLoading({
      title: '图片上传中',
      mask: true
    });
    imagePromise.then(res => { //上传图片成功的回调
      wx.hideLoading(); //图片上传成功后隐藏加载框z
      if(res.statusCode >=200 && res.statusCode <=300) {
        // 拿到上传后的图片ossURL
        let imageURL = res.data.data;
        // 分割字符串获得头图，如果firstImgURL包含多个http链接，济人首页图片无法正常加载
        let firstImgURL = imageURL.split(',',1)[0];
        // console.log("图片路径",imageURL, firstImgURL);
        // 添加至payload，同时修改对象的属性名以对接接口命名
        formValue.allPicUrl = imageURL;
        formValue.firstPicUrl = firstImgURL;
        return createPostRequest(formValue);
      }
    }).then(res => {
      if(res.statusCode >=200 && res.statusCode <=300 && res.data.success){
        let data = res.data.data;
        let lostFoundId = data.id; // 获取失物招领主键id, 之后添加标签
        return addLabelRequest(lostFoundId, selectedLabels)
      }else if(res.data.msg == "当前用户已被禁言"){

        return Promise.reject("blocked")
      }

    }).then(res => {
      let data = res.data.data;
      // 获取并刷新首页
      let pages = getCurrentPages();
      let prePage = pages[pages.length - 2];
      if(prePage) prePage.onLoad();

      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000,
        success: wx.navigateBack({})
      });
    }).catch(err => {
      if(err == 'blocked'){
        this.setData({
            dialogContent:"您已被禁言！",
            dialogTip:"您因违规行为暂被禁言，如需申诉请联系 TongjiPoby@163.com",
            dialogCancelText:"取消",
            dialogOkText:"确定",
            tapOkEvent:"hideDialog",
            tapCancelEvent:"hideDialog",
            isDialogShow:true,
        })
      }else{
        wx.showToast({
          title: '网络错误',
          icon: 'error',
          duration: 2000
        })
      }

    }) 

  } else {
    let errors = {};
    for (let e of this.WxValidate.errorList) {
      errors[e.param] = e.msg
    }
    this.setData({errors});
  }
  },
  clickToChooseTag:function(){
    let selector = this.selectComponent('#dialog-label-selector');
    selector.openClose(); //不用全局变量,即可弹出关闭dailog筛选标签
    selector.setLabelsSelected();
  },
  labelChanged: function(e) {
    let selectedLabelList = e.detail;
    this.setData({selectedLabelList});
  },
  changeContact: function(e) {
    let index = e.detail.value;
    this.setData({
      contactTypeIndex: index
    })
  },
  changeScrollHeight:function(){
    let windowHeight;
    //设置scroll-view高度
    wx.getSystemInfo({
      success: function (res) {
          windowHeight= res.windowHeight;
      }
    });
    let query = wx.createSelectorQuery();
    query.select('#scroll').boundingClientRect(rect=>{
        let top = rect.top;
        let height=windowHeight-top;
        this.setData({
          height:height+'px',
        });
      }).exec();
      
  },
  hideDialog(){
    this.setData({
      isDialogShow:false,
    })
  }
})