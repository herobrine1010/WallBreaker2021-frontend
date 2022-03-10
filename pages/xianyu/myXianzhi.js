// pages/xianyu/myXianzhi.js
import {request} from "../../request/request.js";
import {parseDetail} from "./tool.js"
const app=getApp()
const setHeight = require("../../behaviors/SetHeight.js")

const saleStatusList=[
  {id:null,value:'全部'},
  {id:0,value:'出售中'},
  {id:1,value:'已出售'}
]
const needStatusList=[
  {id:null,value:'全部'},
  {id:0,value:'求购中'},
  {id:1,value:'已收购'}
]

Component({
  behaviors: [setHeight],

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:0,
    scrollViewHeight:'auto',

    pageNo:1,
    loading:false,

    statusList:saleStatusList,
    statusIndex:0,
    zonePickerShow:false,

    objectList:[{
      initiatorAvatar:'',
      initiatorName:'破壁者1号',
      createTime:'2021年5月15日 16:34',
      starNumber:11,
      name:'TOM FORD口红',
      location:'四平',
      status:'已售出',
      firstPicUrl:'https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jiren/team/ee2d71c472aa4c83a4fea4943eb40afbtmp_48dfa61e3c5bbc404b2cf7920dcfdd5471fc3563ac05ae81.jpg',
      statusColor:'#3A3042',
      price_integer:299,
      price_fractional:'.50',
      time:'1天前',
      content:'九成新，用了不超过5次，去年圣诞节购入，不喜欢了，蹲一个有缘人！联系我24小时发货！主要在四平交易，线上也可，不过会用比较小众的物流。九成新，用了不超过5次，去年圣诞节购入，不喜欢了，蹲一个有',
      allPicUrl:[],
    },],
    dialog:{
      isDialogShow: false,
      title:'确认下架？',
      content:'下架后帖子不会出现在校\n园闲鱼页面，是否确定？',
      tapOkEvent:"dialogTapOkForAcceptAllApplications"
    },
  },

  methods:{

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(true)
  },

  onShow:function(options){
    if(app.globalData.xianyuRefresh){
      app.globalData.xianyuRefresh=false
      this.getData(true)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
        statusIndex:0,
        statusPickerShow:false,
      })
      if(this.data.tabIndex==1){
        this.setData({statusList:needStatusList})
      }else{
        this.setData({statusList:saleStatusList})
      }

      this.clearInput()
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

  changeStatusPickerStatus:function(e){
    this.setData({statusPickerShow:!this.data.statusPickerShow})
  },

  changeStatus:function(e){
    this.setData({
      statusIndex:e.currentTarget.dataset.index,
      statusPickerShow:false,
    })
    this.getData(true)
  },

  getData:function(reset=false){
    if(this.data.loading) return
    this.setData({loading:true})
    console.log('getdata')
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
      pageSize:8,
      deleted:0,
    }
    console.log(params)
    if(this.data.keyword)params.keyword=this.data.keyword
    let statusValue=this.data.statusList[this.data.statusIndex].id
    if(statusValue)params.hidden=statusValue

    let tabIndex=this.data.tabIndex
    let url
    if(tabIndex==0||tabIndex==1){
      url='/userMarket/getMyMarketWithPage'
      params.type=tabIndex
    }else{
      url='/userFavouriteMarket/getMyFavouriteMarketWithPage'
    }

    request({
      url: url,
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
          ...parseDetail(item),
          ...judgeStatus(this.data.tabIndex,item.hidden)
        }
      }))
      that.setData({
        objectList:list,
        pages:res.data.data.pages,
        isRefresherOpen:false,
        isLastPage:this.data.pageNo>=res.data.data.pages?true:false,
        loading:false,
      })
      console.log(that.data.objectList)
      console.log(this.data.pageNo,this.data.pages)
    })


  },
  
  
  goToDetail:function(e){
    let typeIndex=this.data.tabIndex
    if(typeIndex==2){
      typeIndex=0
      if(this.data.objectList[e.currentTarget.dataset.index].status=='已售出'){
        this.setData({
          dialog:{
            isDialogShow: true,
            title:'帖子已下架',
            content:'该物品已售出，帖子已下架，同学可以去校园闲鱼查看更多好物哦！',
            tapOkEvent:"none",
            hideCancelButton:true,
          }
        })
        return
      }
    } 
    wx.navigateTo({
      url: '/pages/xianyu/detail?id='+e.currentTarget.dataset.id+'&type='+typeIndex+'&mode=edit',
    })
  },

  editDetail:function(e){
    // let type
    // if(this.data.tabIndex==0){
    //   type='sale'
    // }else if(this.data.tabIndex==1){
    //   type='need'
    // }
    wx.navigateTo({
      url: '/pages/xianyu/publish?mode=edit&type='+this.data.tabIndex+'&id='+e.currentTarget.dataset.id+'&detail='+e.currentTarget.dataset.detail,
    })
  },

  closeDetail:function(e){
    this.setData({
      targetId:e.currentTarget.dataset.id,
      targetIndex:e.currentTarget.dataset.index,
      dialog:{
        isDialogShow: true,
        title:'确认下架？',
        content:'下架后帖子不会出现在校\n园闲鱼页面，是否确定？',
        tapOkEvent:"confirmCloseDetail",
      }
    })
  },

  deleteDetail:function(e){
    this.setData({
      targetId:e.currentTarget.dataset.id,
      targetIndex:e.currentTarget.dataset.index,
      dialog:{
        isDialogShow: true,
        title:'确认删除？',
        content:'删除后无法恢复，是否确定？',
        tapOkEvent:"confirmDeleteDetail",
      }
    })

  },

  confirmCloseDetail:function(e){
    let that=this
    request({
      url: '/userMarket/hideMyMarket',
      header: {
        'content-type': 'application/json',
      },
      method : 'POST',
      data: {
        id:this.data.targetId
      }
    }).then(res=>{
      console.log(res)
      if(res.statusCode==200){
        wx.showToast({
          title: '成功',
          icon:'success',
        })
        let objectList=that.data.objectList
        let index=that.data.targetIndex
        objectList[index]={
          ...objectList[index],
          ...judgeStatus(that.data.tabIndex,1),
        }
        that.setData({objectList})
      }
    })
  },

  confirmDeleteDetail:function(e){
    let that=this
    request({
      url: '/userMarket/deleteMyMarket/'+this.data.targetId,
      header: {
        'content-type': 'application/json',
      },
      method : 'POST',
    }).then(res=>{
      console.log(res)
      if(res.statusCode==200){
        wx.showToast({
          title: '成功',
          icon:'success',
        })
        let objectList=that.data.objectList
        let index=that.data.targetIndex
        objectList.splice(index,1)
        that.setData({objectList})
      }
    })
  },

  cancelLike:function(e){
    let that=this
    request({
      url: '/userFavouriteMarket/RemoveFromMyFavouriteMarket/' + e.currentTarget.dataset.id,
      method: 'DELETE',
      header: {
        'content-type': 'application/json'
      },
    }).then(res=>{
      console.log(res)
      if(res.data.success){
        wx.showToast({
          title: '成功',
          icon:'success',
        })
        let objectList=that.data.objectList
        let index=that.data.targetIndex
        objectList.splice(index,1)
        that.setData({objectList})
    
      }
    })
  },

  onRefresherRefresh:function(e){
    this.getData(true)
  },

  getNextPage:function(e){
    this.getData(false)
  },

  none:function(e){

  },

  }
})

function judgeStatus(tabIndex,value){
  if(tabIndex==0||tabIndex==2){
    if(value){
      return {
        status:'已售出',
        statusColor:'#3A3042',
      }
    }else{
      return {
        status:'出售中',
        statusColor:'#957D95',
      }
    }
  }else if(tabIndex==1){
    if(value){
      return {
        status:'已收购',
        statusColor:'#3A3042',
      }
    }else{
      return {
        status:'求购中',
        statusColor:'#957D95',
      }
    }
  }
}