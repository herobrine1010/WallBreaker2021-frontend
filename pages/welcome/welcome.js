const app = getApp();

import {request, login} from "../../request/request"

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
    }).then(res => {
      return login(res.code);
    });

    

    let pTime = new Promise(resolve => {
      setTimeout(() => {
        resolve('timeArrive')
      }, 2000);
    })

    Promise.all([pLogin, pTime])
    .then(res => {
      res = res[0];
      let {
        openId,
        registered,
        code : status
      } = res.data.data;
      app.globalData.token = res.cookies[0];
      app.globalData.openId = openId;
      app.globalData.registered = registered;

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

  }
})