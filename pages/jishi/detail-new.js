// miniprogram/pages/jishi/detail-new.js
import { valueOf } from "../../behaviors/Filter-dialog.js";
import { request } from "../../request/request.js";
const util = require('../../utils/util.js');
var app=getApp();

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
    navUrl : '',
    onShowState : false
  },
  page_attribute:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    let postingId = options.postingId;
    request({
      url : '/posting/getPosting/' + postingId,
      header: {
        // 'content-type': 'x-www-form-urlencoded',
         
      },
    }).then(res => {
      if(res.statusCode >=200 && res.statusCode <=300){
        // 有正确的返回值，则将返回结果进行处理，渲染到页面上：

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
          postingId,
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
          orgenizationInfomation,
          onShowState: true
        });
        this.onShow()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title : '欢迎注册使用济星云小程序！',
      path:app.getSharedUrl()
    }
  },

  // 点击头像 展示恒兴号信息：
  tapAvatar(){
    this.setData({
      isPersonalInfoShow : true
    })
    wx.reportEvent("jishi_detail_new_tapavatar", this.page_attribute)
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


  // -------- ----------- 收藏 、 取消 ------------------- --------------- ---------------------

  collect:function(){
    request({
      url : `/userFavouritePosting/addToMyFavouritePosting/${this.data.postingId}`,
      method : "POST",
      header:{ },
    }).then(res => {
      if (res.statusCode == 200 && res.data.success) {
        this.setData({
          isPostingCollected : 1
        });
        wx.showToast({
          title: '收藏成功',
          icon:'success'
        })
        wx.reportEvent("jishi_detail_new_collect", this.page_attribute)
      } else {
        wx.showToast({
          title: '网络错误请重试',
          icon:'warn'
        })
      }
    })

  },
  cancelCollect:function(){
    request({
      url : `/userFavouritePosting/RemoveFromMyFavouritePosting/${this.data.postingId}`,
      method:"DELETE",
      header:{ },
    }).then( res => {
      if (res.statusCode == 200 && res.data.success) {
        this.setData({
          isPostingCollected : 0
        });
        wx.showToast({
          title: '取消收藏',
          icon:'success'
        })
      } else {
        wx.showToast({
          title: '网络错误请重试',
          icon:'warn'
        })
      }
    })
  },

  
  attachNavgitor:function(e){
    let linkUrl = e.currentTarget.dataset.link;
    wx.reportEvent("jishi_detail_new_attachnavgitor", this.page_attribute)
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
  },

  onShow(){
    let { onShowState } = this.data
    if (onShowState) {
      //  直接复制的话为浅拷贝
      this.page_attribute = JSON.parse(JSON.stringify(app.globalData.user_attribute));
      this.page_attribute['organization_organization_name'] = this.data.name
      wx.reportEvent("jishi_detail_new_onshow", this.page_attribute)
    } else{
    }
  }
})