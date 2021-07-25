// app.js
App({
  //onLaunch函数在小程序初始化完成后触发，全局只触发一次。
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      // success: res => {
      //   // 发送 res.code 到后台换取 openId, sessionKey, unionId
      //   if(res.code){
      //     wx.request({
      //       method: "POST",
      //       url: 'http://localhost:8080/user/login',
      //       data:{
      //         code:res.code
      //       },
      //       header:{
      //         'content-type':'application/json'
      //       },
      //       success(res){
      //         console.log("openid:"+res.data.openid);
      //         if(res.data.openid!="" || res.data.openid!=null){
      //           //success
      //           wx.setStorageSync('openid',res.data.openid);
      //           wx.setStorageSync('session_key',res.data.session_key);
      //         }else{
      //           console.log("failed");
      //           return false;
      //         }
      //       }
      //     })
      //   }else{
      //     console.log('get info failed'+res.errMsg)
      //   }
      // }
    })
    console.log("onLaunchFinished")
  },
  onShow(){
    console.log("this is on show")
    //onShow在小程序启动，或者从后台进入前台后触发
  },
  onHide(){
    //小程序从前台进入后台时触发
  },
  onError(){
    //小程序发生脚本错误或者API报错时触发。
  },
  globalData: {
    userInfo: null,
    personalManagementOrCollection:0,
    url:'http://101.132.130.199:8080'
    // url:'http://localhost:8080'
  }
})
