// pages/tongde/main.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    tabIndex: 0, // 当前swiper选中项目
    tab: 0, //当前tab对应的项目
    showGoTopButton:false,
    topNum:0,
    tongdeItemList:[
      {
        'labelText':['雨伞','口红'],
        'title':'Gucci口红',
        'publishTime':'1天前',
        'description':'在学校图书馆捡到一支Gucci的口红，没有用过多少，九成新，…',
        'postingPic':'/static/icon/lost-test.png',
        'type': 0,       // 物品遗失0 or 失物寻主1 
        'closed': false
      },
      {
        'labelText':['雨伞','口红','手机'],
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'/static/icon/lost-test2.png'
      },
      
      {
        'labelText':['雨伞','口红'],
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'/static/icon/lost-test.png'
      },
      {
        'labelText':['雨伞','口红'],
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'/static/icon/lost-test.png'
      },
      {
        'labelText':['雨伞','口红'],
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'/static/icon/lost-test.png'
      },
      {
        'labelText':['雨伞','口红'],
        'title':'物品名称',
        'publishTime':'1天前',
        'description':'简要描述简要描述简要描述捡到东西的地方是哪里…',
        'postingPic':'/static/icon/lost-test.png'
      },
    
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 绑定在点击tab上函数，通过点击切换swiper
  changeItem: function(e) {

    this.setData({
      tabIndex: e.currentTarget.dataset.item
    }
    )

  },
  // 绑定在swiper上的函数，用来改变tab
  changeTab: function(e) {
    var current = e.detail.current;
    console.log('current',current);
    // TODO 根据current不同的值发送不同的请求，获取不同的数据列表
    this.setData({
      tab: e.detail.current
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
  createNewPost:function(){
    wx.navigateTo({
      url: '/pages/tongde/creatPost',
    })
  },
  
})