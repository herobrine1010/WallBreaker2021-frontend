// pages/testPage2/testPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalLabels : [
      {
        id : '0',
        title : '点子王',
        isLabelActive : true
      },{
        id : '999',
        title : '细节控',
        isLabelActive : false
      },{
        id : '2',
        title : '996',
        isLabelActive : false
      },{
        id : '3',
        title : '领导者',
        isLabelActive : false
      },{
        id : '4',
        title : '颜王',
        isLabelActive : false
      },{
        id : '5',
        title : '倾听者',
        isLabelActive : false
      },{
        id : '6',
        title : '好学小白',
        isLabelActive : true
      },{
        id : '7',
        title : '脾气好',
        isLabelActive : false
      }
    ],
    personBrief : {
      nickname: '默认昵称',
      college: '土木工程',
      major: '防灾减灾',
      grade: '2020级',
      qualification: '研究生'
    }
    
  },



  // 测试从组件中获取数据
  btnTap: function()  {
    const childData = this.selectComponent('#personal-label').data;
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


})