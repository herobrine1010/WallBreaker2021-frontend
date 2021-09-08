// pages/jishi/main.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";
import {formatTime} from "../../utils/util.js"

// 定义函数编写请求参数：-----------------------------------------
function setRequestData(keyword,labelId,timeIndex){
  let data = {
    order : timeIndex
  };
  if(keyword){
    data.keyword = keyword;
  }
  if(labelId){
    data.labelId = labelId;
  }
  return data;
};

// 封装请求：本页面多次发送获取组队列表的请求，因此将其封装：-----------------
function getTeamList(that,keyword,labelId,timeIndex){
  request({
    url : '/team/jirenGetTeam',
    header: {
      'content-type': 'x-www-form-urlencoded',
      'cookie':wx.getStorageSync("token")
    },
    data : setRequestData(keyword, labelId, timeIndex)
  }).then(res => {
    console.log(res);
    if(res.statusCode >=200 && res.statusCode <300){
      // 有正确的返回值，则将返回结果进行处理，渲染到页面上：
      let jirenItemList = res.data.data.map( v=>{
        // status = 1  ;  表示：我发起的组队
        v.teamCondition = 'mine';
        if(v.initializedByMe){
          v.rightTagText = '我发起的';
        };

        if(v.dueTime){
          v.dueTime = '截止时间：' + formatTime(v.dueTime);
        }else{
          v.dueTime = '截止时间：暂无'
        }  
        // v.dueTime = '截止时间：'+ duetime.getFullYear() + '年' + (duetime.getMonth()+1) + '月'+ duetime.getDate() + '日 '+  duetime.getHours() + ':' + (duetime.getMinutes()<10?'0'+duetime.getMinutes():duetime.getMinutes());
        v.peopleCount = v.participantNumber + '/' + v.dueMember ;
        return v;
      });
      // console.log(jirenItemList[2].firstPicUrl);
      // setData是page对象里才有的办法，所以在调用函数时，要把page对象传入进来；
      that.setData({
        jirenItemList,
        isRefresherOpen: false
      })
    }else{
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
    } 
  }).catch( err=> {
    console.log(err);
    wx.showToast({
      title: '没有返回值',
      icon: 'error'
    })
  });
};


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRefresherOpen : false,
    showGoTopButton:false,
    topNum:0,
    conditionFilterOpen:false, 
    conditions:['竞赛','学术科研','一起造梦','其他'],
    conditionsSelected:[false,false,false,false],
    teamLabels:[{
      labelId : 17,
      label : '竞赛',
      selected : false
    },{
      labelId : 18,
      label : '学术科研',
      selected : false
    },{
      labelId : 19,
      label : '一起造梦',
      selected : false
    },{
      labelId : 20,
      label : '其他',
      selected : false
    }],
    timeIndex:'desc',
    keyword : '',
    labelId : 0,
    jirenItemList:[
      {
      'id': '10',
      'labelContent':'提示',
      'title':'正在加载中…',
      'initializedByMe':false,
      'teamCondition':'mine',
      'rightTagText':'',
      'dueTime':'截止时间: 2021年11月4日 12:00',
      'content':'数据正在获取，请耐心等候~',
      'initiatorNickName':'发起人: 系统管理员',
      'peopleCount':'0/0',
      'firstPicUrl':''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 //0,1,2 0-济事  1-济人  2-我的
      })
    };
    console.log(this.data.labelId);
    // 数据加载：---------------------- -------- --- -----------
    getTeamList(that,this.data.keyword,this.data.labelId,this.data.timeIndex);
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

// ------------------- 以下是自定义事件： ----- ------- -------------

  // 绑定搜索事件： 光标离开触发：--- 点击叉号取消搜索 ----------------------
  onSearch:function(e){
    this.setData({
      keyword : e.detail.value
    })
    let that = this;
    getTeamList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);
  },
  onCancleSearch:function(){
    this.setData({
      keyword : ''
    })
    let that = this;
    getTeamList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);
  },

//  --------------------筛选框的弹出、归位---- ------ -------- ----
  clickConditionFilter:function(){
    if(this.data.conditionFilterOpen==true){
      this.setData({'conditionFilterOpen':false})
    }else{
      this.setData({'conditionFilterOpen':true})
    }
  },
  // 选择筛选label ----- 筛选和取消筛选函数-------------------------------------
  clickLabel:function(e){
    // 1.首先：更改页面：选中的teamLabel变为蓝色；并且拿到选中的labelId:---------------------------
    //    拿到 index 序列
    let index = e.currentTarget.dataset.index; 
    let teamLabels = this.data.teamLabels;
    //    若该项已被选中，则取消选中
    //    否则：其余为FALSE，第index 个为TRUE
    //    将事件排序改回为asc
    if(teamLabels[index].selected){
      teamLabels[index].selected = false;
      this.setData({
        conditionFilterOpen:false,
        teamLabels,
        labelId:0,
        timeIndex:'desc'
      })
    }else{
      for(let i=0; i<teamLabels.length; i++){
        teamLabels[i].selected = false;
      };
      teamLabels[index].selected = true;
      this.setData({
        conditionFilterOpen:false,
        teamLabels,
        labelId: teamLabels[index].labelId,
        timeIndex:'desc'
      })
    };
    // 2.其次，发送请求，获得筛选数据：
    let that = this;
    getTeamList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);
  },

// -------------排序：----------------------------
  clickTimeIndex:function(){
    if(this.data.timeIndex=='asc'){
      this.setData({'timeIndex':'desc'})
    }
    else if(this.data.timeIndex=='desc'){
      this.setData({'timeIndex':'asc'})
    }
    // 重新发送请求，包括此前筛选或者搜索的数据：
    let that = this;
    getTeamList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);

  },
  clickShade2:function(){
    if(this.data.conditionFilterOpen){
      this.setData({conditionFilterOpen:false})
    }
  },

  // 组队指南 以及另外两个跳转按钮：------------  -------------------------
  navToGuide : function(){
    wx.navigateTo({
      url: '/pages/jiren/guide',
    })
  },
  goMyPublish:function(){
    wx.navigateTo({
      url: '/pages/jiren/myPublish',
    })
  },
  goMyJoin:function(){
    wx.navigateTo({
      url: '/pages/jiren/myJoin',
    })
  },

  // 滚动框的 下拉刷新事件 pullDownRefresh------------- -------------- ----------
  onRefresherRefresh:function(){
    // 重新发送请求，包括此前筛选或者搜索数据：
    let that = this;
    getTeamList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);
    
  },
  // 滚动框的 滚动和回到最上事件：------------- -------------- ----------
  returnTop: function () {
    let that=this;
    this.setData({
     topNum:  0
    });
    setTimeout(function () {
      that.setData({showGoTopButton:false})
    }, 100)
  },
  onMyScroll:function(e){
    if(e.detail.scrollTop>100){
      this.setData({showGoTopButton:true})
    }else if(this.data.showGoTopButton){
      this.setData({showGoTopButton:false})
    }
  },
  // 跳转：发起组队事件：------------- --------- ------ ------- --
  createNewTeam:function(){
    wx.navigateTo({
      url: '/pages/jiren/initiateTeam',
    })
  },

  
})