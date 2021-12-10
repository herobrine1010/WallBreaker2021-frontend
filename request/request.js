// http://101.132.130.199:8080
// 说明：将 wx.request 封装成 promise ,并提取了公共路径；
const app = getApp();
const request = (params)=> {
  const baseUrl  = 'https://jixingyun.tongji.edu.cn/api/';
  // const baseUrl = "https://www.wallbreaker.top";
  //const baseUrl  = 'http://localhost:8080';
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url :baseUrl + params.url,
      header : {
        ...params.header,
        'cookie': app.globalData.token
      },
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
  request
}