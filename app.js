// app.js
App({
  //onLaunch函数在小程序初始化完成后触发，全局只触发一次。
  onLaunch() {
    
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  onShow(){
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
    personalManagementOrCollection : 1,

    user_attribute: {},
    // url: 'https://tongji-poby.sparkxyf.com/api'
    // url:'https://jixingyun.tongji.edu.cn/api1'
    url:'https://www.wallbreaker.top'
    // url:'http://localhost:9000'
  },
  getSharedUrl(data={}){
    let pages=getCurrentPages()
    let page=pages[pages.length-1]
    let options={
      ...page.options,
      ...data,
    }
    let params='●'
    for(let key in options){
      params+=key+'='+options[key]+'◆'
    }
    params=params.substring(0,params.length-1)
    return '/pages/welcome/welcome?sharedPage=/'+page.route+params
  },

  decodeSharedUrl(sharedPage){
    let page=sharedPage.replace('●','?').replace('◆','&');
    return page
  }
})
