// pages/tongde/creatPost.js
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
function createPostRequest(formValue) {
  /*  发布失物招领的请求封装
  参数：失物招领所需表单数据,对象{'key':'value'}
    data: {
      "allPicUrl": "https://oss.url/pic1.png,https://oss.url/pic2.jpg",
      "firstPicUrl": "https://oss.url/pic1.png",
      "contactType": 36,
      "contact": "783592285@qq.com",
      "content": "失物招领描述",
      "location": "测试地点",
      "name": "测试物品名称",
      "type": 0
      }
  返回： 发布失物招领的Promise对象 
  */
  var promise = request({
    url: '/lostfound/initializeLostFound', 
    header: {
      'content-type': 'application/json',
       
    },
    method : 'POST',
    data: formValue
  });
  return promise;
};
function addLabelRequest(lostFoundId, labels) {
  /* 给帖子添加标签的请求封装
  参数: lostFoundId-失物招领主键id  labels-标签列表, 形如:
  [
    {
      "content": "",
      "createTime": "",
      "deleted": true,
      "id": 0,
      "selected": true,
      "type": "",
      "updateTime": ""
    },
    {

    }
  ]
  返回: 添加标签请求的promise对象
  */
  var promise = request({
    url: '/lostfound/editMyLostFoundLabel/' + lostFoundId,
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    data: labels
  });
  return promise;
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有类型标签列表
    labelList: [
      {
        "id": 26,
        "createTime": "2021-08-20 00:13:57",
        "updateTime": "2021-08-20 00:13:57",
        "content": "水杯",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 27,
        "createTime": "2021-08-20 00:16:04",
        "updateTime": "2021-08-20 00:16:04",
        "content": "雨伞",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 28,
        "createTime": "2021-08-20 00:16:04",
        "updateTime": "2021-08-20 00:16:04",
        "content": "证件",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 29,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "耳机",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 30,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "钥匙",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 31,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "钱包",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 32,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "数码",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 33,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "衣服",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 34,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "眼镜",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 35,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "文具",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 36,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "书籍",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 37,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "其他",
        "type": "tongde",
        "deleted": false,
        "selected": null
      }
    ],
    // 选中标签列表
    selectedLabelList: [],
    height:'auto',
    //------------确认提交的弹窗，用于渲染------------
    isDialogShow:false,
    dialogContent:"确认发布失物招领吗？",
    dialogTip:"",
    dialogCancelText:"取消",
    dialogOkText:"确认",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查页面类型
    const {isIdCard} = {...options};
    this.setData({
      isIdCard
    })
    if(isIdCard==1) {
      // 选中标签 ‘#证件’
      this.setData({
        selectedLabelList: [{
          content: '证件',
          id: 28
        }]
      })
      // 禁用选择标签
      this.clickToChooseTag = () => {
        wx.showToast({
          title: '已选择标签',
        })
      };
    }
    this.changeScrollHeight();
    this.initContactType();
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
  onShareAppMessage: function () {
    return {
      title : '欢迎注册使用济星云小程序！',
      path:app.getSharedUrl()
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
      ownerUserSid: {
        required: true,
        digits: true
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
      ownerUserSid: {
        required: '该项未填写',
        digits: '学号格式不正确'
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