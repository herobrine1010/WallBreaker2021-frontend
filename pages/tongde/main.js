// pages/tongde/main.js
/* 
切换标签页时, 通过更新tongdeItemList展示不同数据, wxml不用变
当type labelId keyword任意一个变化时, 都需要发送请求, 更新tongdeItemList
request是包装了一层promise的wx.request
*/
import {request} from "../../request/request.js";
// 定义函数编写请求参数：-----------------------------------------
function setRequestData(keyword,labelId,type){
  /* 设置request的参数, type必选, labelId, keyword可选 */
  let data = {
    type : type
  };
  // 当keyword=''时,发送的请求不应该包括keyword字段,否则会无返回结果
  if(keyword){
    data.keyword = keyword;
  }
  if(labelId){
    data.labelId = labelId;
  }
  return data;
};
function getLostFoundList(type=0, labelId='', keyword='') {
  /* jiren jishi通过Page外的函数发起请求 setData, 需要传入that参数, 这个页面把它写在Page内.  */
  return request({
    url: '/lostfound/tongdeGetLostFound',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie':wx.getStorageSync("token")
    },
    method : 'GET',
    data: setRequestData(keyword, labelId, type)
  });
}
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

    
    ],
    // 所有类型标签列表, 暂时直接写好, 后期需要更改时发请求
    labelList: [
      {
        "id": 26,
        "createTime": "2021-08-20 00:13:57",
        "updateTime": "2021-08-20 00:13:57",
        "content": "水杯",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 27,
        "createTime": "2021-08-20 00:16:04",
        "updateTime": "2021-08-20 00:16:04",
        "content": "雨伞",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 28,
        "createTime": "2021-08-20 00:16:04",
        "updateTime": "2021-08-20 00:16:04",
        "content": "证件",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 29,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "耳机",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 30,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "钥匙",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 31,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "钱包",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 32,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "数码",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 33,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "衣服",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 34,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "眼镜",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 35,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "文具",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 36,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "书籍",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 37,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "其他",
        "type": "tongde",
        "deleted": false,
        "selected": null
      }
    ],
    selectedLabelList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // getLostFoundList(this, '0', undefined, undefined);
    var requestPromise = request({
      url: '/lostfound/tongdeGetLostFound',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      },
      method : 'GET',
      data: {
        labelId: 30,
        type: 0
      }
    });
    console.log(requestPromise);
    requestPromise.then(res => console.log(res));

  },
  getLostFoundList: function(type=0, labelId='', keyword='') {
    /* 发起请求, 刷新卡片列表 */
    let data = res.data.data;
    request({
      url: '/lostfound/tongdeGetLostFound',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      },
      method : 'GET',
      data: setRequestData(keyword, labelId, type)
    }).then(res => {
      console.log(res);
      data = res.data.data;
    })
    this.setData({
      tongdeItemList: data
    });
  },

  // ------------筛选框相关的函数-----------------
  clickConditionFilter: function(e) {
    // 弹出筛选框
    let selector = this.selectComponent('#dialog-label-selector');
    selector.openClose(); //不用全局变量,即可弹出关闭dailog筛选标签
    selector.setLabelsSelected();
  },
  labelChanged: function(e) {
    // 点击确定button, 传入选中的标签
    let selectedLabelList = e.detail;
    this.setData({selectedLabelList})
  },
  // -----------筛选框函数结束--------------
  // 绑定在点击tab上函数，通过点击切换swiper
  changeItem: function(e) {

    this.setData({
      tabIndex: e.currentTarget.dataset.item
    },
    getLostFoundList(this, '', '', this.data.tabIndex)
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