async function storageTest(key) {
  const token = wx.getStorageSync(key);
  if (token) {
    return token;
  } else {
    return new Promise((resolve, reject) => {
      wx.login({
        success: result => {
          resolve(result);
        },
        fail: res => {
          reject("loginErr");
        }
      });
    })
      .then(res => {
        return request({
          data: {
            code: res.code
          },
          url: "/user/login",
          method: "POST",
          header: {
            "content-type": "application/json"
          }
        });
      })
      .then(res => {
        const { openId, registered, code: status } = res.data.data;
        wx.setStorageSync("openid", openId);
        wx.setStorageSync("registered", registered);
        wx.setStorageSync("token", res.cookies[0]);
        return res.cookies[0];
      })
      .catch(err => {
        if (err == "loginErr") {
          wx.showToast({
            title: "网络出错了",
            icon: "error"
          });
        } else {
          wx.showToast({
            title: "登陆失败",
            icon: "error"
          });
          console.log(err);
        }
      });
  }
}

module.exports = {
  storageTest
};
