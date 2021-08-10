// pages/jiren/initiateTeam.js
const app = getApp();
const util = require('../../utils/util.js');
const FormData = require('../../lib/wx-formdata-master/formData.js'); //实现文件上传
import { request } from "../../request/request.js";
// util提供的formatDate格式为2020/8/7 20:34:45 但小程序picker需要2020-8-7 以下使用正则表达式做格式转换
const current = new Date(); //获取当前日期时间
var currentDate = util.formatTime(current).split(' ')[0]; //截取日期2020/8/7

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // -----------用于提交和处理的数据----------
    //需要申请者回答的问题
    question: {},
    //发起组队request的负载
    payload: {},

    // ------------用于渲染页面的数据-----------
    //组队主题
    themeOptions: [],
    //主题下拉框的选中项，最终渲染到框中
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

    //------------确认提交的弹窗，用于渲染------------
    isDialogShow:false,
    dialogContent:"确认发起组队吗？",
    dialogTip:"",
    dialogCancelText:"取消",
    dialogOkText:"确认",

  },
  onLoad() {
    var that = this;
    //获取标签列表，渲染组队主题的选择框
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
  //四个选择框的改变函数，用于初始化选择框选项、获得用户选择数据
  dropdownChange: function (e) {
    this.setData({
      theme: e.detail
    })
    // console.log('选中主题',this.data.theme)
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

  //获取并调整表单数据
  teamInfoSubmit:function(e){
    var form = e.detail.value;
    console.log("表单数据", form)
    // ------调整表单数据格式------
    //把问题聚合成一个对象{"1":"question","2":question}
    var question = {};
    let index  = 1;
    // 遍历form，选带数字的项且非空的放入问题
    for (let key in form) {
      if (key.match(/\d+/) && form[key].trim()!="") {
        question[index] = form[key];
        index = index + 1;
      }
    }
    //用表单数据初始化request的data
    var payload = {
      "labelId": this.data.theme.id,
      "dueMember": form.memberNumber,
      "dueTime": form.dueDate + ' ' + form.dueTime + ':00',
      "title": form.teamTitle,
      "content": form.teamContent,
      "allPicUrl": '',
      "firstPicUrl": '',
      "question": JSON.stringify(question)
    }
    this.setData({
      isDialogShow:true,
      payload: payload,
    });
  },

  //弹窗点按确认，完成图片上传、表单提交(用Promise实现先后顺序)
  tapOk:function(e){
    var that = this;
    // 获取本地图片数据，调用库打包成data
    var imageData = new FormData();
    var imagePath = this.selectComponent('#image-box').image; //获取图片本地路径
    for (let i in imagePath) {
      imageData.appendFile("files",imagePath[i])
    }
    var data = imageData.getData();

    // 上传图片时间太久，显示加载框
    wx.showLoading({
      title: '图片上传中',
      mask: true
    });
    // 开始上传图片
    request({
      url : '/team/jirenUploadPhotos',
      method: 'POST',
      header: {
        'content-type': data.contentType,
        'cookie':wx.getStorageSync("token")
      },
      data : data.buffer
    }).then(res => { //上传图片成功的回调
      wx.hideLoading(); //图片上传成功后隐藏加载框
      //console.log("上传图片的回调res",res);
      if(res.statusCode >=200 && res.statusCode <=300) {
        // 拿到上传后的图片ossURL
        let imageURL = res.data.data;
        let firstImgURL = imageURL.split(',')[0];
        // 添加至payload，同时修改对象的属性名以对接接口命名
        that.data.payload.allPicUrl = imageURL;
        that.data.payload.firstPicUrl = firstImgURL;
        that.setData({
          payload: that.data.payload
        })

        // 发起组队请求
        request({
          url: '/team/initializeTeam',
          method: 'POST',
          header: {
            'content-type': 'application/json',
            'cookie':wx.getStorageSync("token")
          },
          data: that.data.payload,
        }).then( res => {
            //console.log('提交表单返回结果', res.data);
            if (res.data.success && res.statusCode==200) {
              wx.showToast({
                title: '组队招募\n已发布成功',
                icon: 'none',
                duration: 1000
              })
              wx.navigateBack(); //组队成功后返回上一页

            }
            else {
              wx.showToast({
                title: '组队招募提交失败，请重试 :(',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }

       else {
        wx.showToast({
          title: '图片上传失败',
          icon: 'error'
        })
      } 
    }).catch( err=> {
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
      console.log("err",err);
    });
  },
})