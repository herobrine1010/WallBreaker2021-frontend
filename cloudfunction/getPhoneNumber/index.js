// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event,context) => {
  // const result = await cloud.openapi.phonenumber.getPhoneNumber({
  //   code:code
  // })
  // console.log(result)
  // return result
  const res = await cloud.getOpenData({
    list: [event.cloudID]
  });
  return res;
}