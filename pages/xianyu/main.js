// pages/xianyu/main.js
import {request} from "../../request/request.js";
import {formatTime, getDateDiff} from "../../utils/util.js";
var app=getApp();

// 引入各类behaviors
const behaviorsPath = "../../behaviors/"
const scrollBehavior = require(behaviorsPath + "ScrollView.js");
const searchBehavior = require(behaviorsPath + "Search.js");
// 定义函数编写请求参数：-----------------------------------------
Component({
  behaviors: [scrollBehavior, searchBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:1,
    scrollViewHeight:'auto',

    zoneList:['全部帖子','四平','嘉定','沪西','沪北','铁岭','线上'],
    zoneIndex:0,
    navigationList:['全部','图书','美妆','日用','数码','虚拟商品','票务','服饰','出行','其他'],
    navigationIndex:0,

    objectList:[],

    pageNo:1,

    keyword: undefined,
    cachedItemList: [], // 缓存的列表数据, 用于下滚时更新
    tongdeItemList:[],
    // 所有类型标签列表, 暂时直接写好, 后期需要更改时发请求
    labelList: [
    ],
    // 用筛选框选中的标签列表， 目前为单选
    selectedLabelList: [],
    id: null, // selected labels id
    current: 1,
    isLastPage: false
  },
  /* 
  数据监听器
  通过监听this.data中数据变化, 执行函数, 发送请求
   */
  observers: {
    "tab, selectedLabelList[0].id, keyword": function(tab, id, keyword) {
      this.setData({
        id,
        current: 1
      })
      // getThenUpdateLostFoundList(this, tab, id, keyword,1);
      // updateCache(this,tab,id,keyword,2);
    }
  },
  methods: {
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initializeScrollViewHeight()
    this.getData(true)

    // getThenUpdateLostFoundList(this,0,null,null,1);
    // updateCache(this,0,null,null,2);

  },
  onShow: function(options) {

  },
  onShareAppMessage: function () {
    return {
      title : '欢迎注册使用济星云小程序！',
      path:app.getSharedUrl()
    }
  },

  initializeScrollViewHeight:function(){
    var that=this;
    let windowHeight
    wx.getSystemInfo({
      success: function (res) {
        windowHeight=res.windowHeight
      }
    });
    let query = wx.createSelectorQuery();
    query.select('#scroll-view').boundingClientRect(rect=>{
        let top = rect.top;
        let height=windowHeight-top;
        this.setData({
          scrollViewHeight:height,
        });
      }).exec();
  },

  changeTab:function(e){
    let newIndex=e.currentTarget.dataset.index
    let oldIndex=this.data.tabIndex
    console.log(e)
    console.log(e.currentTarget.dataset)
    if(newIndex!=oldIndex){
      this.setData({
        tabIndex:Number(e.currentTarget.dataset.index),
        keyword:'',
      })
      // this.clearInput()
      this.getData(true)
    }
  },

  onSearch:function(e){
    this.setData({
      keyword : e.detail.value
    })
    this.getData(true)
  },
  onCancleSearch:function(){
    this.setData({
      keyword : ''
    })
    this.getData(true)
  },
  clearInput: function(e) {
    // 弹出筛选框
    let searchInput = this.selectComponent('#search-input');
    searchInput.clearInput();
  },
  changeZonePickerStatus:function(e){
    this.setData({zonePickerShow:!this.data.zonePickerShow})
  },

  changeZone:function(e){
    this.setData({
      zoneIndex:e.currentTarget.dataset.index,
      zonePickerShow:false,
    })
  },


  changeCategory:function(e){
    this.setData({navigationIndex:e.currentTarget.dataset.index})
  },
  getData:function(reset=false){
    let {pageNo,pages}=this.data
    if(reset){
      this.setData({
        objectList:[],
        pageNo:1,
      })
    }else{
      if(pageNo>=pages)return
      this.setData({pageNo:pageNo+1})
    }

    let that=this
    let params={
      pageNo:this.data.pageNo,
      type:this.data.tabIndex,
      pageSize:this.data.tabIndex?12:8
    }
    console.log(params)
    if(this.data.keyword)params.keyword=this.data.keyword
    if(this.data.zoneIndex>0)params.location=this.data.zoneIndex
    if(this.data.navigationIndex>0)params.category=this.data.category

    return request({
      url: '/lostfound/tongdeGetLostFoundWithPage',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method : 'GET',
      data: params
    }).then(res=>{
      console.log(res)
      let list=that.data.objectList
      list=list.concat(res.data.data.records.map(item=>{
        return {
          ...item,
          price_integer:299,
          price_fractional:'.50',
          zone:'四平'
        }
      }))
      that.setData({
        objectList:list,
        pages:res.data.data.pages,
        isRefresherOpen:false,
        isLastPage:this.data.pageNo>=res.data.data.pages?true:false,
      })
      console.log(that.data.objectList)
      console.log(this.data.pageNo,this.data.pages)
    })


  },


  // -----------筛选框函数结束--------------

  // 滚动框的 下拉刷新事件 pullDownRefresh------------- -------------- ----------
  onRefresherRefresh:function(){
    this.getData(true)
  },
  //  --------- 滚动框：获取下一页 ------------
  getNextPage(){
    this.getData(false)
  },
  // 跳转：发起组队事件：------------- --------- ------ ------- --
  createNewPost:function(){
    let type
    if(this.data.tabIndex==0){type='sale'}
    else if(this.data.tabIndex==1){type='need'}
    wx.navigateTo({
      url: '/pages/xianyu/publish?mode=new&type='+type,
    })
  },
  }
})