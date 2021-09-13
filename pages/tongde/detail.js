// pages/tongde/detail.js
/**
 * 2021-8-19
 * Q:
 * 联系方式是只
 * 
 */
import { request } from "../../request/request.js";
function formatDateString(str) {
  // 将接口返回的日期字符串'2021-7-13 21:34:31'转换成'2021年7月13日 21:34:31'
  let dateStr = str.split(' ');
  let date = dateStr[0].split('-');
  return date[0] + '年' + date[1] + '月' + date[2] + '日' + ' ' +dateStr[1];
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:'寻物中',/* 别的状态(?) */
    title:'物品名称物品名称物品名称',
    userAvatar:'/static/icon/default-user-big.png',
    userName:"破壁者1号",
    time:'2021年6月9日 21:40',
    tag:['#雨伞','#其他'],
    description:"我国《物权法》规定，权利人领取遗失物时，应当向拾得人或有关部门支付保管费等必要费用。但现行民事法律和最高人民法院的司法解释，都没有对报酬请求权给出规定。中国的拾到者不享有报酬请求权，但不排除有些失主在取回失物时，主动给付拾得人一定报酬。这是失主自愿行为，属民法中的赠与。再根据我国《民法通则》第七十九条规定，拾到遗失物、漂流物或者失散的饲养动物，应当归还失主，因此而支出的费用由失主偿还。也就是说，拾得的财物其所有权人仍为失主，而不是拾到财物的人，所有权不因为财物遗失而发生转移，因而拾到财物必须归还失主。至于酬金，双方可以友好协商。",
    location:'图书馆二楼走道第二块瓷砖和第三块瓷砖的缝隙旁捡到',
    contact:'1561533343',
    type:0,//物品遗失0 失物寻主1
    closed:false,
    pictures:['/static/icon/lost-test2.png','/static/icon/lost-test.png','','','','','',''],

    personalInfo:{
        "avatar":"https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02",
        "nickname":"小砂糖星!",
        "wxId":"abcdefg123456789",
        "description":"START:DASH!",
        "school":"建筑学院",
        "major":"风景园林",
        "grade":"2018级",
        "identity":"本科生",

        "wxIdPublic":true,
        "schoolPublic":true,
        "majorPublic":true,
        "gradePublic":true,
        "identityPublic":true,

        "personalLabel":['细节控','好学小白','996'],
        "interestLabel":['口才','设计','文字'],
        "isCheckAnswerButtonShow":false,
      },

    dialog:{
      isDialogShow: false,
      content:'该同学所留联系方式如下，请保护好同学隐私噢',
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      isShowInfo:true,
      // 加载页面时先把数据更新到contact上,点击弹出对话框事件后再更新到infoDetail
      infoDetail:{
        key:"微信",
        value:"124kjkajsd",
        copyEnable:true
      }
    
      /*tapOkEvent:"dialogTapOkForAcceptApplying"*/
    },
  },
  showPersonDetail:function(e){
    this.selectComponent("#personalAnimation1").showModal();
  },
  tapCopy:function(e){
    var that = this;
    let info = that.data.dialog.infoDetail.value;
    console.log(info)
    wx.setClipboardData({
      data: info,
      success:function(res){
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  contactDetail:function(e){
    //需要获得发布者的联系信息
    var that = this;
    let str = 
    that.setData({
      'dialog.isDialogShow':true,
      'dialog.infoDetail.value': this.data.contact
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url: '/lostfound/getLostFound/1', // TODO:根据主页点击情况跳转
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      },
      method : 'GET',
    }).then(res => {
      let data = res.data.data;
      console.log('获取失物招领列表返回数据', data)
      this.setData({
        condition: data.typeText, // 目前接口该项为null 应为 寻物中 寻主中
        title: data.name,
        userAvatar:'/static/icon/default-user-big.png',
        userName:"破壁者1号",
        time: formatDateString(data.lostFoundTime), // 自定义函数转换日期格式
        tag: data.labelText,
        description: data.content,
        location:data.location,
        contact: data.contact,
        type: data.type,//物品遗失0失物寻主1
        closed: data.closed,
        pictures: data.allPicUrl.split(','), //字符串拆成列表
      });
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '请求失败',
        icon : 'error'
      })
    })
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