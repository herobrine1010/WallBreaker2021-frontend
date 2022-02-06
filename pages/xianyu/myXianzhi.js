// pages/xianyu/myXianzhi.js
const setHeight = require("../../behaviors/SetHeight.js")

Component({
  behaviors: [setHeight],

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:1,
    scrollViewHeight:'auto',

    zoneList:['四平','嘉定','彰武','沪西','沪北','铁岭','线上','不限地点','全部帖子'],
    zoneIndex:8,
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    }],
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
      })
      // this.clearInput()
      // this.getData(true)
    }
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


  editDetail:function(e){
    let type
    if(this.data.tabIndex==0){
      type='sale'
    }else if(this.data.tabIndex==1){
      type='need'
    }
    wx.navigateTo({
      url: '/pages/xianyu/publish?mode=edit&type='+type+'&id='+e.currentTarget.dataset.id,
    })
  },

  closeDetail:function(e){
    this.setData({
      targetId:e.currentTarget.dataset.id,
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
      dialog:{
        isDialogShow: true,
        title:'确认删除？',
        content:'删除后无法恢复，是否确定？',
        tapOkEvent:"confirmDeleteDetail",
      }
    })

  }
  }
})