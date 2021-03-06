// pages/welcome/welcome-new.js
import {request} from "../../request/request.js";
const app = getApp();
wx.cloud.init();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownText : '获取验证码',
    hasMail : false,
    isVertifyBolck : false,
    openid: '',
    isSendMail: false,
    isGetPhone: false
  },
  onLoad: function (options) {
    let openid = options.openid;
    this.setData({
      openid
    });
    
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
    var cid = e.detail.cloudID
    console.log(cid)
    if(cid==undefined){
      wx.showModal({
        showCancel:false,
        title: '提示',
        content: '您需要授权手机号来完成注册！',
        success: function(res) {
         if (res.confirm) {
          console.log('用户点击确定')
         }
        }
       })
    }else{
      wx.showLoading({
        title: '正在获取手机号',
        mask: true,
        time:10000
      });
      wx.cloud.callFunction({
        name:"getPhoneNumber",
        data:{
          cloudID:e.detail.cloudID
        }
      })
      .then(res=>{
        var phone = res.result.list[0].data.purePhoneNumber
        this.setData({isGetPhone: true})
        
        wx.cloud.callFunction({
          name: "getOpenId",
          success(res) {        
            console.log(res.result.openid)
            var openId = res.result.openid
            
            request({
              url : '/user/updateUserPhoneByOpenId/' + openId + '/' + phone,
              method : 'GET',
              header: {
                "content-type": 'application/x-www-form-urlencoded'
              },
           }).then(res => {
             wx.showToast({
               title: '授权成功！',
             })
            })
           },
          fail(err) {      
             console.log("获取openid失败:", err)
          }   
        })
        wx.hideLoading({
          success: (res) => {},
        })
      })
    }

  },
  onSubmit(e){
    if(!this.data.isGetPhone) {
      wx.showModal({
        content: '请先完成手机号授权',
        showCancel: false,
      })
      return;
    } 
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
    if(!this.data.isGetPhone) {
      wx.showModal({
        content: '请先完成手机号授权',
        showCancel: false,
      })
      return;
    } 
    request({
      url: '/user/checkMailVerified/' + this.data.openid,
    }).then(res => {
      if(res.data.success) {
        // 已点击流程
        wx.navigateTo({
          url: './welcome',
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