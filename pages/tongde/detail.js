// pages/tongde/detail.js
/**
 * 2021-8-19
 * Q:
 * 联系方式是只
 * 
 */
import { request } from "../../request/request.js";
const app = getApp();
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
    title:'遗失物品',
    userAvatar:'/static/icon/default-user-big.png',
    userName:"破壁者1号",
    time:'2021年6月9日 21:40',
    tag:['#雨伞','#其他'],
    description:"数据加载中...",
    location:'数据加载中...',
    number:'15615333420',
    type:0,//物品遗失0 寻找失主1
    closed:false,
    pictures:['/static/icon/tongde-loading-image.jpg','','','','','','',''],
    userId: 10,
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
      content:'该同学所留联系方式如下\n请保护好同学隐私噢',
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      isShowInfo:true,
      // 直接更新数据
      infoDetail:{
        Key:"微信：",
        copyEnable:true,
        Value:"112luizjk",
      }
    
      /*tapOkEvent:"dialogTapOkForAcceptApplying"*/
    },
  },
  showPersonDetail:function(e){
    let that = this;
    // 获取头像信息
    wx.request({
      url: app.globalData.url+'/user/userInfo',
      data:{
        userId: this.data.userId
      },
      success:function(res){
        let data=res.data.data;
        let personalInfo={
          'initiator':data.initiator,
          'me':data.me,
          'avatar':data.avatarUrl,
          'id':data.id,
          'nickname':data.nickName,
          'wxId':data.wxId,
          'description':data.description,
          'school':data.school,
          'major':data.major,
          'grade':data.grade,
          'identity':data.identification,

          'wxIdPublic':data.wxIdPublic,
          'schoolPublic':data.schoolPublic,
          'majorPublic':data.majorPublic,
          'gradePublic':data.gradePublic,
          'identityPublic':data.identityPublic,

          'personalLabel':(data.personalLabel?data.personalLabel.map(it => it.content):[]),
          'interestLabel':(data.interestLabel?data.interestLabel.map(it => it.content):[]),
        }
        that.setData({personalInfo})
      }
    })
    this.selectComponent("#personalAnimation1").showModal();
  },
  tapCopy:function(e){
    let that = this;
    let info = that.data.dialog.infoDetail.Value;
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
    that.setData({
      'dialog.isDialogShow':true,
      // 'dialog.infoDetail.value': this.data.contact
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.lostfoundId;
    request({
      url: '/lostfound/getLostFound/' + id,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
         
      },
      method : 'GET',
    }).then(res => {
      let data = res.data.data;

      const typeText = ["寻物中","寻主中"];
      const contactTypeText = [
        {
          "id": 38,
          "createTime": "2021-08-20 00:17:52",
          "updateTime": "2021-09-17 18:54:10",
          "content": "QQ",
          "type": "contactType",
          "deleted": false,
          "selected": null
        },
        {
          "id": 39,
          "createTime": "2021-08-20 00:17:52",
          "updateTime": "2021-09-17 18:54:10",
          "content": "微信",
          "type": "contactType",
          "deleted": false,
          "selected": null
        },
        {
          "id": 40,
          "createTime": "2021-08-20 00:17:52",
          "updateTime": "2021-09-17 18:54:10",
          "content": "手机号",
          "type": "contactType",
          "deleted": false,
          "selected": null
        },
        {
          "id": 41,
          "createTime": "2021-08-20 00:17:52",
          "updateTime": "2021-09-17 18:54:10",
          "content": "邮箱",
          "type": "contacttype",
          "deleted": false,
          "selected": null
        },
        {
          "id": 42,
          "createTime": "2021-08-20 00:17:52",
          "updateTime": "2021-09-17 18:54:10",
          "content": "其他",
          "type": "contactType",
          "deleted": false,
          "selected": null
        },
      ]
      this.setData({
        condition: typeText[data.type], // 使用type判断
        title: data.name,
        userId:  data.userId,
        userAvatar: data.initiatorAvatar,
        userName: data.initiatorNickName,
        time: formatDateString(data.createTime), // 自定义函数转换日期格式
        tag: data.labelList,
        description: data.content,
        location:data.location,
        contact: data.contact,
        type: data.type,//物品遗失0寻找失主1
        closed: data.closed,
        pictures: data.allPicUrl ? data.allPicUrl.split(','):['/static/icon/tongde-default-image.jpg'], //留一个页面
        //pictures: data.allPicUrl.split(','),
        'dialog.infoDetail.Value': data.contact,
        'dialog.infoDetail.Key': contactTypeText.filter(item => item.id==data.contactType)[0].content + ": "
      });
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '请求失败',
        icon : 'error'
      })
    })
  },
  //   复制资料卡片的wxid:
  copyWxId(){
    let wxId = this.data.personalInfo.wxId;
    wx.setClipboardData({
      data: wxId,
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