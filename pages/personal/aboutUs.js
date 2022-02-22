// pages/introduction/introduction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productHead: "关于济星云",
    productBody: "济星云是由同济大学破壁工作室开发的一款校内互联网产品，力图打造成为“同济人的学习生活圈”，在未来将分多期迭代开发，最终成为由PC网页端+移动小程序端+web中台组成的互联网产品。\n\n济星云1.0中，有以下三个基本功能：\n济事广场——信息发布：拒绝校园信息来源繁杂，查看校园各社团、组织的最新消息\n济人广场——组队平台：万物皆可以组队，发布组队招募信息并参与不同类型的组队\n同德广场——失物招领：丢了东西很着急，在这里发布失物招领信息、寻找丢失物品\n\n济星云的未来，我们将继续围绕同济师生的实际需求痛点，开发更多实用、有趣的功能（欢迎在后台留言说出你的需求！！！）。在“同济人的学习生活圈”，我们力图打破多个校区地理上的壁垒、打破不同专业学科上的壁垒，打破校园信息流通上的壁垒，使大家在同济的学习与生活更便捷、更紧密、更美好。",
    teamHead: "关于破壁工作室",
    teamBody: "同济大学破壁工作室（Tongji Poby）成立于2021年6月，由同济大学信息化办公室指导。目前下设5个小组，产品组、设计组、程序组、运营组和项目组。团队成员包含本科生和研究生，覆盖软件、电信、环境、土木、建筑、设创、汽车、经管、职教等多个学院。我们秉持“打破壁垒”的理念，携手实践更多有趣、有价值的事服务同济师生，目前，除了济星云产品外，我们也运营了“破济er壁”微信公众号及表情包艺术家主页，欢迎关注！",
    officialAccountHead: "",
    contactUsHead: "加入我们",
    contactUsBody: "欢迎对程序开发、互联网、大数据、新媒体、人工智能、产品设计等方向感兴趣的同学加入我们，一起学习交流并实践更多有趣的想法和创意。我们相信在未来传承的过程中，会孕育出更多优秀的团体同舟共济，奔赴天下。\n\n",
    pobyWords: "“面壁十年图破壁，难酬蹈海亦英雄”——周恩来\n 破壁计划——《三体》",
    pictures: ['https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/posting/1df021235c454360b04f27753b963ae5offocoal-account.jpg', 'https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/posting/609d8f0e3954405f8c8a055356d53a36offocoal-account-meme.png', 'https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/posting/635a2239bbd74d20959e4d43601869ccapply.png']
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


  previewImage: function (e) {
    console.log('ok')
    wx.previewImage({
      urls: this.data.pictures,
      current: this.data.pictures[e.currentTarget.dataset.index]
    })
  }
})