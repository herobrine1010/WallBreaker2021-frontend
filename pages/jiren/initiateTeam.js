// pages/jiren/initiateTeam.js
const app = getApp();
const util = require('../../utils/util.js');
const FormData = require('../../lib/wx-formdata-master/formData.js'); //实现文件上传
import { request } from "../../request/request.js";

//获取日期字符串2021-4-23
function getDateStringFromNow(days) {
  /*
  获取相对当前时间days天之后的日期，days为负表示过去,days为0用作格式化日期
  return: string '2022-3-5'
  */
  let date = new Date(); 
  // date对象会自动进位，无需处理异常
  let futureDateNum = date.getDate() + days;
  date.setDate(futureDateNum);
  // util提供的formatDate格式为"2020/8/7 20:34:45" 但小程序picker需要2020-8-7 以下使用字符串截取和正则表达式做格式转换，2020/8/7转化为2020-8-7
  let dateString = util.formatTime(date).split(' ')[0].replace(/[/]/g,'-')
  return dateString;
}

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
    //截止时间
    startDate: getDateStringFromNow(0),
    dueDate: getDateStringFromNow(7), // 默认截止时间为一周后
    dueTime: '23:59',
    //需求人数
    memberNumberOptions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    memberNumber: '5',
    //组队标题
    teamTitle: '',
    //组队内容
    teamContent: '',
    // 提示列表
    formTips: {},
    //是否需要申请者回答问题
    isNeedQuestion: false,
    //需要申请者回答的问题
    questionList: [{
      id: 1,
      content: '这是问题1'
    }],
    // -----------用于调整scroll-view的数据----------
    firstTipId: '',
    toBottomImg: 0,
    //------------确认提交的弹窗，用于渲染------------
    isDialogShow:false,
    dialogContent:"确认发起组队吗？",
    dialogTip:"",
    dialogCancelText:"取消",
    dialogOkText:"确认",
    tapOkEvent:"tapOkForTeamSubmit",
    page_attribute:{},
  },
  onLoad() {
    this.page_attribute = JSON.parse(JSON.stringify(app.globalData.user_attribute))
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
  onShareAppMessage: function () {
    return {
      title : '欢迎注册使用济星云小程序！',
      path:app.getSharedUrl()
    }
  },
  onShow(){
    wx.reportEvent("jiren_initiateteam_onshow", app.globalData.user_attribute)
  },

  //------四个选择框的改变函数，用于初始化选择框选项、获得用户选择数据------
  dropdownChange: function (e) {
    this.setData({
      theme: e.detail
    })
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

  // -----------操作问题列表的函数------
  //是否需要申请者回答问题
  switchQuestion: function () {
    this.setData({
      isNeedQuestion: !this.data.isNeedQuestion,
      // 重置问题列表
      questionList: [{
        id: 1,
        content: '这是问题1'
      }],
    })
  },
  //增添删除问题的逻辑
  append: function () {
    this.data.questionList.push({id: this.data.questionList.length+1, content: ''});
    this.setData({
      questionList: this.data.questionList
    })
  },
  deleteLast: function () {
    this.data.questionList.pop();
    this.setData({
      questionList: this.data.questionList
    })
  },
  // ---------用户上传删除图片的处理函数---------------
  userImageChange: function (e) {
    let imgPath = e.detail;
    let id = e.currentTarget.id;
    // TODO 数据处理，替换selectComponent

    // 跳转到加号点击处
    // 注：貌似由于视图层更新的原因，直接setData调整滚动条位置失效，只能放在延时后
    // setTimeout(()=>{this.setData({toBottomImg: 600});},100);
  },
  // ---------校验表单input数据的两个函数---------
  // 校验input长度是否超过上限
  checkLength: function (e) {
    let textLength = e.detail.value.length;
    let id = e.currentTarget.id;
    // 三目表达式判断输入框字符数是否过长
    this.data.formTips[id] = textLength==25 ? "字符数已达上限!" : '';
    this.setData({
      formTips: this.data.formTips
    });
  },
  // 校验textarea长度是否超过上限
  checkContentLength: function (e) {
    let textLength = e.detail.value.length;
    let id = e.currentTarget.id;
    // 三目表达式判断输入框字符数是否过长
    this.data.formTips[id] = textLength==500 ? "字符数已达上限!" : '';
    this.setData({
      formTips: this.data.formTips
    });
  },
  // 检查表单input、textarea、question是否有空项，目前是写死的函数，只针对此页面
  checkForm: function (form) {
    let formTips = {}; 
    let flag = true;
    if (form['teamTitle'].trim() == '') {
      formTips['teamTitle'] =  "组队标题未填写！";
      flag = false;
    }
    if (form['teamContent'].trim() == '') {
      formTips['teamContent'] =  "组队内容未填写！";
      flag = false;
    }
    let index = 1;
    for (let key in form) {
      // 问题的key都是数字
      if (key.match(/\d+/) && form[key].trim()=="") {
        formTips[key] =  "该项问题未填写！";
        flag = false;
        index = index + 1;
      }
    }
    this.setData({
      formTips
    });
    return flag;
  },
  
  // -------有关数据提交的函数---------
  //获取、调整、校验表单数据
  teamInfoSubmit:function(e) {
    
    var form = e.detail.value;
    //在这里做数据判空
    // 校验表单
    if (!this.checkForm(form)) {
      // 转到表单未填写处
      this.data.firstTipId = Object.keys(this.data.formTips)[0];
      this.setData({
        firstTipId: this.data.firstTipId
      })
      return;
    }
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
    };
    this.setData({
      dialogContent:"确认发起组队吗？",
      dialogTip:"",
      dialogCancelText:"取消",
      dialogOkText:"确认",
      tapOkEvent:"requestSubscribeMessage",
      isDialogShow:true,
      payload: payload,
    });
  },

  requestSubscribeMessage:function(){
    let that=this
    let tmpId='zw9cJ9Z9vTvOAzprBzzJ1W0K8qS5wxq-tj6PgEalRfc'
    wx.requestSubscribeMessage({
      tmplIds: [tmpId],
      success (res) {
        let result;
        if(res[tmpId]=='accept')
          result=true
        else if(res[tmpId]=='reject')
          result=false
        let payload=that.data.payload
        payload.agreeReceiveMsg=result
        that.setData({payload})
        that.inititalizeTeam()
      }
    })
  },

  //弹窗点按确认，完成图片上传、表单提交(用Promise实现先后顺序)
  inititalizeTeam:function(e){
    var that = this;

    this.page_attribute["team_label_id"] = that.data.payload.labelId || 0
    wx.reportEvent("jiren_initiateteam_inititalizeteam", this.page_attribute)

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
         
      },
      data : data.buffer
    }).then(res => { //上传图片成功的回调
      wx.hideLoading(); //图片上传成功后隐藏加载框
      if(res.statusCode >=200 && res.statusCode <=300) {
        // 拿到上传后的图片ossURL
        let imageURL = res.data.data;
        // 分割字符串获得头图，如果firstImgURL包含多个http链接，济人首页图片无法正常加载
        let firstImgURL = imageURL.split(',',1)[0];
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
             
          },
          data: that.data.payload,
        }).then( res => {
            if(res.data.msg == 'sensitive'){ // 敏感词
              wx.showToast({
                title: '内容包含敏感词',
                icon: 'error',
                duration: 1000
              })
            }else if (res.data.success && res.statusCode==200) { // 有微信号，可以发起组队
              wx.showToast({
                title: '组队招募\n已发布成功',
                icon: 'none',
                duration: 1000
              })
              wx.reportEvent("jiren_initiateteam_inititalizeteam_success", this.page_attribute)
              wx.navigateBack(); //组队成功后返回上一页

            }
            else if(res.data.msg == 'noWxId'){  // 无微信号，跳转填写个人资料
              that.setData({
                dialogContent:"请完善微信号~",
                dialogTip:"填写微信号可以更好地使用组队功能，保证微信号只有队伍成员可见！",
                dialogCancelText:"取消组队",
                dialogOkText:"填写微信号",
                tapOkEvent:"tapOkForAddWxId",
                tapCancelEvent:"tapCancelForAddWxId",
                isDialogShow:true,
              });
            }else if(res.data.msg == "当前用户已被禁言"){
              that.setData({
                dialogContent:"您已被禁言！",
                dialogTip:"您因违规行为暂被禁言，如需申诉请联系 TongjiPoby@163.com",
                dialogCancelText:"取消",
                dialogOkText:"确定",
                tapOkEvent:"hideDialog",
                tapCancelEvent:"hideDialog",
                isDialogShow:true,
              });
            }else{  // 其余接口错误（网络不好）
              wx.showToast({
                title: '网络异常，请重试 :(',
                icon: 'none',
                duration: 1000
              });
            }
          })
        }

       else {
        wx.showToast({
          title: '图片上传失败',
          icon: 'error'
        });
      } 
    }).catch( err=> {
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
      console.log("err",err);
    });
  },
  tapOkForAddWxId(){
    wx.navigateTo({
      url: '../personal/personalDetails?source=needWxId',
    })
  },
  tapCancelForAddWxId(){
    this.setData({
      isDialogShow:false,
    })
  },

  hideDialog(){
    this.setData({
      isDialogShow:false,
    })
  }
  
})