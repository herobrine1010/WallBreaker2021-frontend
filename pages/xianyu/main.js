// pages/xianyu/main.js
import {request} from "../../request/request.js";
import {parseDetail} from "./tool.js"
import {formatTime, getDateDiff} from "../../utils/util.js";
var app=getApp();


// 引入各类behaviors
const behaviorsPath = "../../behaviors/"
const scrollBehavior = require(behaviorsPath + "ScrollView.js");
const searchBehavior = require(behaviorsPath + "Search.js");
const setHeight = require("../../behaviors/SetHeight.js")

const zoneMap={56:'四平',57:'嘉定',58:'彰武',60:'沪西',61:'沪北',59:'铁岭',63:'线上',62:'不限地点'}
// 定义函数编写请求参数：-----------------------------------------
Component({
  behaviors: [scrollBehavior, searchBehavior,setHeight],
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:0,
    scrollViewHeight:'0',

    zoneMap:zoneMap,
    zoneList:[
      {id:56,value:'四平',},
      {id:57,value:'嘉定'},
      {id:58,value:'彰武'},
      {id:60,value:'沪西'},
      {id:61,value:'沪北'},
      {id:59,value:'铁岭'},
      {id:63,value:'线上'},
      {id:62,value:'不限地点'},
      {id:null,value:'全部帖子',},
    ],
    zoneIndex:8,
    navigationList:[
      {id:null,value:'全部'},
      {id:64,value:'图书'},
      {id:65,value:'美妆'},
      {id:66,value:'日用'},
      {id:67,value:'数码'},
      {id:68,value:'虚拟商品'},
      {id:69,value:'票务'},
      {id:70,value:'服饰'},
      {id:71,value:'出行'},
      {id:72,value:'其他'}],
    navigationIndex:0,

    objectList:[],

    pageNo:1,

    keyword: undefined,
    id: null, // selected labels id
    current: 1,
    isLastPage: false
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
  onShow:function(options){
    if(app.globalData.xianyuRefresh){
      app.globalData.xianyuRefresh=false
      this.getData(true)
    }
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
          scrollViewHeight:height+'px',
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
        zoneIndex:8,
        navigationIndex:0,
        zonePickerShow:false,
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
    this.getData(true)
  },


  changeCategory:function(e){
    this.setData({navigationIndex:e.currentTarget.dataset.index})
    this.getData(true)
  },
  getData:function(reset=false){
    if(this.data.loading)return
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

    this.setData({loading:true})

    let that=this
    let params={
      pageNo:this.data.pageNo,
      type:this.data.tabIndex,
      pageSize:this.data.tabIndex?12:8,
      deleted:0,
    }
    if(this.data.keyword)params.keyword=this.data.keyword
    console.log(params)
    let zoneId=this.data.zoneList[this.data.zoneIndex].id
    if(zoneId)params.location=zoneId
    let categoryId=this.data.navigationList[this.data.navigationIndex].id
    if(categoryId)params.category=categoryId

    return request({
      url: '/market/GetMarketWithPage',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method : 'GET',
      data: params
    }).then(res=>{
      console.log(res)
      let list=that.data.objectList
      list=list.concat(res.data.data.records.map(item=>parseDetail(item)))
      that.setData({
        loading:false,
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
  goToPublishPage:function(){
    let type
    // if(this.data.tabIndex==0){type='sale'}
    // else if(this.data.tabIndex==1){type='need'}
    wx.navigateTo({
      url: '/pages/xianyu/publish?mode=new&type='+this.data.tabIndex,
    })
  },
  }
})