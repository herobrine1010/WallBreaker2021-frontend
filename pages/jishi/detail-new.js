// miniprogram/pages/jishi/detail-new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBackground:'',
    title:'测试标题|小红帽招新',
    isPostingCollected:1,
    name : '恒兴号名称',
    theme : '主题',
    date : '发帖日期：2020年12月19日',
    content : '<p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p><p data-we-empty-p="" style="padding-left:2em;">可以任意修改<span style = "color:#c24f4a">文件</span>格式吗</p><img src="https://i.loli.net/2021/09/04/a5zkAKXo61dYSZB.jpg" style="width:200px;height:200px"><p data-we-empty-p="" style="padding-left:4em;">每行可以<font color="#8baa4a">兼容</font>不同的<font color="#f9963b">样式</font>吗？</p><p><font size="6">可以兼容</font>不同的字体吗？</p><p><span style="background-color: rgb(194, 79, 74);">兼容</span>不同的<span style="background-color: rgb(139, 170, 74);">背景</span>色？</p><p>在<u>小程序</u>里表<i>现如</i>何呢</p>',
    navTitle : '关于疫情的调查问卷',
    navImage : '',
    navUrl : ''
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

  },

  // 页面拖动事件，改变顶部导航栏的背景：
  onPageScroll: function(e){
    if(e.scrollTop>10){
      if(this.data.navBackground == ''){
        this.setData({
          navBackground:'#90B4FB'
        })
      }
    }
    else if(e.scrollTop<10){
      if(this.data.navBackground){
        this.setData({
          navBackground:''
        })
      }
    }
  },
  collect:function(){
    this.setData({
      isPostingCollected : 1
    });
    wx.showToast({
      title: '收藏成功',
      icon:'success'
    })
  },
  cancelCollect:function(){
    this.setData({
      isPostingCollected : 0
    });
    wx.showToast({
      title: '取消收藏',
      icon:'success'
    })
  },
  attachNavgitor:function(){
    wx.navigateTo({
      url: './link',
    })
  },
  addAnimation(){
    this.setData({
      animationClass : 'ani-shake-right'
    });
    setTimeout(() => {
      this.setData({
        animationClass : ''
      });
    }, 900);
  }


})