// components/card/card.js.js
Component({

  properties:{
    labelText:{ 
      type:String,
      value:'未分类'
    },
    title:{
      type:String,
      value:'示例标题'
    },
    rightTagText:{
      type : String,
      value : ''
    },
    userAvatar:{
      type:String,
      value:'/static/icon/default-user.png'
    },
    userName:{
      type:String,
      value:'示例用户'
    },
    publishTime:{
      type:String,
      value:'1天前'
    },
    postingPic:{
      type:String,
      value:''
    },
    description:{
      type:String,
      value:'这是一段描述性文字，仅用于测试。'
    },
    lineMode : {
      type:String,
      value: 'normal'
    }


  },
  /**
   * 页面的初始数据
   */
  data: {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})