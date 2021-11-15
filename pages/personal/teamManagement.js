// pages/collection/collection.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";
import {formatTime} from "../../utils/util.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionTitle : "",
    leftButtonTitle : "",
    rightButtonTitle : "",
    //默认初试选择左边 帖子按钮 
    isNoticeOrTeam : 0,

    height:'auto',
    jirenItemList:[
    //   {
    //   'labelText':'未分类',
    //   'title':'示例标题示例标题示例标题…',
    //   'teamCondition':'refuse',
    //   'rightTagText':'申请未通过',
    //   'dueTime':'截止时间: 2021年6月21日 14:00',
    //   'description':'这是一段描述性文字，仅用于测试。这是一段……',
    //   'initiator':'发起人: 示例用户',
    //   'peopleCount':'3/5',
    //   'postingPic':''
    // },
    ],
  },
//以下两个事件为：点击帖子(收藏或管理)按钮，或者点击组队(收藏或管理)按钮.
//切换按钮颜色、页面背景；
  onScrollToLower:function(){
    console.log("上拉触了滚动框的底");
  },
  onRefresherRefresh:function(){
    const self = this;
    this.getListData(self);
  },


// 点击卡片之后的页面跳转


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const self = this;
    this.getListData(self);
    this.changeScrollHeight();
  },


  //  将页面请求放到函数中，方便多次调用 
  getListData:function(self){

    // ---- -----  调试分页接口 ------------------
    request({
      url : '/userTeam/teamAppliedByMeWithPage',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      },
      data : {
        pageNo : 1
      }
    }).then(res => {
      console.log(res);
    })
    
    request({
      url : '/userLostFound/getMyLostFoundWithPage',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      },
      data : {
        pageNo : 1
      }
    }).then(res => {
      console.log(res);
    })

    request({
      url : '/userTeam/teamInitiatedByMeWithPage',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      },
      data : {
        pageNo : 1
      }
    }).then(res => {
      console.log(res);
    })
    // ---- -----  调试分页接口   结束 ------------------

    let teamAppliedByMe=request({
      url : '/userTeam/teamAppliedByMe',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      }
    });
    let teamInitiatedByMe=request({
      url : '/userTeam/teamInitiatedByMe',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      }
    });
    Promise.all([teamAppliedByMe,teamInitiatedByMe])
    .then(result=>{
      let dataAppliedByMe=result[0].data.data;
      let dataInitiatedByMe=result[1].data.data;
      result = null;
      let myTeam = null;
      for(myTeam of dataInitiatedByMe){
        myTeam.initializedByMe = true;
      };
      console.log(dataAppliedByMe,dataInitiatedByMe);
      let teamList = dataAppliedByMe.concat(dataInitiatedByMe);
      dataAppliedByMe = null;
      dataInitiatedByMe = null;
      teamList.sort((a,b)=> new Date(b.updateTime)  - new Date(a.updateTime));
      let team = null;
      for(team of teamList){
        team.dueTime = '截止时间：' + formatTime(team.dueTime)
        team.peopleCount=(team.participantNumber + 1)+'/'+(team.dueMember + 1);
        if(team.initializedByMe){
          team.haveNotice = team.notice;
          switch(team.status){
            case 0:
              team.teamCondition='mine'
              team.rightTagText='我发起的'
              break;
            case 1:
            case 2:
              team.teamCondition='mine'
              team.rightTagText='待处理'
              break;
            case 3:
            case 4:
            default:
              team.teamCondition='close'
              team.rightTagText='已关闭'
              break;
          }
        }else{
          team.haveNotice = team.applyNotice
          if(team.applyClosed){
              team.teamCondition='close'
              team.rightTagText='已关闭'
          }else{
            switch(team.applyStatus){
              case 0:
                team.teamCondition='applying'
                team.rightTagText='我已申请'
                break;
              case 1:
                team.teamCondition='pass'
                team.rightTagText='我已入队'
                break;
              case 2:
                team.teamCondition='refuse'
                team.rightTagText='申请未通过'
                break;
          }

          }
        }
      }
      self.setData({
        jirenItemList: teamList,
        isRefresherOpen: false
      })

    })
  },
  // // 规范日期格式
  // setDueTime:function(time){
  //   if(time){
  //     let dueTime = new Date(time);
  //     return ('截止时间：' + dueTime.getFullYear() + '年' + (dueTime.getMonth()+1) + '月' + dueTime.getDay() + '日  ' + dueTime.getHours() + ':' + dueTime.getMinutes());
  //   }else{
  //     return '截止时间：暂无';
  //   };
  // },

  changeScrollHeight:function(){
    let windowHeight;
    //设置scroll-view高度
    wx.getSystemInfo({
      success: function (res) {
          windowHeight= res.windowHeight;
      }
    });
    let query = wx.createSelectorQuery();
    query.select('#scroll').boundingClientRect(rect=>{
      console.log(rect)
        let top = rect.top;
        let height=windowHeight-top;
        this.setData({
          height:height+'px',
        });
      }).exec();
      
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
    this.onLoad();
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