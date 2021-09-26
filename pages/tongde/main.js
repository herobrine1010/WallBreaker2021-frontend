// pages/tongde/main.js
import {request} from "../../request/request.js";
Page({

  /**
   * 页面的初始数据
   */

  data: {
    tabIndex: 0, // 当前swiper选中项目
    tab: 0, //当前tab对应的项目
    showGoTopButton:false,
    topNum:0,
    tongdeItemList:[
      {
        'labelText':['雨伞'],
        'title':'雨伞',
        'publishTime':'1天前',
        'description':'9.10在嘉定A108门口捡到雨伞',
        'postingPic':'https://img-blog.csdnimg.cn/20210920143006670.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWFhc2h1b3c=,size_20,color_FFFFFF,t_70,g_se,x_16',
        'type': 0,       // 物品遗失0 or 失物寻主1 
        'closed': false
      },
      {
        'labelText':['耳机'],
        'title':'黑色耳机',
        'publishTime':'2天前',
        'description':'9.9闭馆时在嘉定图书馆九楼饮水机旁捡到一个黑色插线耳机',
        'postingPic':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fzhuanzh%2Fn_v2e55f7bb2c83d45979b5f82ab1aa8e80e.jpg%3Fw%3D750%26h%3D0&refer=http%3A%2F%2Fpic3.58cdn.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1634710111&t=75304e2c48d2587a3aaafc933811f57e'
      },
      
      {
        'labelText':['书籍'],
        'title':'机器学习算法书',
        'publishTime':'1天前',
        'description':'9.9晚上在嘉定博楼217捡到一本西瓜书',
        'postingPic':'https://img-blog.csdnimg.cn/2021092014302085.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWFhc2h1b3c=,size_20,color_FFFFFF,t_70,g_se,x_16'
      },
      {
        'labelText':['文具'],
        'title':'笔记本',
        'publishTime':'1天前',
        'description':'9.10下午5点左右在嘉定B楼301教室前排捡到一本笔记本',
        'postingPic':'https://img-blog.csdnimg.cn/20210920143025753.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWFhc2h1b3c=,size_20,color_FFFFFF,t_70,g_se,x_16',
        'type': 0,       // 物品遗失0 or 失物寻主1 
        'closed': false
      },
      {
        'labelText':['证件'],
        'title':'一卡通',
        'publishTime':'1天前',
        'description':'9.9中午在嘉定小食堂二楼捡到一个卡套，有一卡通和钥匙',
        'postingPic':'https://img-blog.csdnimg.cn/20210920143013638.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWFhc2h1b3c=,size_20,color_FFFFFF,t_70,g_se,x_16'
      },

    
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url: '/lostfound/tongdeGetLostFound',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'cookie':wx.getStorageSync("token")
      },
      method : 'GET',
      data: {
        'type': '1',
        // 'labelId': '30',
        // 'keyword': ''
      }
    }).then(res => {
      console.log(res.data.data);
    });
  },

  // 绑定在点击tab上函数，通过点击切换swiper
  changeItem: function(e) {

    this.setData({
      tabIndex: e.currentTarget.dataset.item
    }
    )

  },
  // 绑定在swiper上的函数，用来改变tab
  changeTab: function(e) {
    var current = e.detail.current;
    console.log('current',current);
    // TODO 根据current不同的值发送不同的请求，获取不同的数据列表
    this.setData({
      tab: e.detail.current
    });

  },
  // 滚动框的 滚动和回到最上事件：------------- -------------- ----------
  returnTop: function () {
    let that=this;
    this.setData({
     topNum:  0
    });
    setTimeout(function () {
      that.setData({showGoTopButton:false})
    }, 100)
  },
  onMyScroll:function(e){
    if(e.detail.scrollTop>100){
      this.setData({showGoTopButton:true})
    }else if(this.data.showGoTopButton){
      this.setData({showGoTopButton:false})
    }
  },
  // 跳转：发起组队事件：------------- --------- ------ ------- --
  createNewPost:function(){
    wx.navigateTo({
      url: '/pages/tongde/creatPost',
    })
  },
  
})