// miniprogram/pages/jishi/detail-new.js
import { request } from "../../request/request.js";
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBackground:'',

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


    console.log(options);
    let postingId = options.postingId;
    request({
      url : '/posting/getPosting/' + postingId,
      header: {
        // 'content-type': 'x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      },
    }).then(res => {
      console.log("posting request",res.data.data);
      if(res.statusCode >=200 && res.statusCode <=300){
        // 有正确的返回值，则将返回结果进行处理，渲染到页面上：
        console.log(res);

        let {
          title,
          myFavourite: isPostingCollected,
          initiatorNickName: name,
          initiatorAvatar,
          initiatorDescription,
          theme,
          updateTime : date,
          content,
          linkUrl,
          linkTitle,
          linkPicUrl
        } =  res.data.data;
        date = util.formatTimeOnDay(date);
        let orgenizationInfomation = {
          nickName : name,
          avatar : initiatorAvatar,
          description : initiatorDescription,
        }
        this.setData({
          title,
          isPostingCollected,
          name,
          initiatorAvatar,
          initiatorDescription,
          theme,
          date,
          content,
          linkUrl,
          linkTitle,
          linkPicUrl,
          orgenizationInfomation
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

  // 点击头像 展示恒兴号信息：
  tapAvatar(){
    this.setData({
      isPersonalInfoShow : true
    })
  },

  // 页面拖动事件，改变顶部导航栏的背景：
  onPageScroll: function(e){
    if(e.scrollTop>10){
      if(this.data.navBackground == ''){
        this.setData({
          navBackground:'#f9f9f9'
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
  attachNavgitor:function(e){
    let linkUrl = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: `./link?linkUrl=${linkUrl}`,
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