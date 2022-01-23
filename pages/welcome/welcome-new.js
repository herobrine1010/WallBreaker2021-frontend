// pages/welcome/welcome-new.js
import {request} from "../../request/request.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownText : '获取验证码',
    hasMail : false,
    isVertifyBolck : false,
    openid: '',
    isSendMail: false
  },
  onLoad: function (options) {
    let openid = options.openid;
    this.setData({
      openid
    }, this.checkMailIsClicked);
    // this.checkMailIsClicked()
    
  },
  onInputMail(e){
    let mailStr = e.detail.value;
    if(mailStr.length > 0){
      this.setData({
        hasMail : true ,
        isMailWarnShow : false,
        mail : mailStr
      })
    }else{
      this.setData({
        hasMail : false
      })
    }
  },
  onInputVertify(){
    this.setData({
      isVertifyWarnShow : false
    })
  },


// 递归设置定时器
  countDown(time,interval = 1,callback){
    let self = this;
    let setSingleTimeout = function(){
      if(time>1){
        time --;
        self.setData({
          countDownText : time +'s'
        })
        setTimeout(setSingleTimeout,interval * 1000)
      }else{
        self.setData({
          countDownText : '获取验证码'
        });
        callback?callback():'';
      }
    };
    setSingleTimeout();    
  },

  getVertifyNum(){
    // 发送验证码
    let self = this;
    if(this.data.hasMail && (!this.data.isVertifyBolck)){
      // 
      let mail = this.data.mail + '@tongji.edu.cn';
      console.log(mail);
      // 调用验证码发送接口
      request({
        url : `/verificationCode/send/`,
        method : 'GET',
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
        data:{
          mail
        }
      }).then(res => {
        console.log(res);
      })
      
      wx.showToast({
        title: '已发送',
      });
      this.setData({
        isVertifyBolck : true
      })
      this.countDown(10,1,function(){
        self.setData({
          isVertifyBolck : false
        })
      });
    }
  },
  getPhoneNumber (e) {
    console.log(e.detail.code)
  },
  onSubmit(e){

    // 1.完成邮箱认证；2.获取用户头像、昵称信息
    // {mail: "222", vertifyNum: "456"}
    // 进行邮箱验证；
    // 判断手机号是否授权
    // 返回相应的错误信息
    const sid = e.detail.value.sid; // string
    const openid = this.data.openid;
    if(sid.length > 0){
      // 发送验证邮箱
      wx.showLoading({
        title: '请稍等...',
      })
      request({
        url : '/user/getMailOnRegister/' + openid + '/' + sid,
        method : 'GET',
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
      }).then(res => {
        wx.hideLoading({});
        if(res.data.success) {
          wx.showModal({
            content: '已发送邮件，请前往邮箱完成注册',
            showCancel: false,
          })
          this.setData({
            isSendMail: true
          })
        } else {
          wx.showModal({
            title: '出错了',
            content: `${res.data.msg.split(':')[0]}`,
            showCancel: false,
          })
        }
      })
    }else{
      if(sid.length <= 0){
        this.setData({
          isVertifyWarnShow : true
        })
      }
    }

  },

  checkMailIsClicked() {
    if(this.data.isSendMail!=true) return;
    request({
      url: '/user/checkMailVerified/' + this.data.openid,
    }).then(res => {
      if(res.success) {
        // 已点击流程
        wx.redirectTo({
          url: 'pages/main/jishi',
        })
      } else {
        // 未点击流程
        wx.showModal({
          content: '您还没有验证邮箱, 请前往验证邮箱',
          showCancel: false,
        })
      }
    })
  }
})