// pages/jishi/main.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";
import {formatTime} from "../../utils/util.js"
import util from "../../utils/util.js";


// 定义函数编写请求参数：-----------------------------------------
function setRequestData(pageNo, keyword,labelId,timeIndex){
  let data = {
    pageNo : pageNo,
    pageSize : 10,
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

// 分页获取帖子列表
async function getTeamWithPage(pageNo, keyword,labelId,timeIndex) {
  let p1 = request({
    url : '/team/jirenGetTeamWithPage',
    header: {
      'content-type': 'x-www-form-urlencoded',
    },
    data : setRequestData(pageNo, keyword,labelId,timeIndex)
  });

  // let p2 = new Promise((resolve,reject) => { // 不进行时间的判断
  //   setTimeout( _ => {
  //     reject("服务器加载有点慢");
  //   },3000)
  // });
  // return Promise.race([p1,p2]);
  return p1;
};


function dealWithTeamAndError(res) {// ---- ------ 处理请求返回字段和错误 ------- ----------- ------------
  if(res.statusCode >=200 && res.statusCode <=300){
    let { current , pages , records } = res.data.data;
    let isLastPage = false;
    let jirenItemList = records.map( v=>{
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
      v.peopleCount = (v.participantNumber + 1) + '/' + (v.dueMember + 1) ;
      return v;
    });
    if(current == pages || pages == 0){
      isLastPage = true; // 判断是否是最后一页
    }
    return {
      isLastPage,
      current,
      pages,
      jirenItemList
    }
    // obj[new] = JSON.parse(JSON.stringify(obj[jishiItemList]));
  }else{
    wx.showToast({
      title: '请求失败',
      icon: 'error'
    })
  } 
}
async function setTeamDataInFirstPage(that , pageNo = 1, keyword, labelId, timeIndex) {
// 1.处理接口返回数据：渲染页面 / 超时提示
// 2.判断、请求、处理下一页数据
  try {
    let res = await getTeamWithPage(pageNo, keyword,labelId,timeIndex);
    let firstPageData = dealWithTeamAndError(res);
    firstPageData['isRefresherOpen'] = false;
    // setData是page对象里才有的办法，所以在调用函数时，要把page对象传入进来；
    that.setData(firstPageData);
    // console.log(!firstPageData.isLastPage);
    if(!firstPageData.isLastPage){
      getNextTeamPage(that , keyword, labelId, timeIndex); //获取并处理下一页；
    }
    
  } catch (error) {
    // 超时提示
    console.log(error);
    wx.showToast({
      title: error,
      icon: 'error'
    })
  }
}
  // 1.处理接口返回数据：渲染页面 / 超时提示
  // 2.判断、请求、处理下一页数据
async function getNextTeamPage(that , keyword, labelId, timeIndex) {
  let {current,
    pages,
    isLastPage} = that.data;
  if(!isLastPage){ //没到最后一页，再发送请求
    try {
      let res = await getTeamWithPage(current + 1, keyword, labelId,timeIndex);
      let nextPageData = dealWithTeamAndError(res);
      // setData是page对象里才有的办法，所以在调用函数时，要把page对象传入进来；
      that.setData({nextPageData});
    } catch (error) {
      // 超时提示
      wx.showToast({
        title: error,
        icon: 'error'
      })
    }
  }else{
    that.setData({'nextPageData' : {}});// 筛选的时候，清空之前的nextPageData
  }
};

// 封装请求：本页面多次发送获取组队列表的请求，因此将其封装：-----------------
function getTeamList(that,keyword,labelId,timeIndex){
  request({
    url : '/team/jirenGetTeam',
    header: {
      'content-type': 'x-www-form-urlencoded',
       
    },
    data : setRequestData(keyword, labelId, timeIndex)
  }).then(res => {
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
        v.peopleCount = (v.participantNumber + 1) + '/' + (v.dueMember + 1) ;
        return v;
      });
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
      label : '竞赛组队',
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
    // 数据加载：---------------------- -------- --- -----------


    // 分页获取 组队数据 -------- ---------- -------------------
    let {keyword, labelId, timeIndex} = that.data;
    setTeamDataInFirstPage(that, 1, keyword, labelId, timeIndex);
    // 标签加载：---------------------------------------------------------
    request({
      url:'/label',
      data:{
        type : 'jiren'
      }
    }).then(res => {
      let teamLabels = res.data.data.map( v => {
        let {id,content} = v;
        return {
          labelId : id,
          label : content,
          selected : false
        }
      })
      this.setData({
        teamLabels
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

    util.getNotice();
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
    return {
      title : '欢迎注册使用济星云小程序！',
      path : '/pages/welcome/welcome'
    }
  },

// ------------------- 以下是自定义事件： ----- ------- -------------

  // 绑定搜索事件： 光标离开触发：--- 点击叉号取消搜索 ----------------------
  onSearch:function(e){
    this.setData({
      keyword : e.detail.value
    })
    let that = this;
    // 分页获取 组队数据 -------- ----------------------------
    let {keyword, labelId, timeIndex} = that.data;
    setTeamDataInFirstPage(that, 1, keyword, labelId, timeIndex);
  },
  onCancleSearch:function(){
    this.setData({
      keyword : ''
    })
    let that = this;
    // 分页获取 组队数据 -------- ---------- -------------------
    let {keyword, labelId, timeIndex} = that.data;
    setTeamDataInFirstPage(that, 1, keyword, labelId, timeIndex);
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
    // 2.其次，发送请求，获得筛选数据：分页获取 组队数据 -------- ---------- -------------------
    let that = this;
    let {keyword, labelId, timeIndex} = that.data;
    setTeamDataInFirstPage(that, 1, keyword, labelId, timeIndex);
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
    let {keyword, labelId, timeIndex} = that.data;
    setTeamDataInFirstPage(that, 1, keyword, labelId, timeIndex);

  },
  clickShade2:function(){
    if(this.data.conditionFilterOpen){
      this.setData({conditionFilterOpen:false})
    }
  },

  // 组队指南 以及另外两个跳转按钮：------------  -------------------------
  navToGuide : function(){
    wx.navigateTo({
      url: '/pages/jiren/guide-new',
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
  // 滚动框 上拉触底事件 加载下一页数据------- ---- --------- ------ ------- ------
  //  --------- 滚动框：获取下一页 ------------
  delRepeatInNextpage(oldList,newList){ // 翻页时去重
    const firstId = newList[0].id;
    const index = oldList.findIndex( item => item.id == firstId);
    if(index != -1){
      let len = oldList.length - index;
      newList.splice(0,len);
      return oldList.concat(newList); 
    }else{
      return oldList.concat(newList);  
    }
  },
  getNextPage(){
    let that = this;
    let isLastPage = that.data.isLastPage;
    if(!isLastPage){ //没到最后一页
      let {isLastPage, current, pages,  jirenItemList : nextlist} = that.data.nextPageData;
      let jirenItemList = that.data.jirenItemList;
      jirenItemList = this.delRepeatInNextpage(jirenItemList, nextlist);
      that.setData({  
        isLastPage, 
        current, 
        pages,  
        jirenItemList, 
        'nextPageData' : {}
      });
      //  分页获取帖子列表
      let {keyword, labelId, timeIndex} = this.data;
      getNextTeamPage(that, keyword, labelId, timeIndex);
    }
  
  },
  // 滚动框的 下拉刷新事件 pullDownRefresh------------- -------------- ----------
  onRefresherRefresh:function(){
    // 重新发送请求，包括此前筛选或者搜索数据：
    let that = this;
    let {keyword, labelId, timeIndex} = that.data;
    setTeamDataInFirstPage(that, 1, keyword, labelId, timeIndex);
    
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