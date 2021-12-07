// pages/feedback/feedback.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackMessage : "",
    lock: false
  },
  formSubmit: function(e){
//   防止重复点击提交，添加锁
    if(this.data.lock == false){
      this.data.lock == true;
      let text = e.detail.value.feedbackText;
      let str = text.trim();//去除收尾字符串
      // 判断是否全是空格 空字符串
      if(str == null || str == '' || str == undefined){
        this.setData({
          feedbackMessage : "该项未填写！"
        });
      }else{   
        request({
          url: '/feedback/feedBack',
          method : 'POST',
          header : {
            'content-type' :  'application/x-www-form-urlencoded',
            'cookie':wx.getStorageSync("token")
          },
          data : {
            'content' : text
          }
        }).then(res =>{
          wx.showToast({
            title: '感谢您的反馈！',
            icon: 'success'
          });
          this.data.lock = false;
          setTimeout(_ => {
            wx.navigateBack({
              delta: 1,
            })
          },1000)

        }).catch(err=>{
          wx.showToast({
            title: '请求失败，请稍后再试',
            icon: 'error'
          })
        })
      }
    }
    

  },
  handleInput: function(e){
    if(e.detail.cursor>=310){
      this.setData({
        feedbackMessage : "字符已达上限！"
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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