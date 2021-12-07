const app = getApp();
// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先发一个login确认有没有注册过
    wx.login({
      success:res=>{
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

            let {
              openId,
              registered,
              code : status
            } = res2.data.data;
            wx.setStorageSync( 'openid' , openId);
            wx.setStorageSync('registered', registered);
            wx.setStorageSync("token", res2.cookies[0]);
            if(status == 'registered'){// 完成了统一身份认证
              if(res2.data.data.jirenMsgNum>0){
                app.globalData.noticeNum = res2.data.data.jirenMsgNum
              }
              wx.switchTab({
                url: '/pages/jishi/main',
              })
            }else if(status == 'blocked'){ // 用户被禁言
              wx.redirectTo({
                url: '/pages/welcome/blocked',
              })
            }else if(status == 'notRegistered'){ // 跳转同一身份登陆
              wx.redirectTo({
                url: './check',
              })
            }
          }
        })
      }
    })

  }
})