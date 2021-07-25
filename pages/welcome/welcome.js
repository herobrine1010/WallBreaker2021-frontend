const app = getApp();
// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onEnter:function(e){
    wx.getUserProfile({
      desc: '获取用户信息的文案 待修改', 
      success: (res) => {
        var myInfo =res.userInfo
        console.log(myInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        wx.login({
          success:res=>{
            console.log(res.code)
            wx.request({
              data:{
                "code":res.code,
                "nickName":myInfo.nickName,
                "gender":myInfo.gender,
                "wxAvatarUrl":myInfo.avatarUrl,
                "avatarUrl":myInfo.avatarUrl
              },
              url: app.globalData.url+'/user/login',
              method:'POST',
              header:{
                'content-type':'application/json'
              },
              success:function(res2){
                console.log(res2);
                if(res2.data.data.code=="register"){
                  wx.setStorageSync("token", res2.cookies[0])
                  wx.showToast({
                    title: '注册成功！',
                    icon:'success'
                  })
                  wx.switchTab({
                    url: '/pages/jishi/main',
                  })
                }else{
                  console.log("看下哪有问题")
                  console.log(res2)
                }
              }
            })
          }
        })
    

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先发一个login确认有没有注册过
    wx.login({
      success:res=>{
        console.log(res.code)
        wx.request({
          data:{
            "code":res.code,
          },
          url: app.globalData.url+'/user/login',
          method:'POST',
          header:{
            'content-type':'application/json'
          },
          success:function(res2){
            console.log(res2);
            if(res2.data.data.code=="login"){
              wx.setStorageSync("token", res2.cookies[0])
              wx.switchTab({
                url: '/pages/jishi/main',
              })
            }else if(res2.data.data.code="needInfo"){
              console.log("提示用户允许获取个人信息")
            

            }
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})