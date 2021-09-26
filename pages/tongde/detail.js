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
    title:'机器学习算法书',
    userAvatar:'/static/icon/default-user-big.png',
    userName:"破壁者1号",
    time:'2021年6月9日 21:40',
    tag:['#雨伞','#其他'],
    description:"9.9晚上在嘉定博楼217捡到一本机器学习算法书",
    location:'在嘉定博楼217靠窗第一排座位捡到',
    number:'15615333420',
    type:0,//物品遗失0 失物寻主1
    closed:false,
    pictures:['https://img-blog.csdnimg.cn/2021092014302085.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWFhc2h1b3c=,size_20,color_FFFFFF,t_70,g_se,x_16','','','','','','',''],

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
      // 加载页面时先把数据更新到contact上,点击弹出对话框事件后再更新到infoDetail
      infoDetail:{
        Key:"微信：",
        copyEnable:true,
        Value:"112luizjk",
      }
    
      /*tapOkEvent:"dialogTapOkForAcceptApplying"*/
    },
  },
  showPersonDetail:function(e){
    this.selectComponent("#personalAnimation1").showModal();
  },
  tapCopy:function(e){
    let that = this;
    let info = that.data.dialog.infoDetail.Value;
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
    let id = options.lostfoundId;
    request({
      url: '/lostfound/getLostFound/' + id,
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
        time: formatDateString(data.createTime), // 自定义函数转换日期格式
        tag: data.labelList,
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