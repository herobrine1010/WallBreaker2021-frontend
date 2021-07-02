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
        isLabelActive : 1
      },{
        id : '1',
        title : '细节控',
        isLabelActive : 0
      },{
        id : '2',
        title : '996',
        isLabelActive : 0
      },{
        id : '3',
        title : '领导者',
        isLabelActive : 0
      },{
        id : '4',
        title : '颜王',
        isLabelActive : 0
      },{
        id : '5',
        title : '倾听者',
        isLabelActive : 0
      },{
        id : '6',
        title : '好学小白',
        isLabelActive : 1
      },{
        id : '7',
        title : '脾气好',
        isLabelActive : 0
      }
    ],
    interestLabel : [
      {
        id : '0',
        title : '编程',
        isLabelActive : 1
      },{
        id : '1',
        title : '设计',
        isLabelActive : 0
      },{
        id : '2',
        title : '文学',
        isLabelActive : 0
      },{
        id : '3',
        title : '摄影',
        isLabelActive : 0
      },{
        id : '4',
        title : '口才',
        isLabelActive : 0
      },{
        id : '5',
        title : 'PPT',
        isLabelActive : 0
      },{
        id : '6',
        title : '外语',
        isLabelActive : 1
      },{
        id : '7',
        title : '才艺',
        isLabelActive : 0
      }
    ],
    personalLabelWarn : '',
    interestLabelWarn : '',
    tempFilePaths : '../../static/icon/default-user-99px.png'
  },
  // 定义标签Label的点击事件，同时判断已经选择的
  onPersonalLabelTap : function(e){
    // console.log(e.currentTarget.dataset.index);
    const index = e.currentTarget.dataset.index;
    let labels = this.data.personalLabel;
    //判断当前选中了几个标签
    let sum = 0;
    for(let i = 0;i<labels.length;i++){
      sum += labels[i].isLabelActive;
    }
    if(sum<3){
      labels[index].isLabelActive  = 1 -  labels[index].isLabelActive;
      this.setData({
        personalLabel : labels,
        personalLabelWarn : ''
      })
    }else if(labels[index].isLabelActive === 1){//已选中3个标签后，只减不加
      labels[index].isLabelActive  = 0;
      this.setData({
        personalLabel : labels,
        personalLabelWarn : ''
      })
    }else{
      this.setData({
        personalLabelWarn : '*同类标签最多选择三个'
      })
    }
    
  },
  onInterestLabelTap : function(e){
    // console.log(e.currentTarget.dataset.index);
    const index = e.currentTarget.dataset.index;
    let labels = this.data.interestLabel;
    //判断当前选中了几个标签
    let sum = 0;
    for(let i = 0;i<labels.length;i++){
      sum += labels[i].isLabelActive;
    }
    if(sum<3){
      labels[index].isLabelActive  = 1 -  labels[index].isLabelActive;
      this.setData({
        interestLabel : labels,
        interestLabelWarn : ''
      })
    }else if(labels[index].isLabelActive === 1){//已选中3个标签后，只减不加
      labels[index].isLabelActive  = 0;
      this.setData({
        interestLabel : labels,
        interestLabelWarn : ''
      })
    }else{
      this.setData({
        interestLabelWarn : '*同类标签最多选择三个'
      })
    }
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
    console.log(e.detail.value);
    this.setData({
      formData:e.detail.value
    })
  },
  btnTap:function(){

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