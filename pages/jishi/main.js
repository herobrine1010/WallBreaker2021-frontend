// pages/jishi/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGoTopButton:false, 
    timeIndex:'asc',
    topNum:0,
    conditionIndex:'',
    conditionFilterOpen:false,
    conditions:['竞赛','学术科研','一起造梦','其他'],
    conditionsSelected:[false,false,false,false],
    jishiItemList:[
      {
      'labelText':'未分类',
      'title':'示例标题示例标题示例标题…',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'rightTagText':'我发起的',
      'userAvatar':'/static/icon/default-user.png',
      'userName':'示例用户',
      'publishTime':'1天前'
    },
    {
      'labelText':'未分类',
      'title':'示例标题示例标题示例标题…',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'rightTagText':'',
      'userAvatar':'/static/icon/default-user.png',
      'userName':'示例用户',
      'publishTime':'1天前'
    },
    {
      'labelText':'未分类',
      'title':'示例标题示例标题示例标题…',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'rightTagText':'',
      'userAvatar':'/static/icon/default-user.png',
      'userName':'示例用户',
      'publishTime':'1天前'
    },

    {
      'labelText':'未分类',
      'title':'示例标题示例标题示例标题…',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'rightTagText':'我发起的',
      'userAvatar':'/static/icon/default-user.png',
      'userName':'示例用户',
      'publishTime':'1天前'
    },
    {
      'labelText':'未分类',
      'title':'示例标题示例标题示例标题…',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'rightTagText':'',
      'userAvatar':'/static/icon/default-user.png',
      'userName':'示例用户',
      'publishTime':'1天前'
    },
    {
      'labelText':'未分类',
      'title':'示例标题示例标题示例标题…',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'rightTagText':'',
      'userAvatar':'/static/icon/default-user.png',
      'userName':'示例用户',
      'publishTime':'1天前'
    },
    {
      'labelText':'未分类',
      'title':'示例标题示例标题示例标题…',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'rightTagText':'',
      'userAvatar':'/static/icon/default-user.png',
      'userName':'示例用户',
      'publishTime':'1天前'
    },
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 //0,1,2 0-济事  1-济人  2-我的
      })
   }

  },
  jumpToDetail:function(){
    wx.navigateTo({
      url: '/pages/jishi/detail',
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
  onPageScroll:function(e){
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
    this.onLoad();
  },
  clickConditionGray:function(e){
    let keyword=e.currentTarget.dataset.condition;
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
    this.onLoad()
  },
  clickTimeIndex:function(){
    if(this.data.timeIndex=='asc'){
      this.setData({'timeIndex':'desc'})
    }
    else if(this.data.timeIndex=='desc'){
      this.setData({'timeIndex':'asc'})
    }
    this.onLoad()
  },
  clickShade2:function(){
    if(this.data.conditionFilterOpen){
      this.setData({conditionFilterOpen:false})
    }
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
     if(this.data.showGoTopButton==false){
       this.setData({showGoTopButton:true})
     }
   }


})