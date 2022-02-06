// pages/xianyu/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight:'auto',

    initializedByMe:true,
    type:'',
    typeName:'',
    detail:{
      initiatorAvatar:'',
      initiatorName:'破壁者1号',
      createTime:'2021年5月15日 16:34',
      starNumber:11,
      name:'TOM FORD口红',
      location:'四平',
      price_integer:299,
      price_fractional:'.50',
      content:'九成新，用了不超过5次，去年圣诞节购入，不喜欢了，蹲一个有缘人！联系我24小时发货！主要在四平交易，线上也可，不过会用比较小众的物流。九成新，用了不超过5次，去年圣诞节购入，不喜欢了，蹲一个有',
      allPicUrl:['https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jiren/team/ee2d71c472aa4c83a4fea4943eb40afbtmp_48dfa61e3c5bbc404b2cf7920dcfdd5471fc3563ac05ae81.jpg','https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jiren/team/d6e222dce9f94ac48946e51265624b9ctmp_0251c7f60b26d66855a368cae30493eed38fd484c2a4aff0.jpg','https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jiren/team/ee2d71c472aa4c83a4fea4943eb40afbtmp_48dfa61e3c5bbc404b2cf7920dcfdd5471fc3563ac05ae81.jpg','https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jiren/team/d6e222dce9f94ac48946e51265624b9ctmp_0251c7f60b26d66855a368cae30493eed38fd484c2a4aff0.jpg'],
      contactList:[{key:'微信',value:'pobier123'},{key:'电话',value:'12121212121'},{key:'QQ',value:'141415964'}]
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let typeName
    if(options.type=='sale'){
      typeName='出售'
    }else if(options.type=='need'){
      typeName='求购'
    }
    this.setData({
      type:options.type,
      typeName,
    })

    this.initializeScrollViewHeight()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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

  collectDetail:function(e){
    this.setData({
      like:true,
      ['detail.starNumber']:this.data.detail.starNumber+1,
    })
  },

  cancelCollectDetail:function(e){
    this.setData({
      like:false,
      ['detail.starNumber']:this.data.detail.starNumber-1,
    })
  },

  showContactListModal:function(e){
    this.setData({
      dialog:{
        isDialogShow: true,
        title:'该同学留下的联系方式如下\n请保护好同学隐私哦～',
        contactList:this.data.detail.contactList,
        hideCancelButton:true,
        tapOkEvent:"hideModal",
      }
    })

  },

  hideModal:function(e){
    this.setData({['dialog.isDialogShow']:false})
  },

  editDetail:function(e){
    wx.navigateTo({
      url: '/pages/xianyu/publish?mode=edit&type='+this.data.type+'&id='+this.data.detail.id,
    })
  },

  closeDetail:function(e){
    this.setData({
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
      dialog:{
        isDialogShow: true,
        title:'确认删除？',
        content:'删除后无法恢复，是否确定？',
        tapOkEvent:"confirmDeleteDetail",
      }
    })
  }
})