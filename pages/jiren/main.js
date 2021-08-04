// pages/jishi/main.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";

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
    if(res.statusCode >=200 && res.statusCode <=300){
      // 有正确的返回值，则将返回结果进行处理，渲染到页面上：
      let jirenItemList = res.data.data.map( v=>{
        // status = 1  ;  表示：我发起的组队
        v.teamCondition = 'mine';
        if(v.status == 1){
          v.rightTagText = '我发起的';
        };
        let duetime = new Date(v.dueTime);
        v.dueTime = '截止时间：'+ duetime.getFullYear() + '年' + duetime.getMonth() + '月'+ duetime.getDate() + '日 '+  duetime.getHours() + ':' + (duetime.getMinutes()<10?'0'+duetime.getMinutes():duetime.getMinutes());
        v.peopleCount = v.participantNumber + '/' + v.dueMember ;
        return v;
      });
      // setData是page对象里才有的办法，所以在调用函数时，要把page对象传入进来；
      that.setData({
        jirenItemList
      })
    }else{
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
    } 
  }).catch( err=> {
    wx.showToast({
      title: '请求失败',
      icon: 'error'
    })
  });
};


Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      'labelContent':'2ff类',
      'title':'示例标题sfnvkjs例标题…',
      'teamCondition':'mine',
      'rightTagText':'我发起的',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'content':'这是一段描述性文字，仅用于测试。这是一段……',
      'initiatorNickName':'发起人: 示例用户',
      'peopleCount':'3/5',
      'firstPicUrl':''
      }
    ]
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
    let that = this;
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 //0,1,2 0-济事  1-济人  2-我的
      })
    };
    // 数据加载：---------------------- -------- --- -----------
    getTeamList(that,this.data.keyword,19,this.data.timeIndex);
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


  onPageScroll:function(e){
    console.log("page scroll")
    console.log(e)
    if (e.scrollTop > 0) {
      this.setData({
        showGoTopButton: true
      });
    } else {
      this.setData({
        showGoTopButton: false
      });
    }
  },
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
    //    将事件排序改回为desc
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
  
  // 滚动框的 滚动和回到最上事件：------------- -------------- ----------
  returnTop: function () {
    let that=this;
    this.setData({
     topNum:  0
    });
    setTimeout(function () {
      that.setData({showGoTopButton:false})
      console.log("test")
     }, 100)
  },
  onMyScroll:function(){
    console.log("my scroll")
    if(this.data.showGoTopButton==false){
      this.setData({showGoTopButton:true})
    }
  },
  createNewTeam:function(){
    //console.log("realize create new team")
    wx.navigateTo({
      url: '/pages/jiren/initiateTeam',
    })
  },
// 绑定搜索事件： 光标离开触发：-------------------------
  onSearch:function(e){
    this.setData({
      keyword : e.detail.value
    })
    let that = this;
    getTeamList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);
  }
  
})