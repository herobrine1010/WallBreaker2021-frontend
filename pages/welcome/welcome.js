const app = getApp();

import {request} from "../../request/request"

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
    let pLogin = new Promise((resolve, reject) => {
      wx.login({
        success: (result) => {
          resolve(result)
        },
        fail: (res) => {
          reject(res);
        },
      })
    });

    // 
    let pLoginResult = pLogin.then(res => {
      return request({
        data:{
          "code" : res.code
        },
        url: '/user/login',
        method:'POST',
        header:{
          'content-type':'application/json'
        },
      })
    })

    let pTime = new Promise(resolve => {
      setTimeout(() => {
        resolve('timeArrive')
      }, 2000);
    })

    Promise.all([pLoginResult, pTime])
    .then(res => {
      res = res[0];
      let {
        openId,
        registered,
        code : status
      } = res.data.data;
      wx.setStorageSync( 'openid' , openId);
      wx.setStorageSync('registered', registered);
      wx.setStorageSync("token", res.cookies[0]);
      if(status == 'registered'){// 完成了统一身份认证
        if(res.data.data.jirenMsgNum>0){
          app.globalData.noticeNum = res.data.data.jirenMsgNum
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
    })
    .catch(err => {
      console.log(err);
    })



    // wx.login({
    //   success:res=>{
    //     wx.request({
    //       data:{
    //         "code":res.code,
    //       },
    //       url: app.globalData.url+'/user/login',
    //       method:'POST',
    //       header:{
    //         'content-type':'application/json'
    //       },
    //       success:function(res2){

    //         let {
    //           openId,
    //           registered,
    //           code : status
    //         } = res2.data.data;
    //         wx.setStorageSync( 'openid' , openId);
    //         wx.setStorageSync('registered', registered);
    //         wx.setStorageSync("token", res2.cookies[0]);
    //         if(status == 'registered'){// 完成了统一身份认证
    //           if(res2.data.data.jirenMsgNum>0){
    //             app.globalData.noticeNum = res2.data.data.jirenMsgNum
    //           }
    //           wx.switchTab({
    //             url: '/pages/jishi/main',
    //           })
    //         }else if(status == 'blocked'){ // 用户被禁言
    //           wx.redirectTo({
    //             url: '/pages/welcome/blocked',
    //           })
    //         }else if(status == 'notRegistered'){ // 跳转同一身份登陆
    //           wx.redirectTo({
    //             url: './check',
    //           })
    //         }
    //       }
    //     })
    //   }
    // })

  }
})