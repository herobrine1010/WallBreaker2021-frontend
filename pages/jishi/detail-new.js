// miniprogram/pages/jishi/detail-new.js
import { request } from "../../request/request.js";
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBackground:'',
    postList : [{
      title:'招聘 | 秋招九月场！同济大学2022届毕业生系列招聘活动',
      isPostingCollected:0,
      name : '同济就业',
      theme : '招聘活动预告',
      date : '2021年9月20日',
      content : '<img src="https://mmbiz.qpic.cn/mmbiz_gif/34HvoGGWECgTJEwdP96v2UKYZW3Osa2BEcTYgStaZ6aSjqsHxwsPicecVqh3k2nHIicFFZ7Y0H9hcibJeEMA6Eib8A/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1"><img src="https://mmbiz.qpic.cn/mmbiz_jpg/UWAPUIIbNgPUAlkFE21Jx69xQtoN5rAD7ksCHyYItq3zMGUQFvcL7DKMOdIq4X7xbDPhgwtTKEOvcdhiamYOzjw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"><img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/zhi1_1.jpg"><img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/zhi1_12.jpg"><img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/zhi1_2.jpg">',
    },{
      title:'宣讲会 | 中国商飞公司2020年校园招聘宣讲会',
      isPostingCollected:0,
      name : '同济就业',
      theme : '企业宣讲会',
      date : '2021年9月26日',
      content : '<img src = "https://mmbiz.qpic.cn/mmbiz_gif/34HvoGGWECgTJEwdP96v2UKYZW3Osa2BEcTYgStaZ6aSjqsHxwsPicecVqh3k2nHIicFFZ7Y0H9hcibJeEMA6Eib8A/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1"><img src = "https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/zhi2_2.jpg"><img src = "https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/zhi2_3.jpg"><img src = "https://mmbiz.qpic.cn/mmbiz_jpg/osKjIicdlg3iciayY7gK4W1Yic5r14xFiaibRmoxictVHkzw2RTdKd4iaVaQd2jFwX20UwV3hBZL3NhQFPBHiaYv7gjgXHQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"><img src = "https://mmbiz.qpic.cn/mmbiz_jpg/osKjIicdlg39lxxB0SWeh6mQamOfXCMzib8WBPrcicbUF68w7DYiaW0U3TibpLoVArNOMIqmO3zorw6cvc38pK3kJKg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"><img src = "https://mmbiz.qpic.cn/mmbiz_jpg/osKjIicdlg38Ul3Zm4af6Kj7v2xqwURkwReCuCspsHnpwlkEsIBxCRpE80p76iaUoicWjtJCEGyGPQlwuaHBF5Hxw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"><img src = "https://mmbiz.qpic.cn/mmbiz_jpg/osKjIicdlg39lxxB0SWeh6mQamOfXCMzibGeGsicOMoDzWPy2ACQLsjaknznqmvA0EQtRmicfZM0BFBoLFrAjtFksw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"><img src = "https://mmbiz.qpic.cn/mmbiz_jpg/osKjIicdlg39lxxB0SWeh6mQamOfXCMzibZDLxHuZG9OYicONL8YC2rZ815UqkSCZwDIwRKSGpmkVKn9WlJcNibZeg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1">',
    },{
      title : '图书馆关于2021年中秋节放假安排的通知',
      isPostingCollected:1,
      name : '同济大学图书馆',
      theme : '通知公告',
      date : '2021年9月12日',
      content : '<img src = "https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/xue1.jpg">',
    },{
      title:'礼敬中华•名家讲坛 | 评弹艺术与红色传承',
      isPostingCollected:1,
      name : '同济大学图书馆',
      theme : '传统文化',
      date : '2021年7月2日',
      content:'<img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/activity_1.jpg"><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/gVs0G2onMjvkP2PtpauicOlF1mzobpdJ9iccYicrR1f65ZMO9CPeNWxiaib4MI9LgqxUibeBV4kfAexRehuxjUgPLCEA/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/><img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/activity_2.jpg">',
    },{
        title:'2021同济大学迎新-学生寝室空调租赁指南',
        isPostingCollected:1,
        name : '同济空调租赁中心',
        theme : '空调租赁',
        date : '2021年8月24日',
        content : '<img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/sheng_1.jpg"><img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/sheng_2.jpg"><img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/sheng_3.jpg"><img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/sheng_4.jpg"><img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/sheng_5.jpg"><img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/sheng_6.jpg"><img src="https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jishi/sheng_7.jpg">'
    }],

    // title:'测试标题|小红帽招新',
    // isPostingCollected:1,
    // name : '恒兴号名称',
    // theme : '主题',
    // date : '发帖日期：2020年12月19日',
    // content : '<p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p><p data-we-empty-p="" style="padding-left:2em;">可以任意修改<span style = "color:#c24f4a">文件</span>格式吗</p><img src="https://i.loli.net/2021/09/04/a5zkAKXo61dYSZB.jpg" style="width:200px;height:200px"><p data-we-empty-p="" style="padding-left:4em;">每行可以<font color="#8baa4a">兼容</font>不同的<font color="#f9963b">样式</font>吗？</p><p><font size="6">可以兼容</font>不同的字体吗？</p><p><span style="background-color: rgb(194, 79, 74);">兼容</span>不同的<span style="background-color: rgb(139, 170, 74);">背景</span>色？</p><p>在<u>小程序</u>里表<i>现如</i>何呢</p>',
    
  
    hasLink : true,
    navTitle : '关于疫情的调查问卷',
    navImage : '',
    navUrl : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // let index = options.index;
    // if(index < 5){
    //   let {
    //     title,
    //     isPostingCollected,
    //     name,
    //     theme,
    //     date,
    //     content
    //   } =  this.data.postList[index];
    //   this.setData({
    //     title,
    //     isPostingCollected,
    //     name,
    //     theme,
    //     date,
    //     content
    //   })
    // }


    console.log(options);
    let postingId = options.postingId;
    request({
      url : '/posting/getPosting/' + postingId,
      header: {
        // 'content-type': 'x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      },
    }).then(res => {
      console.log("posting request",res);
      if(res.statusCode >=200 && res.statusCode <=300){
        // 有正确的返回值，则将返回结果进行处理，渲染到页面上：
        console.log(res);

        let {
          title,
          myFavourite: isPostingCollected,
          initiatorNickName: name,
          initiatorAvatar : avatar,
          theme,
          updateTime : date,
          content
        } =  res.data.data;
        this.setData({
          title,
          isPostingCollected,
          name,
          avatar,
          theme,
          date,
          content
        });
      }else{
        wx.showToast({
          title: '请求失败',
          icon: 'error'
        })
      } 
    }).catch( err=> {
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
      console.log("err",err)
    }); 
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