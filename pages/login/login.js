const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    needRegister: false,
    sessionKey: '',
    openid: '',
    loginLock: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getPhoneNumber (e) {
    console.log(e)
    console.log(e.detail)
    var self = this
    wx.request({
      method: 'POST',
      data: {
        "sessionKey": this.data.sessionKey,
        "iv": e.detail.iv,
        "encryptedData": e.detail.encryptedData
      },
      url: 'http://localhost:8080/user/login',
      success: function(res2){
        console.log(res2)
        wx.request({
          method: "POST",
          url: 'http://localhost:8080/user/login',
          data: {
              "phone": res2.data.phoneNumber,
              "username": app.globalData.userInfo.nickName,
              "openid": self.data.openid,
              "appid":app.globalData.appId,
              "avatar":app.globalData.userInfo.avatarUrl,
          },
          success: function(res3){
            console.log(res3)
            self.setData({
              needRegister: false
            })
            wx.navigateTo({
              // url: '/pages/character/character',
              url:'/pages/loading/loading'
            })
          },
          fail: function(err){
            console.log(err)
          }
          
        })
      },
      fail: function(e){
        console.log(e)
      }
      
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    if(this.data.loginLock)return
    this.setData({
      loginLock: true
    })
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorage({
      data: e.detail.userInfo.gender,
      key: 'gender',
    })
    var self = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorage({
          data: res.code,
          key: 'code',
        })
        wx.request({
          method: 'GET',
          data: {
            code: res.code
          },
          url: 'http://localhost:8080/user/login',
          success: function(res2){
            console.log(res2)
            if(typeof(res2.data) == 'string'){
              console.log(res2.cookies[0])
              wx.setStorageSync("token", res2.cookies[0])
              wx.navigateTo({
                // url: '/pages/character/character',
                url:'/pages/loading/loading'
              })
            } else{
              self.setData({
                sessionKey: res2.data.sessionKey,
                openid: res2.data.openid,
                needRegister: true
              })
            }

            self.setData({
              loginLock: false
            })
          },
          fail: function(e){
            console.log(e)
            self.setData({
              loginLock: false
            })
          }
          
        })
      }
    })
  }
})
