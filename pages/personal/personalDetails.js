// pages/personalDetails/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalLabel : [
      {
        id : '0',
        title : '点子王',
        isLabelActive : true
      },{
        id : '1',
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
        isLabelActive : false
      },{
        id : '7',
        title : '脾气好',
        isLabelActive : false
      }
    ],
    interestLabel : [
      {
        id : '0',
        title : '编程',
        isLabelActive : false
      },{
        id : '1',
        title : '设计',
        isLabelActive : false
      },{
        id : '2',
        title : '文学',
        isLabelActive : false
      },{
        id : '3',
        title : '摄影',
        isLabelActive : false
      },{
        id : '4',
        title : '口才',
        isLabelActive : false
      },{
        id : '5',
        title : 'PPT',
        isLabelActive : false
      },{
        id : '6',
        title : '外语',
        isLabelActive : true
      },{
        id : '7',
        title : '才艺',
        isLabelActive : false
      }
    ],
    tempFilePaths : '../../static/icon/default-user-big.png',
    userDetails: {
      nickname: '默认昵称',
      qualification:'本科',
      isQualificationVisible: true,
      grade: '20级',
      isGradeVisible: false,
      college: '土木工程学院',
      isCollegeVisible: false,
      major: '防灾减灾工程',
      isMajorVisible: false,
      wxId: 'wxid-25536748',
      briefIntroduction: '理工科钢铁直男一枚~'
    },
    // nickname: '默认昵称',
    // qualification:'本科',
    // isQualificationVisible: true,
    // grade: '20级',
    // isGradeVisible: false,
    // college: '土木工程学院',
    // isCollegeVisible: false,
    // major: '防灾减灾工程',
    // isMajorVisible: false,
    // wxId: 'wxid-25536748',
    // briefIntroduction: '理工科钢铁直男一枚~'
  },
  //定义更换头像事件 changeImage
  changeImage : function(){
    var self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        self.setData({
          tempFilePaths
        })
      }
    })

  },
  // 定义表单提交事件 formSubmit
  formSubmit : function(e){
    this.setData({
      userDetails:e.detail.value
    })
    console.log(this.data.userDetails);
  },
  btnTap:function(){
    //从label-selector组件中拿到数据
    const personalLabelData = this.selectComponent('#personalLabel').data;
    console.log(personalLabelData);
    const interestLabelData = this.selectComponent('#interestLabel').data;
    console.log(interestLabelData);
    wx.showToast({
      title: '提交成功',
      icon:'success'
    })
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