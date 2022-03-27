// index.js
// 获取应用实例
const app = getApp()
import { request } from "../../request/request.js";
const util = require('../../utils/util.js');
const filterBehavior = require('../../behaviors/Filter-dialog.js')


// 定义函数编写请求参数：-----------------------------------------
function setRequestData(pageNo, keyword,labelId,timeIndex){
  let data = {
    pageNo : pageNo,
    order : timeIndex
  };
  if(keyword){
    data.keyword = keyword;
  }
  if(labelId){
    data.labelId = labelId;
  }
  return data;
};
// 分页获取帖子列表
    // 获得结果后执行两个操作：
    // 1.将第1页的数据渲染；
    // 2.请求第2页的数据，存在页面
        // 如果没有后一页的数据，“已经到底了~”
async function getPostingWithPage(pageNo, keyword,labelId,timeIndex) {
  let p1 = request({
    url : '/posting/jishiGetPostingWithPage',
    header: {
      'content-type': 'x-www-form-urlencoded'
    },
    data : {...setRequestData(pageNo, keyword,labelId,timeIndex), pageSize: 10}
  });

  let p2 = new Promise((resolve,reject) => {
    setTimeout( _ => {
      reject("网络好像出错了");
    },3000)
  });
  return Promise.race([p1,p2]);
};
function dealWithPostingAndError(res) {
  if(res.statusCode >=200 && res.statusCode <=300){
    let { current , pages , records } = res.data.data;
    let isLastPage = false;
    let jishiItemList = records.map( v=>{
      v.createTime = util.getDateDiff(v.createTime);
      return v;
    });
    if(current == pages || pages == 0){
      isLastPage = true; // 判断是否是最后一页
    }
    return {
      isLastPage,
      current,
      pages,
      jishiItemList
    }
    // obj[new] = JSON.parse(JSON.stringify(obj[jishiItemList]));
  }else{
    wx.showToast({
      title: '请求失败',
      icon: 'error'
    })
  } 
}
async function setPositingDataInFirstPage(that , pageNo = 1, keyword, labelId, timeIndex) {
// 1.处理接口返回数据：渲染页面 / 超时提示
// 2.判断、请求、处理下一页数据
  try {
    let res = await getPostingWithPage(pageNo, keyword,labelId,timeIndex);
    let firstPageData = dealWithPostingAndError(res);
    firstPageData['isRefresherOpen'] = false;
    // setData是page对象里才有的办法，所以在调用函数时，要把page对象传入进来；
    that.setData(firstPageData);
    getNextPostingPage(that , keyword, labelId, timeIndex); //获取并处理下一页；
  } catch (error) {
    // 超时提示
    wx.showToast({
      title: error,
      icon: 'error'
    })
  }
}
  // 1.处理接口返回数据：渲染页面 / 超时提示
  // 2.判断、请求、处理下一页数据
