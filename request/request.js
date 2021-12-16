// http://101.132.130.199:8080
// 说明：将 wx.request 封装成 promise ,并提取了公共路径；
const app = getApp();
const request = (params)=> {
  const baseUrl  = 'https://jixingyun.tongji.edu.cn/api2';
  // const baseUrl = "https://www.wallbreaker.top";
  //const baseUrl  = 'http://localhost:8080';
  let token = app.globalData.token;
  if(token){
    return new Promise((resolve,reject)=>{
      wx.request({
        ...params,
        url :baseUrl + params.url,
        header : {
          ...params.header,
          'cookie': token
        },
        success : (result)=>{
          resolve(result);
        },
        fail : (error) => {
          reject(error);
        }
      })
    }).then(res => {
      if(res.statusCode == 401){
        wx.showToast({
          title: '服务器重启',
          icon : 'error'
        });
        setTimeout( _ => {
          wx.reLaunch({
            url: '/pages/welcome/welcome',
          })
        },1000)
      }else{
        return res
      }
    })
  }else{ // 意外未获取到token的情况
    return new Promise((resolve, reject) => {
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
    }).then(res => {
      let {
        openId,
        registered
      } = res.data.data;
      app.globalData.token = res.cookies[0];
      app.globalData.openId = openId;
      app.globalData.registered = registered;
      return res.cookies[0]
    }).then(token => {
      return new Promise((resolve,reject)=>{
        wx.request({
          ...params,
          url :baseUrl + params.url,
          header : {
            ...params.header,
            'cookie': token
          },
          success : (result)=>{
            resolve(result);
          },
          fail : (error) => {
            reject(error);
          }
        })
      })
    })
  }

};

const login = (code)=> {
  const baseUrl  = 'https://jixingyun.tongji.edu.cn/api2';
  // const baseUrl = "https://www.wallbreaker.top";
  //const baseUrl  = 'http://localhost:8080';
  return new Promise((resolve,reject)=>{
    wx.request({
      url :baseUrl + '/user/login',
      header : {
        'content-type':'application/json'
      },
      data : {
        "code" : code
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
}

module.exports = {
  request,
  login
}