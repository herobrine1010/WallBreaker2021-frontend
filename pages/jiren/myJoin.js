// pages/jiren/myJoin.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";
import {formatTime} from "../../utils/util.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    amIAccepted:true,
    acceptTeamList:[
      {
      'labelContent':'未分类',
      'title':'示例标题示例标题示例标题…',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'content':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有图片的时候该怎么拉伸……',
      'initiatorNickName':'示例用户',
      'peopleCount':'3/5',
      'firstPicUrl':'a'
      }
    ],
    applyingTeamList:[
      {
      'labelContent':'申请中',
      'title':'示例标题示例标题示例标题…',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'content':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有图片的时候该怎么拉伸……',
      'initiatorNickName':'示例用户',
      'peopleCount':'3/5',
      'firstPicUrl':'a'
      }
    ]
  },
  onBtnTap: function(){
    let state = !this.data.amIAccepted;
    this.setData({
      amIAccepted:state
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this;
    that.getTeamLists()
    .then(res => {
      that.setData({
        acceptTeamList : res.acceptTeamList,
        applyingTeamList : res.applyingTeamList
      })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '失败',
        icon: 'error'
      })
    });
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

  },

  // 请求函数（异步），返回acceptTeamList,applyingTeamList两个数组
          
  getTeamLists(){
    return request({
      url : '/userTeam/teamAppliedByMe',
      header: {
        'content-type': 'x-www-form-urlencoded',
         
      }
    }).then(res => {
      console.log(res);
      if(res.statusCode >=200 && res.statusCode <=300){
        // 有正确的返回值，则将返回结果进行处理，渲染到页面上：
        let tempTeamList = res.data.data.map( v=>{
          v.dueTime = '截止时间：' + formatTime(v.dueTime);
          v.peopleCount = (v.participantNumber + 1) + '/' + (v.dueMember + 1) ;
          
          return v;
        });
        console.log(tempTeamList);
        let applyingTeamList = [];
        let acceptTeamList = [];
        for(let i = 0 ; i< tempTeamList.length; i++){
          if(tempTeamList[i].applyStatus == 1){
            // 申请已同意
            acceptTeamList.push(tempTeamList[i]);
          }else if(tempTeamList[i].applyStatus == 0){
            applyingTeamList.push(tempTeamList[i]);
          }
        }
        console.log(applyingTeamList);
        console.log(acceptTeamList);
        return {acceptTeamList,applyingTeamList};
      }else{
        wx.showToast({
          title: '失败',
          icon: 'error'
        })
        return Promise.reject(res);
      }
    })
  },
  onRefresherRefresh(){
    const that = this;
    that.getTeamLists()
    .then(res => {
      that.setData({
        acceptTeamList : res.acceptTeamList,
        applyingTeamList : res.applyingTeamList,
        isRefresherOpen : false
      })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '失败',
        icon: 'error'
      })
    });
  }
})