async function getNextPostingPage(that , keyword, labelId, timeIndex) {
  let {current,
    pages,
    isLastPage} = that.data;
  if(!isLastPage){ //没到最后一页，再发送请求
    try {
      let res = await getPostingWithPage(current + 1, keyword, labelId,timeIndex);
      let nextPageData = dealWithPostingAndError(res);
      // setData是page对象里才有的办法，所以在调用函数时，要把page对象传入进来；
      that.setData({nextPageData});
    } catch (error) {
      // 超时提示
      wx.showToast({
        title: error,
        icon: 'error'
      })
    }
  }else{
    that.setData({'nextPageData' : {}});// 筛选的时候，清空之前的nextPageData
  }
};
Component({
  behaviors: [filterBehavior],
  data: {
    // new 标签
    isNewLabelShow: Date.now() < new Date(2022,3,4), // 4月4号标签失效
    // 金刚位入口
    entryItem: [
      {
        icon: 'xianyu-icon.png',
        text: '校园闲鱼',
        path: '/pages/xianyu/main',
        opentype: 'navigate',
        isNew: true
      },
      {
        icon: 'jiren-icon.png',
        text: '组队攒局',
        path: '/pages/jiren/main',
        opentype: 'switchTab',
      },
      {
        icon: 'encyclopedia-icon.png',
        text: '同济百科',
        path: '/pages/jishi/encyclopedia',
        opentype: 'navigate',
        isNew: true
      },
      {
        icon: 'lost-icon.png',
        text: '失物招领',
        path: '/pages/tongde/main',
        opentype: 'navigate',
      },

      /** 头像框（测试功能）。 */
      {
        icon: 'lost-icon.png',
        text: '头像框（测）',
        path: '/pages/avatar-frame/welcome',
        opentype: 'navigate',
      },
    ],
    isRefresherOpen : false,
    showGoTopButton:false, 
    timeIndex:'desc',
    keyword : '',
    labelId : 0,
    topNum:0,
    /*     济事主题列表label(type=jishi)，用于筛选和渲染card的标签，在onload里请求，格式如下 */
    labelList:[
      {
        id: 21,
        content: "求职信息",
        type: "jishi",
        selected: false,
      }
    ],
    banner: [],
    // conditionFilterOpen:false,
    jishiItemList:[
      {
      'labelText':'未分类',
      'title':'示例标题示例标题示例标题…',
      'content':'这是一段描述性文字，仅用于测试。这是一段……',
      'rightTagText':'我发起的',
      'userAvatar':'/static/icon/default-user.png',
      'userName':'示例用户',
      'updateTime':'1天前'
    },
    {
      'labelText':'未分类',

      'title':'示例标题示例标题示例标题…',
      'content':'这是一段描述性文字，仅用于测试。这是一段……',
      'updateTime':'1天前',

      'rightTagText':'',
      'userAvatar':'/static/icon/default-user.png',
      'userName':'示例用户',

    }
    ],
    navBackground: '',


  },
  observers: {
    'selectedLabelList[0].id': function(id) {
      this.setData({
        labelId: id
      })
      let {keyword, labelId, timeIndex} = this.data;
      setPositingDataInFirstPage(this, 1, keyword, labelId, timeIndex);
    }
  },
  methods: {
    onLoad: function (options) {
      const that = this;
      // 获取帖子标签列表
      request({
        url : "/label",
        header: {
          'content-type': 'x-www-form-urlencoded',
        },
        data: {
          type: "jishi"
        }
      }).then( res => {
        console.log(this.data.labelList)
        this.setData({
          labelList: res.data.data,
        })
        // 用map从json中提取标签列表
        let result = res.data.data.map( data => data.content);
        // 初始化选择状态，完成后长度为标签列表长度，值全为false 
        that.data.conditionsSelected = Array(result.length).fill(false)
  
        that.setData({
          conditions: result,
          conditionsSelected: that.data.conditionsSelected
        })
      }).catch( err => {
        console.log(err);
      })

      // 获取 banner 信息
      request({
        url : "/banner/getAllBanner",
      }).then(res => {
        const data = res.data.data.filter(e => e.isPublished);
        this.setData({
          banner: data
        })
      })
  

      //  分页获取帖子列表
      let {keyword, labelId, timeIndex} = this.data;
      setPositingDataInFirstPage(this, 1, keyword, labelId, timeIndex);
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      util.getNotice();
  
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1 //0,1,2 0-济事  1-济人  2-我的
        })
     };
     wx.reportEvent("index_index_onshow", app.globalData.user_attribute)
    },
    // 页面拖动事件，改变顶部导航栏的背景：
    onPageScroll: function(e){
      if(e.scrollTop>10){
        if(this.data.navBackground==''){
          this.setData({
            navBackground:'#DAECF3'
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

    jumpToDetail:function(e){
      // wx.navigateTo({
      //   url: '/pages/jishi/detail?postingId='+e.currentTarget.dataset.postingid,
      // })
      wx.navigateTo({
        url: '/pages/jishi/detail-new?postingId='+e.currentTarget.dataset.postingid + '&index=' + e.currentTarget.dataset.index,
      })
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
    
    // 绑定搜索事件： 光标离开触发：--- 点击叉号取消搜索 ----------------------
    onSearch:function(e){
      this.setData({
        keyword : e.detail.value
      })
      let that = this;
      //  分页获取帖子列表
      let {keyword, labelId, timeIndex} = this.data;
      setPositingDataInFirstPage(this, 1, keyword, labelId, timeIndex);
      // getPostingList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);
    },
    onCancleSearch:function(){
      this.setData({
        keyword : ''
      })
      let that = this;
      //  分页获取帖子列表
      let {keyword, labelId, timeIndex} = this.data;
      setPositingDataInFirstPage(this, 1, keyword, labelId, timeIndex);
      // getPostingList(that, this.data.keyword, this.data.labelId ,this.data.timeIndex);
    },
    clickTimeIndex:function(){
      if(this.data.timeIndex=='asc'){
        this.setData({'timeIndex':'desc'})
      }
      else if(this.data.timeIndex=='desc'){
        this.setData({'timeIndex':'asc'})
      }
      // 重新发送请求，包括此前筛选或者搜索的数据：
      //  分页获取帖子列表
      let {keyword, labelId, timeIndex} = this.data;
      setPositingDataInFirstPage(this, 1, keyword, labelId, timeIndex);
    },
    
    // 滚动框的 下拉刷新事件 暂时弃用pullDownRefresh------------- -------------- ----------
    onRefresherRefresh:function(){
      // 重新发送请求，包括此前筛选或者搜索数据：
      let that = this;
      //  分页获取帖子列表
      let {keyword, labelId, timeIndex} = this.data;
      setPositingDataInFirstPage(this, 1, keyword, labelId, timeIndex);
      
    },
    //滚动框 返回最上方
    returnTop: function () {
      let that=this;
      this.setData({
       topNum:  0
      });
     },
     onMyScroll:function(e){
      if(e.detail.scrollTop>100){
        this.setData({showGoTopButton:true})
      }else if(this.data.showGoTopButton){
        this.setData({showGoTopButton:false})
      }
     },
    //  --------- 滚动框：获取下一页 ------------
    onReachBottom: function() {
      let that = this;
      let isLastPage = that.data.isLastPage;
      if(!isLastPage){ //没到最后一页
        let {isLastPage, current, pages,  jishiItemList : nextlist} = that.data.nextPageData;
        let jishiItemList = that.data.jishiItemList;
        jishiItemList = jishiItemList.concat(nextlist);
        that.setData({
          isLastPage, 
          current, 
          pages,  
          jishiItemList, 
          'nextPageData' : {}
        });
        //  分页获取帖子列表
        let {keyword, labelId, timeIndex} = this.data;
        getNextPostingPage(that, keyword, labelId, timeIndex);
      }
  
    },
    navToEncyclopedia:function(){
      wx.navigateTo({
        url: '/pages/jishi/encyclopedia',
      })
    },
    // ----- 显示: 提示框  -------------
    showComingTip() {
      wx.showModal({
        content: "紧锣密鼓开发中, 敬请期待",
        showCancel: false,
        confirmText: "知道啦"
      })
      wx.reportEvent("index_index_showcomingtip", app.globalData.user_attribute)
    }
  }
})
