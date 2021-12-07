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

  onSubmit(e){

    // 1.完成邮箱认证；2.获取用户头像、昵称信息
    // {mail: "222", vertifyNum: "456"}
    let mail = e.detail.value.mail ;
    let mailLength = mail.length;
    mail +=  '@tongji.edu.cn';
    let vertifyNum = e.detail.value.vertifyNum;
    let vertifyLength = vertifyNum.length;
    if(mailLength>0 && vertifyLength>0){
      request({
        url : '/verificationCode/check',
        method : 'GET',
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
        data:{
          mail ,
          code : vertifyNum 
        }
      }).then(res => {
        console.log(res);
      })
      // 进行邮箱验证；
      // 判断手机号是否授权
      // 返回相应的错误信息


    }else{
      if(mailLength <= 0){
        this.setData({
          isMailWarnShow : true
        })
      }
      if(vertifyLength <= 0){
        this.setData({
          isVertifyWarnShow : true
        })
      }
    } 
    

  }
})