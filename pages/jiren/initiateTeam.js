// pages/jiren/initiateTeam.js
const app = getApp();
const util = require('../../utils/util.js');
const FormData = require('../../lib/wx-formdata-master/formData.js'); //实现文件上传
// util提供的formatDate格式为2020/8/7 20:34:45 但小程序picker需要2020-8-7 以下使用正则表达式做格式转换
const current = new Date(); //获取当前日期时间
var currentDate = util.formatTime(current).split(' ')[0]; //截取日期2020/8/7

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //表单数据
    formData: {},

    //组队主题
    themeOptions: [],
    //主题下拉框的选中项
    theme: {},
    //截止时间，使用正则表达式做格式转换2020/8/7转化为2020-8-7
    dueDate: currentDate.replace(/[/]/g,'-'),
    dueTime: '23:59',
    //需求人数
    memberNumberOptions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    memberNumber: 1,
    
    //组队标题
    teamTitle: '',
    //组队内容
    teamContent: '',

    //需要申请者回答的问题
    questionList: [],
    
    //确认提交弹窗
    isDialogShow:false,
    dialogContent:"确认发起组队吗？",
    dialogTip:"",
    dialogCancelText:"取消",
    dialogOkText:"确认",

  },
  onLoad() {
    var that = this;
    wx.request({
      url: app.globalData.url+'/label',
      method: 'GET',
      data: {
        'type': 'jiren'
      },
      success: function(res) {
        var thememList = res.data.data;
        that.setData({
          themeOptions: thememList,
          theme: thememList[0]
        })
      }
    })
  },
  dropdownChange: function (e) {
    this.setData({
      theme: e.detail
    })
    // /console.log('选中主题',this.data.theme)
  },

  bindDateChange: function (e) {
    this.setData({
      dueDate: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      dueTime: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      memberNumber: this.data.memberNumberOptions[e.detail.value]
    })
  },

  //表单提交
  teamInfoSubmit:function(e){
    var formData = e.detail.value;
    console.log("表单数据", formData)
    // ------调整表单数据格式------
    for (let key in formData) {
      if (key.match("question") != null && formData[key] != "") {
        this.data.questionList.push({id:key, content: formData[key]});
      }
    }

    this.setData({
      isDialogShow:true,
      //从微信的form按钮中获得表单数据   
      formData: formData,
      questionList: this.data.questionList
    });
    console.log("questionList", this.data.questionList)
  },
  //弹窗点按确认
  tapOk:function(e){
    var that = this;

    var imageData = new FormData();
    var imagePath = this.selectComponent('#image-box').image; //获取图片本地路径
    for (let i in imagePath) {
      imageData.appendFile("files",imagePath[i])
    }
    var data = imageData.getData();
    wx.request({
      url: app.globalData.url + '/team/jirenUploadPhotos',
      method: 'POST',
      header: {
        "content-type": data.contentType
      },
      data: data.buffer,
      success (res) {
        var imageURL = res.data.data;

        var formData = that.data.formData;
        wx.request({
          url: app.globalData.url + '/team/initializeTeam',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie':wx.getStorageSync("token")
          },
          data: {
            "labelId": that.data.theme.id,
            "dueMember": formData.memberNumber,
            "dueTime": formData.dueDate.replace(/-/g,'/') + ' ' + formData.dueTime,
            "title": formData.teamTitle,
            "content": formData.teamContent,
            "allPicUrl": imageURL,
            "firstPicUrl": imageURL.split(',',1),
            "question": JSON.stringify(that.data.questionList)
          },
          success: function(res) {
            console.log('提交表单返回结果', res.data)
            if (res.data.success) {
              wx.showToast({
                title: '成功提交！',
                icon: 'none',
                duration: 1000
              })
            } else {
              wx.showToast({
                title: '提交失败，请重试 :(',
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      }
    });
  },
})