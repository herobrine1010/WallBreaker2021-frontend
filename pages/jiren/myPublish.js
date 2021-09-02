// pages/jishi/main.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";
import {formatTime} from "../../utils/util.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myTeamList:[
      {
      'labelContent':'未分类',
      'title':'示例标题示例标题示例标题…',
      'teamCondition':'processing',
      'rightTagText':'待处理',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'content':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有图片的时候该怎么拉伸……',
      'peopleCount':'3/5',
      'firstPicUrl':'a'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    that.getTeamList()
    .then(res => {
      console.log(res);
      that.setData({
        myTeamList: res
      })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '网络错误，请重试',
        icon: 'error'
      })
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
    // this.getTabBar().setData({
    //   showBar: false
    // });
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

  },

  // 请求：（异步）返回teamList数组
  getTeamList(){
    return request({
      url : '/userTeam/teamInitiatedByMe',
      header: {
        'content-type': 'x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      }
    }).then(res => {
      if(res.statusCode >=200 && res.statusCode <300){
        // 有正确的返回值，则将返回结果进行处理，渲染到页面上：
        let myTeamList = res.data.data.map( v=>{
          // status = 1  ;  表示：待处理的组队
          if(v.status == 1){
            v.rightTagText = '待处理';
            v.teamCondition = 'processing';
          }else if(v.status == 2){
            v.rightTagText = '已满员';
            v.teamCondition = 'full';
          }
          else if(v.status == 3 || v.status == 4){
            v.rightTagText = '已关闭';
            v.teamCondition = 'close';
          }
          v.dueTime = '截止时间：'+formatTime(v.dueTime);
          v.peopleCount = v.participantNumber + '/' + v.dueMember ;
          return v;
        });
        return myTeamList;
      }else{
        wx.showToast({
          title: '失败',
          icon: 'error'
        })
        return Promise.reject(res);
      } 
    })
  },

  // scroll-view 下拉刷新事件
  onRefresherRefresh(){
    let that = this;
    that.getTeamList()
    .then(res => {
      console.log(res);
      that.setData({
        myTeamList: res,
        isRefresherOpen: false
      })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '网络错误，请重试',
        icon: 'error'
      })
    })
  }
})