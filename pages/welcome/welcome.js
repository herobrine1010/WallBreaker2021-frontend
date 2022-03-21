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
    console.log(options)
    let sharedPage=app.globalData.sharedPage
    if(!sharedPage&&options.sharedPage){
      app.globalData.sharedPage=options.sharedPage
    }

    //先发一个login确认有没有注册过
    let pLogin = new Promise((resolve, reject) => {
      wx.login({
        success: (result) => {
          resolve(result)
          // console.log('Login __________________________');
        },
        fail: (res) => {
          reject(res);
        },
      })
    }).then(res => {
      wx.showLoading({
        title: '登录中...',
      })
      return new Promise((resolve,reject)=>{
        wx.request({
          url :app.globalData.url + '/user/login',
          header : {
            'content-type':'application/json'
          },
          data : {
            "code" : res.code
          },
          method:'POST',
          success : (result)=>{
            resolve(result);
          },
          fail : (error) => {
            reject(error);
          }
        })
      })
    });

    

    let pMinTime = new Promise(resolve => {
      setTimeout(() => {
        resolve('timeArrive');
      }, 2000);
    })


    let pAll = Promise.all([pLogin, pMinTime]);

    pAll
    .then(res => {
      wx.hideLoading();
      // console.log('request_________________________________________');
      res = res[0];
      if(res.statusCode == 401 || res.statusCode == 502){
        wx.showToast({
          title: '服务器维护',
          icon : 'error'
        })
      }
      console.log(res);
      let {
        openId,
        registered,
        code : status
      } = res.data.data;
      app.globalData.token = res.cookies[0];
      app.globalData.openId = openId;
      app.globalData.registered = registered;

      //向全局维度中传入用户的维度值
      //ToDo，在可修改维度处,同时更改全局维度值
      app.globalData.user_attribute['user_status'] = res.data.data.code || 'unknown'
      app.globalData.user_attribute['user_school'] = res.data.data.school || 'unknown'
      app.globalData.user_attribute['user_identification'] = res.data.data.identification || 'unknown'
      app.globalData.user_attribute['user_grade'] = res.data.data.grade || 0
      console.log('the user_attribute is below')
      console.log(app.globalData.user_attribute)
      //上报welcome_welcome_onload埋点
      wx.reportEvent("welcome_welcome_onload", app.globalData.user_attribute)
      // console.log(' setData__________________________________');
      if(status == 'registered'){// 完成了统一身份认证
        if(res.data.data.jirenMsgNum>0){
          app.globalData.noticeNum = res.data.data.jirenMsgNum
        }
        
        let sharedPage=app.globalData.sharedPage
        if(sharedPage){
          app.globalData.sharedPage=undefined
          // let page=sharedPage.replace('●','?').replace('◆','&')
          let page = app.decodeSharedUrl(sharedPage)
          wx.reLaunch({
            url: page,
          })
        }else{
          wx.switchTab({
            url: '/pages/index/index', // 跳转首页
          })            
        }
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

  },

  onShow(){
    wx.reportEvent("welcome_welcome_onshow", app.globalData.user_attribute)
    //onShow在小程序启动，或者从后台进入前台后触发
  },
})