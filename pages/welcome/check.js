// pages/welcome/check.js

import { request } from "../../request/request.js"

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isUserAgree : false,
    
  },


  onLogin(){
    let isUserAgree = this.data.isUserAgree;
    if(isUserAgree){
      wx.getUserProfile({
        desc: '获取您的信息用于注册账号~', 
        success: (res) => {
          var myInfo =res.userInfo
          wx.login({
            success:res=>{
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
                  'content-type':'application/json',
                  'cookie':app.globalData.token
                },
                success: res => {
                  let openid = res.data.data.openId;
                  wx.navigateTo({
                    // url: `./welcome-new?openid=${openid}`,
                    url : `./webView?openid=${openid}`
                  })
                }
              })
            }
          })
    
        },
        fail:(err) => {
          wx.login({
            success:res=>{
              wx.request({
                data:{
                  "code":res.code,
                  "nickName":'默认昵称',
                  // "gender":myInfo.gender,
                  "avatarUrl":'../../static/icon/default-user-big.png'
                },
                url: app.globalData.url+'/user/login',
                method:'POST',
                header:{
                  'content-type':'application/json'
                },
                success: res => {
                  let openid = res.data.data.openId;
                  wx.redirectTo({
                    // url: `./welcome-new?openid=${openid}`,
                    url : `./webView?openid=${openid}`
                  })
                }
              })
            }
          })
        },
      })

    }else{
      wx.showToast({
        title: '请勾选同意许可~',
        icon:'error'
      })
    }

  },

  onCheckboxChange(e){
    let result = e.detail.value;
    if(result.length > 0){
      this.setData({
        'isUserAgree' : true
      })
    }else{
      this.setData({
        'isUserAgree' : false
      })
    }
  }

})