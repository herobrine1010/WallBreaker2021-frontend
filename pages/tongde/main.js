// pages/tongde/main.js
/* 
切换标签页时, 通过更新tongdeItemList展示不同数据, wxml不用变
当type labelId keyword任意一个变化时, 都需要发送请求, 更新tongdeItemList
request是包装了一层promise的wx.request
*/
import {request} from "../../request/request.js";
import {formatTime, getDateDiff} from "../../utils/util.js";

// 引入各类behaviors
const behaviorsPath = "../../behaviors/"
const scrollBehavior = require(behaviorsPath + "ScrollView.js");
const searchBehavior = require(behaviorsPath + "Search.js");
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
}
function getLostFoundList(that, type=0, labelId='', keyword='') {
  /* jiren jishi通过Page外的函数发起请求 setData, 需要传入that参数, 这个页面把它写在Page内.  */
  // that.setData({isRefresherOpen: true});
  // that.setData({tongdeItemList: []})
  request({
    url: '/lostfound/tongdeGetLostFound',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie':wx.getStorageSync("token")
    },
    method : 'GET',
    data: setRequestData(keyword, labelId, type)
  }).then(res => {
    console.log("获取列表请求", res);
    let itemList = res.data.data.map(v => {
      v.createTime = getDateDiff(v.createTime);
      return v;                                 
    })

    that.setData({
      tongdeItemList: itemList,
      isRefresherOpen: false
    })
  });
}
Component({
  behaviors: [scrollBehavior, searchBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0, // 当前swiper选中项目
    tab: 0, //当前tab对应的项目
    keyword: undefined,
    tongdeItemList:[
      {
        'labelList':['雨伞'],
        'name':'雨伞',
        'createTime':'1天前',
        'content':'9.10在嘉定A108门口捡到一把雨伞',
        'firstPicUrl':'https://img-blog.csdnimg.cn/20210920143006670.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWFhc2h1b3c=,size_20,color_FFFFFF,t_70,g_se,x_16',
        'type': 0,       // 物品遗失0 or 失物寻主1 
        'closed': false
      },
      {
        'labelList':['耳机'],
        'name':'黑色耳机',
        'createTime':'2天前',
        'content':'9.9闭馆时在嘉定图书馆九楼饮水机旁捡到一个黑色插线耳机',
        'firstPicUrl':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fzhuanzh%2Fn_v2e55f7bb2c83d45979b5f82ab1aa8e80e.jpg%3Fw%3D750%26h%3D0&refer=http%3A%2F%2Fpic3.58cdn.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1634710111&t=75304e2c48d2587a3aaafc933811f57e'
      },
      
      {
        'labelList':['书籍'],
        'name':'机器学习算法书',
        'createTime':'1天前',
        'content':'9.9晚上在嘉定博楼217捡到一本西瓜书',
        'firstPicUrl':'https://img-blog.csdnimg.cn/2021092014302085.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWFhc2h1b3c=,size_20,color_FFFFFF,t_70,g_se,x_16'
      },
      {
        'labelList':['文具'],
        'name':'笔记本',
        'createTime':'1天前',
        'content':'9.10下午5点左右在嘉定B楼301教室前排捡到一本笔记本',
        'firstPicUrl':'https://img-blog.csdnimg.cn/20210920143025753.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWFhc2h1b3c=,size_20,color_FFFFFF,t_70,g_se,x_16',
        'type': 0,       // 物品遗失0 or 失物寻主1 
        'closed': false
      },
      {
        'labelList':['证件'],
        'name':'一卡通',
        'createTime':'1天前',
        'content':'9.9中午在嘉定小食堂二楼捡到一个卡套，有一卡通和钥匙',
        'firstPicUrl':'https://img-blog.csdnimg.cn/20210920143013638.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWFhc2h1b3c=,size_20,color_FFFFFF,t_70,g_se,x_16'
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
    // 用筛选框选中的标签列表， 目前为单选
    selectedLabelList: []
  },
  /* 
  数据监听器
  通过监听this.data中数据变化, 执行函数, 发送请求
   */
  observers: {
    "tab, selectedLabelList[0].id, keyword": function(tab, id, keyword) {
      console.log("数据监听器",tab,id, keyword);
      getLostFoundList(this, tab, id, keyword);
    }
  },
  methods: {
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getLostFoundList(this);

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
    });
  },
  // 绑定在swiper上的函数，用来改变tab
  changeTab: function(e) {
    var current = e.detail.current;
    this.setData({
      tab: e.detail.current
    });
  },
  // 滚动框的 下拉刷新事件 pullDownRefresh------------- -------------- ----------
  onRefresherRefresh:function(){
    // 刷新页面，包括此前筛选或者搜索数据：
    // 只要调用setData, 即使不改变数据也能触发数据监听器observer, 实现刷新
    this.setData({tab: this.data.tab});
  },
  // 跳转：发起组队事件：------------- --------- ------ ------- --
  createNewPost:function(){
    wx.navigateTo({
      url: '/pages/tongde/creatPost',
    })
  },
  }
})