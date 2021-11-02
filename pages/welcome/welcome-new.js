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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        //先发一个login确认有没有注册过
        wx.login({
          success:res=>{
            console.log(res.code)
            wx.request({
              data:{
                "code":res.code,
              },
              url: app.globalData.url+'/user/login',
              method:'POST',
              header:{
                'content-type':'application/json'
              },
              success:function(res2){
                console.log(res2);
                if(res2.data.data.code=="login"){
                  wx.setStorageSync("token", res2.cookies[0])
                  if(res2.data.data.jirenMsgNum>0){
                    app.globalData.noticeNum = res2.data.data.jirenMsgNum
                  }
                  wx.switchTab({
                    url: '/pages/jishi/main',
                  })
                }
                else if(res2.data.data.code=="blocked"){
                  console.log("已被封号");
                  wx.redirectTo({
                    url: '/pages/welcome/blocked',
                  })
                }
                else if(res2.data.data.code="needInfo"){
                  console.log("提示用户允许获取个人信息")
                }
              }
            })
          }
        })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
      request({
        url : `/verificationCode/send/${mail}`,
        method : 'GET',
        header: {
          "content-type": 'application/x-www-form-urlencoded'
        },
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

    wx.getUserProfile({
      desc: '获取用户信息的文案 待修改', 
      success: (res) => {
        var myInfo =res.userInfo
        console.log(myInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        wx.login({
          success:res=>{
            console.log(res.code)
            wx.request({
              data:{
                "code":res.code,
                "nickName":myInfo.nickName,
                "gender":myInfo.gender,
                "wxAvatarUrl":myInfo.avatarUrl,
                "avatarUrl":myInfo.avatarUrl
              },
              url: app.globalData.url+'/user/login',
              method:'POST',
              header:{
                'content-type':'application/json'
              },
              success:function(res2){
                console.log(res2);
                if(res2.data.data.code=="register"){
                  wx.setStorageSync("token", res2.cookies[0])
                  wx.showToast({
                    title: '注册成功！',
                    icon:'success'
                  })
                  wx.switchTab({
                    url: '/pages/jishi/main',
                  })
                }else{
                  console.log("看下哪有问题")
                  console.log(res2)
                }
              }
            })
          }
        })
    

      }
    })
    // 1.完成邮箱认证；2.获取用户头像、昵称信息
    // {mail: "222", vertifyNum: "456"}
    let mail = e.detail.value.mail;
    let mailLength = mail.length;
    let vertifyNum = e.detail.value.vertifyNum;
    let vertifyLength = vertifyNum.length;
    if(mailLength>0 && vertifyLength>0){
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