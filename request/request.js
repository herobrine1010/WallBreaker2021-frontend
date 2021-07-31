// http://101.132.130.199:8080
// 说明：将 wx.request 封装成 promise ,并提取了公共路径；
export const request = (params)=> {
  const baseUrl = "http://101.132.130.199:8080";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url :baseUrl + params.url,
      success : (result)=>{
        resolve(result);
      },
      fail : (error) => {
        reject(error);
      }
    })
  })
}