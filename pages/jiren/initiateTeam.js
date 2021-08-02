// pages/jiren/initiateTeam.js
const app = getApp();
const util = require('../../utils/util.js');
const FormData = require('../../lib/wx-formdata-master/formData.js'); //实现文件上传
const current = new Date(); //获取当前日期
var currentDate = util.formatTime(current).split(' ')[0];

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
    //截止时间
    dueDate: currentDate.replace(/[/]/g,'-'),
    dueTime: '23:59',
    //需求人数
    memberNumberOptions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    memberNumber: 1,
    
    //组队标题
    teamTitle: '',
    //组队内容
    teamContent: '',

    //图片上传oss后拿到的URL
    imageURL: [],

    //是否需要申请者回答问题
    isNeedQuestion: true,
    //需要申请者回答的问题
    questionList: [
      {
        id: 1,
        content: ''
      },
      {
        id: 2,
        content: ''
      }
    ],
    
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
        console.log(res.data.data);
        var thememList = res.data.data;
        that.setData({
          themeOptions: thememList,
          theme: thememList[0]
        })
      }
    })
    //this.setData({themeOptions: tempVaria})
    console.log(this.data.themeOptions)
    
  },
  dropdownChange: function (e) {
    this.setData({
      theme: e.detail
    })
    console.log('选中主题',this.data.theme)
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
  //是否需要申请者回答问题
  switchQuestion: function () {
    this.setData({
      isNeedQuestion: !this.data.isNeedQuestion
    })
  },
  //增添删除回答的逻辑
  append: function () {
    let newList = this.data.questionList
    let length = newList.length
    newList.push({id: length+1, content: ''})
    this.setData({
      questionList: newList
    })

  },
  deleteLast: function () {
    let newList = this.data.questionList
    newList.pop()
    this.setData({
      questionList: newList
    })
  },
  //表单提交
  teamInfoSubmit:function(e){
    this.setData({
      isDialogShow:true,
      //从微信的foem按钮中获得表单数据   
      formData: e.detail.value
    });
    //console.log(e.detail.value)
 
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
        var imageObj = new String(res.data.data); //创建字符串对象，提取首图URL
        console.log('imageURL',imageObj.split(','));

        var formData = that.data.formData;
        console.log("点击确认之后的业务",that.data.dueDate.replace(/-/g,'/'));
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
            "firstPicUrl": imageURL.split(','),     
          },
          success: function(res) {
            console.log('提交表单弹窗', res.data)
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