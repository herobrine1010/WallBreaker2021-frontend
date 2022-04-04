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

    /**
     * 后端接口根路径。
     * 生产：https://tongji-poby.sparkxyf.com/api
     * 测试：https://www.wallbreaker.top
     */
    url: 'https://tongji-poby.sparkxyf.com/api'
    // url:'https://jixingyun.tongji.edu.cn/api1'
    //  url:'https://www.wallbreaker.top'
    // url:'http://localhost:9000'
  },

  /**
   * 通用分享链接获取工具。页面分享时，统一通过此工具获取链接。
   * 获取到的链接会指向欢迎页，并在欢迎页完成鉴权后跳转到目标页面。
   * 原页面参数可能会被自动保存。
   * 
   * @param data: object?: 需要传递的参数。
   * @param targetPageRoute: String?: 目标页面的路径。若为空，则自动获取来源页面的路径。设置时，不要开头的斜杠。正确的路径串如：'pages/pageA/pageA'.
   */
  getSharedUrl(data={}, targetPageRoute=''){
    let pageRoute = ''
    let options = null
    if (targetPageRoute == '') {
      let pages=getCurrentPages() // 获取当前页面栈
      let page=pages[pages.length-1] // 获取最后一个元素。即：当前页
      pageRoute = page.route
      options={
        ...page.options,
        ...data,
      }
    } else {
      pageRoute = targetPageRoute
      options = {
        ...data
      }
    }

    /**
     * 连接页面进入参数。此处将跳转目标的参数表自动进行如下转换，以防止冲突：
     * ? -> ●
     * & -> ◆
     */
    let params='●'
    for(let key in options){
      params += key + '=' + options[key] + '◆'
    }
    params = params.substring(0, params.length - 1)
    return '/pages/welcome/welcome?sharedPage=/' + pageRoute + params
  },

  decodeSharedUrl(sharedPage){
    let page=sharedPage.replace('●','?').replace('◆','&');
    return page
  }
})
