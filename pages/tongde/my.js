// pages/tongde/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myLostFoundItemList:[
      {
      'id': '10', //跳转用
      'labelContent': ['水杯','钱包'],
      'title':'示例标题示例标题',
      'type': 0,
      'postingDate':'2021年6月21日',
      'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
      'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
      'closed': false
      },
      {
        'id': '11', //跳转用
        'labelContent': ['水杯','钱包'],
        'title':'示例标题示例标题',
        'type': 0,
        'postingDate':'2021年6月21日',
        'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
        'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
        'closed': false
      },
      {
        'id': '11', //跳转用
        'labelContent': ['水杯','钱包'],
        'title':'示例标题示例标题',
        'type': 0,
        'postingDate':'2021年6月21日',
        'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
        'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
        'closed': false
      },
      {
        'id': '10', //跳转用
        'labelContent': ['水杯','钱包'],
        'title':'示例标题示例标题',
        'type': 0,
        'postingDate':'2021年6月21日',
        'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
        'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
        'closed': false
        },
        {
          'id': '11', //跳转用
          'labelContent': ['水杯','钱包'],
          'title':'示例标题示例标题',
          'type': 0,
          'postingDate':'2021年6月21日',
          'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
          'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
          'closed': false
        },
        {
          'id': '11', //跳转用
          'labelContent': ['水杯','钱包'],
          'title':'示例标题示例标题',
          'type': 0,
          'postingDate':'2021年6月21日',
          'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
          'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
          'closed': false
        },
        {
          'id': '11', //跳转用
          'labelContent': ['水杯','钱包'],
          'title':'示例标题示例标题',
          'type': 0,
          'postingDate':'2021年6月21日',
          'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
          'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
          'closed': false
        },
        {
          'id': '10', //跳转用
          'labelContent': ['水杯','钱包'],
          'title':'示例标题示例标题',
          'type': 0,
          'postingDate':'2021年6月21日',
          'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
          'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
          'closed': false
          },
          {
            'id': '11', //跳转用
            'labelContent': ['水杯','钱包'],
            'title':'示例标题示例标题',
            'type': 0,
            'postingDate':'2021年6月21日',
            'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
            'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
            'closed': false
          },
          {
            'id': '11', //跳转用
            'labelContent': ['水杯','钱包'],
            'title':'示例标题示例标题',
            'type': 0,
            'postingDate':'2021年6月21日',
            'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
            'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
            'closed': false
          }
    ],
    dialog:{
      isDialogShow: false,
      content:'该条信息关闭后不可重启，确定要关闭吗?',
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      isShowInfo:false,
      /*tapOkEvent:"dialogTapOkForAcceptApplying"*/
    },

  },
  tapClose:function(e){
    //关闭帖子，提示是否确认关闭
    var that = this;
    that.setData({
      'dialog.isDialogShow':true,
      
    })
  },
  tapOk:function(e){
    var that = this;
    console.log(e)
    wx.showToast({
      title: '成功关闭帖子',
    })
    //TODO 根据帖子的id显示关闭按钮
    that.setData({
      'myLostFoundItemList[0].closed':true
    },that.onLoad());
    this.onLoad();
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})