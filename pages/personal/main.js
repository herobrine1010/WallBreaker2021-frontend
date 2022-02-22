// pages/personal/main.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";
import util from "../../utils/util.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageNum: 22,
    personBrief: {
      avatarPath: '',
      nickname: '默认昵称',
      school: '土木工程',
      major: '防灾减灾',
      grade: '2020级',
      identification: '研究生'
    },
    labels: [{
      type: 'personal',
      name: '细节控'
    }, {
      type: 'personal',
      name: '好学小白'
    }, {
      type: 'interest',
      name: '编程'
    }, {
      type: 'interest',
      name: '口才'
    }, {
      type: 'interest',
      name: '设计'
    }]
  },
  // 以下两个事件，目的用户进入“管理帖子”页面，或者“收藏帖子”页面
  changeToPersonalManagement: function () {
    let app = getApp();
    app.globalData.personalManagementOrCollection = 0;
  },
  changeToPersonalCollection: function () {
    let app = getApp();
    app.globalData.personalManagementOrCollection = 1;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let registered = app.globalData.registered;
    if (!registered) { // 注册完成后首次进入
      let openid = app.globalData.openId;
      request({
        url: `/user/setUserRegisteredTrueByOpenId/${openid}`,
        header: {
          'content-type': 'x-www-form-urlencoded',

        }
      }).then(res => {
        this.setData({
          dialogContent: "请完善个人信息",
          dialogTip: "为了更好地使用功能，请完善个人信息",
          dialogCancelText: "取消",
          dialogOkText: "去填写",
          tapOkEvent: "tapOkForAddPersonalInfo",
          tapCancelEvent: "tapCancelForAddPersonalInfo",
          isDialogShow: true,
        })
      })
    }

  },

  tapOkForAddPersonalInfo() {
    this.setData({
      isDialogShow: false,
    })
    wx.navigateTo({
      url: './personalDetails',
    })
  },
  tapCancelForAddPersonalInfo() {
    this.setData({
      isDialogShow: false,
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

    util.getNotice();

    const that = this;
    // -----------使用封装成promise 的request方法，注 意添加本文件最上方的引入；
    request({
      url: "/user/myInfo",
      header: {
        'content-type': 'x-www-form-urlencoded',

      }
    }).then(res => {
      let perInfo = res.data.data;
      // ---------------以下是对头像，昵称，专业等进行  更改；
      let personBrief = {
        avatarPath: perInfo.avatarUrl,
        nickname: perInfo.nickName,
        school: perInfo.school || '学院',
        major: perInfo.major || '专业',
        grade: perInfo.grade || '年级',
        identification: perInfo.identification || '学 历'
      };
      if (perInfo.avatarUrl) {
        personBrief.avatarPath = perInfo.avatarUrl;
      } else {
        personBrief.avatarPath = '../../static/icon/default-user-big.png';
      }

      that.setData({
        personBrief,
        jirenMsgNum: perInfo.jirenMsgNum,
        isJirenMsgExist: perInfo.jirenMsgExist
      });

      // -----------以下是对标签进行处理  ---------------------------------------
      let tempLabels = perInfo.personalLabel.concat(perInfo.interestLabel);
      let labels = tempLabels.map(v => {
        return {
          type: v.type,
          name: v.content
        }
      });
      that.setData({
        labels
      });
    }).catch(err => {
      console.log(err);
    });
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

  onAvatorTap: function () {
    wx.navigateTo({
      url: '../personal/personalDetails',
    })
  }
})