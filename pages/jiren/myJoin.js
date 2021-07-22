// pages/jiren/myJoin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amIAccepted:true,
    acceptTeamList:[
      {
      'labelText':'未分类',
      'title':'示例标题示例标题示例标题…',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'description':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有图片的时候该怎么拉伸……',
      'initiator':'示例用户',
      'peopleCount':'3/5',
      'postingPic':'a'
      },{
        'labelText':'未分类',
        'title':'示例标题示例标题示例标题…',
        'dueTime':'截止时间: 2021年6月21日 14:00',
        'description':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有 图片的时候该怎么拉伸……',
        'initiator':'示例用户',
        'peopleCount':'3/5',
        'postingPic':'a'
      },{
        'labelText':'未分类',
        'title':'示例标题示例标题示例标题…',
        'dueTime':'截止时间: 2021年6月21日 14:00',
        'description':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有 图片的时候该怎么拉伸……',
        'initiator':'示例用户',
        'peopleCount':'3/5',
        'postingPic':'a'
      },{
        'labelText':'未分类',
        'title':'示例标题示例标题示例标题…',
        'dueTime':'截止时间: 2021年6月21日 14:00',
        'description':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有 图片的时候该怎么拉伸……',
        'initiator':'示例用户',
        'peopleCount':'3/5',
        'postingPic':'a'
      },{
        'labelText':'未分类',
        'title':'示例标题示例标题示例标题…',
        'dueTime':'截止时间: 2021年6月21日 14:00',
        'description':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有 图片的时候该怎么拉伸……',
        'initiator':'示例用户',
        'peopleCount':'3/5',
        'postingPic':'a'
      }
    ],
    applyingTeamList:[
      {
      'labelText':'申请中',
      'title':'示例标题示例标题示例标题…',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'description':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有图片的时候该怎么拉伸……',
      'initiator':'示例用户',
      'peopleCount':'3/5',
      'postingPic':'a'
      },{
        'labelText':'申请中',
        'title':'示例标题示例标题示例标题…',
        'dueTime':'截止时间: 2021年6月21日 14:00',
        'description':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有 图片的时候该怎么拉伸……',
        'initiator':'示例用户',
        'peopleCount':'3/5',
        'postingPic':'a'
      },{
        'labelText':'申请中',
        'title':'示例标题示例标题示例标题…',
        'dueTime':'截止时间: 2021年6月21日 14:00',
        'description':'这是一段描述性文字，仅用于测试。这是一段可以换行的文字，但是没有 图片的时候该怎么拉伸……',
        'initiator':'示例用户',
        'peopleCount':'3/5',
        'postingPic':'a'
      }
    ]
  },
  onBtnTap: function(){
    let state = !this.data.amIAccepted;
    this.setData({
      amIAccepted:state
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