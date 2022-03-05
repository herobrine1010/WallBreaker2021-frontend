// pages/introduction/introduction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productHead : "关于济星云",
    productBody : "济星云是由同济大学破壁工作室开发的一个校园信息整合分发、跨专业交流组队的平台。\n在济星云，每位用户可以根据个人的个性化信息标签，查收校内各学院、部门、学生组织或社团的最新消息，更便捷地了解校内信息；也可以发布或查看基于不同主题（竞赛、科研、创业、生活等）的组队招募信息，在校内找到志同道合的朋友。",
    teamHead : "关于破壁工作室",
    teamBody : "破壁工作室成立于2021年6月，以“破壁”为团队理念，通过开发的互联网校园产品——“济星云”助力跨专业、跨学院、跨校区的交流，服务同济师生的学习生活。目前初期团队成员来自同济大学各个学院，包含电信、土木、艺传、建筑、环境、交通、软件、经管、汽车、职教等。",
    officialAccountHead : "",
    contactUsHead : "联系我们",
    contactUsBody : "联系人及其微信号：\n达芬奇　HiTachi_0822\n二郎　shen289101615",
    pobyWords : "“面壁十年图破壁，难酬蹈海亦英雄”——周恩来\n 破壁计划——《三体》",
    pictures:['https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/posting/1df021235c454360b04f27753b963ae5offocoal-account.jpg','https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/posting/609d8f0e3954405f8c8a055356d53a36offocoal-account-meme.png','https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/posting/635a2239bbd74d20959e4d43601869ccapply.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initializeScrollViewHeight()
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


  previewImage: function (e) {
    console.log('ok')
    wx.previewImage({
      urls: this.data.pictures,
      current: this.data.pictures[e.currentTarget.dataset.index]
    })
  }
})