// pages/jishi/main.js
import { request } from "../../request/request.js";
const util = require('../../utils/util.js');

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

// 封装请求：参考jiren主界面的请求，封装获取帖子列表的请求-----------------
function getPostingList(that,keyword,labelId,timeIndex){
  request({
    url : '/posting/jishiGetPosting',
    header: {
      'content-type': 'x-www-form-urlencoded',
      'cookie':wx.getStorageSync("token")
    },
    data : setRequestData(keyword, labelId, timeIndex)
  }).then(res => {
    console.log("posting request",res);
    if(res.statusCode >=200 && res.statusCode <=300){
      // 有正确的返回值，则将返回结果进行处理，渲染到页面上：
      let jishiItemList = res.data.data.map( v=>{
/*      status = 1  ;  表示：我发起的组队
        v.teamCondition = 'mine';
        if(v.initializedByMe){
          v.rightTagText = '我发起的';
        }; */
        console.log("duetime",v.createTime)
        v.createTime = util.getDateDiff(v.createTime);
        return v;
      });
      console.log("jishiItemList",jishiItemList)
      // setData是page对象里才有的办法，所以在调用函数时，要把page对象传入进来；
      that.setData({
        jishiItemList,
        isRefresherOpen: false
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
    console.log("err",err)
  }); 
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isRefresherOpen : false,
    showGoTopButton:false, 
    timeIndex:'desc',
    keyword : '',
    labelId : 0,
    topNum:0,
    /*     济事主题列表label(type=jishi)，用于筛选和渲染card的标签，在onload里请求，格式如下 */
    postingLabels:[
      {
        id: 21,
        content: "求职信息",
        type: "jishi",
        selected: false,
      }
    ],
/*     废弃的筛选功能标签
    conditionIndex:'',
    conditionFilterOpen:false,
    conditions:['竞赛','学术科研','一起造梦','其他'],
    conditionsSelected:[false,false,false,false], */
    jishiItemList:[
    //   {
    //   'labelText':'未分类',
    //   'title':'示例标题示例标题示例标题…',
    //   'content':'这是一段描述性文字，仅用于测试。这是一段……',
    //   'rightTagText':'我发起的',
    //   'userAvatar':'/static/icon/default-user.png',
    //   'userName':'示例用户',
    //   'updateTime':'1天前'
    // },
    // {
    //   'labelText':'未分类',

    //   'title':'示例标题示例标题示例标题…',
    //   'content':'这是一段描述性文字，仅用于测试。这是一段……',
    //   'updateTime':'1天前',

    //   'rightTagText':'',
    //   'userAvatar':'/static/icon/default-user.png',
    //   'userName':'示例用户',

    // }
  ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 获取帖子标签列表
    request({
      url : "/label",
      header: {
        'content-type': 'x-www-form-urlencoded',
      },
      data: {
        type: "jishi"
      }
    }).then( res => {
      console.log("label",res.data.data)
      this.setData({
        postingLabels: res.data.data,
      })
      // 用map从json中提取标签列表
      let result = res.data.data.map( data => data.content);
      // 初始化选择状态，完成后长度为标签列表长度，值全为false 
      that.data.conditionsSelected = Array(result.length).fill(false)

      that.setData({
        conditions: result,
        conditionsSelected: that.data.conditionsSelected
      })
    }).catch( err => {
      console.log(err);
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 //0,1,2 0-济事  1-济人  2-我的
      })
   }
   //获取帖子列表，posting表
   getPostingList(this, this.data.keyword, this.data.labelId, this.data.timeIndex);
   console.log(this.data.jishiItemList)

  },
  jumpToDetail:function(e){
    wx.navigateTo({
      url: '/pages/jishi/detail?postingId='+e.currentTarget.dataset.postingid,
    })
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
  
  // 绑定搜索事件： 光标离开触发：--- 点击叉号取消搜索 ----------------------
  onSearch:function(e){
    this.setData({
      keyword : e.detail.value
    })
    let that = this;
    getPostingList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);
  },
  onCancleSearch:function(){
    this.setData({
      keyword : ''
    })
    let that = this;
    getPostingList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);
  },
  //弹出条件筛选
  clickConditionFilter:function(){
    if(this.data.conditionFilterOpen==true){
      this.setData({'conditionFilterOpen':false})
    }else{
      this.setData({'conditionFilterOpen':true})
    }
  },
  /* 废弃的筛选标签方法
  clickConditionBlue:function(){
    let l=[];
    for(let i in this.data.conditionsSelected){
      l.push(false);
    }
    this.setData({
      conditionIndex:'',
      conditionsSelected:l,
      conditionFilterOpen:false
    });
    //this.onLoad();
  },
  clickConditionGray:function(e){
    let keyword=e.currentTarget.dataset.condition;
    console.log("选中标签",keyword)
    let l=[];
    for(let i=0;i<this.data.conditionsSelected.length;i++){
      if (this.data.conditions[i]==keyword)l.push(true);
      else l.push(false);
    }
    this.setData({
      conditionIndex:keyword,
      conditionsSelected:l,
      conditionFilterOpen:false
    })
    console.log(this.data.conditionsSelected)
    // this.onLoad()
  }, */
  clickLabel:function(e){
    // 1.首先：更改页面：选中的teamLabel变为蓝色；并且拿到选中的labelId:---------------------------
    //    拿到 index 序列
    let index = e.currentTarget.dataset.index;
    let postingLabels = this.data.postingLabels;
    //    若该项已被选中，则取消选中
    //    否则：其余为FALSE，第index 个为TRUE
    //    将事件排序改回为asc
    if(postingLabels[index].selected){
      postingLabels[index].selected = false;
      this.setData({
        conditionFilterOpen:false,
        postingLabels,
        labelId:0,
        timeIndex:'desc'
      })
    }else{
      for(let i=0; i<postingLabels.length; i++){
        postingLabels[i].selected = false;
      };
      postingLabels[index].selected = true;
      console.log("postingLabels[index]",postingLabels[index]) 
      this.setData({
        conditionFilterOpen:false,
        postingLabels,
        labelId: postingLabels[index].id,
        timeIndex:'desc'
      })
    };
    // 2.其次，发送请求，获得筛选数据：
    getPostingList(this, this.data.keyword, this.data.labelId ,this.data.timeIndex);
  },
  clickTimeIndex:function(){
    if(this.data.timeIndex=='asc'){
      this.setData({'timeIndex':'desc'})
    }
    else if(this.data.timeIndex=='desc'){
      this.setData({'timeIndex':'asc'})
    }
    // 重新发送请求，包括此前筛选或者搜索的数据：
    getPostingList(this, this.data.keyword, this.data.labelId ,this.data.timeIndex);
  },
  clickShade2:function(){
    if(this.data.conditionFilterOpen){
      this.setData({conditionFilterOpen:false})
    }
  },
  // 济事主页暂无这两个需求
/*   goMyPublish:function(){
    wx.navigateTo({
      url: '/pages/jiren/myPublish',
    })
  },
  goMyJoin:function(){
    wx.navigateTo({
      url: '/pages/jiren/myJoin',
    })
  }, */
  
  
  // 滚动框的 下拉刷新事件 pullDownRefresh------------- -------------- ----------
  onRefresherRefresh:function(){
    // 重新发送请求，包括此前筛选或者搜索数据：
    let that = this;
    getPostingList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);
    
  },
  //滚动框 返回最上方
  returnTop: function () {
    let that=this;
    this.setData({
     topNum:  0
    });
/*     在当前的绑定下，设置topNum后返回顶部按钮就会消失，不用单独设置
    setTimeout(function () {
      that.setData({showGoTopButton:false})
      console.log("test")
     }, 100) */
 
  
   },
   onMyScroll:function(e){
    if(e.detail.scrollTop>100){
      this.setData({showGoTopButton:true})
    }else if(this.data.showGoTopButton){
      this.setData({showGoTopButton:false})
    }
   },
   createNewTeam: function(){
     wx.navigateTo({
       url: '/pages/jiren/initiateTeam',
     })

   }
})