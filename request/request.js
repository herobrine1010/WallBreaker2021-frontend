// http://101.132.130.199:8080
// 说明：将 wx.request 封装成 promise ,并提取了公共路径；
const app = getApp();
const request = (params) => {
  let token = app.globalData.token;
  if (token) {
    return new Promise((resolve, reject) => {
      wx.request({
        ...params,
        url: app.globalData.url + params.url,
        header: {
          ...params.header,
          'cookie': token
        },
        success: (result) => {
          resolve(result);
        },
        fail: (error) => {
          reject(error);
        }
      })
    })
  } else { // 意外未获取到token的情况
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
      return new Promise((resolve, reject) => {
        wx.request({
          ...params,
          url: app.globalData.url + params.url,
          header: {
            ...params.header,
            'cookie': token
          },
          success: (result) => {
            resolve(result);
          },
          fail: (error) => {
            reject(error);
          }
        })
      })
    })
  }

};

const login = (code) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.url + '/user/login',
      header: {
        'content-type': 'application/json'
      },
      data: {
        "code": code
      },
      method: 'POST',
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}

module.exports = {
  request,
  login
}