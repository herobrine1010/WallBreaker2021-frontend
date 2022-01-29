// pages/collection/collection.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";
import {formatTime , getDateDiff} from "../../utils/util.js";

Page({

  /**
   * 页面的初始数据
   */

  data: {
    collectionTitle : "我的收藏",
    leftButtonTitle : "帖子收藏",
    rightButtonTitle : "组队收藏",
    //默认初试选择左边 帖子按钮 
    isNoticeOrTeam : 0,
    background : "backgroundLeft",
    btnColor1 : "btnColorLeft",
    btnColor2 : "btnColorUnselected",

    jirenItemList:[
      {
      'labelText':'未分类',
      'title':'暂无数据',
      'teamCondition':'refuse',
      'rightTagText':'申请未通过',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'description':'数据加载中',
      'initiator':'发起人: 示例用户',
      'peopleCount':'3/5',
      'postingPic':''
    }],
    jishiItemList : [
      {
        'labelText':'教务',
        'title':'暂无数据',
        'rightTagText':'',
        'userName':'新生院张老师',
        'publishTime':'2天前',
        
        'description':'数据加载中',
        'postingPic':''
      },
    ]
  },
//以下两个事件为：点击帖子(收藏或管理)按钮，或者点击组队(收藏或管理)按钮.
//切换按钮颜色、页面背景；
  onLeftNoticeBtnTap:function(){
    this.setData({
      isNoticeOrTeam : 0,
      background : "backgroundLeft",
      btnColor1 : "btnColorLeft",
      btnColor2 : "btnColorUnselected"
    })
  },
  onRightTeamBtnTap:function(){
    this.setData({
      isNoticeOrTeam : 1,
      background : "backgroundRight",
      btnColor1 : "btnColorUnselected",
      btnColor2 : "btnColorRight"
    })
  },
  // 以下为发起请求： ------------- -------------------- -----------
  getList(self) {
    // ----------- ---- 调试分页接口 ----------- -----------
    
    // ----------- ---- 调试分页接口 结束 ----------- -----------
    let favouritePosting = request({
      url : '/userFavouritePosting/getMyFavouritePosting',
      header: {
        'content-type': 'applicationx-www-form-urlencoded',
         
      }
    });
    let favouriteTeam = request({
      url : '/userFavouriteTeam/getMyFavouriteTeam',
      header: {
        'content-type': 'applicationx-www-form-urlencoded',
         
      }
    });
    // 采用Promise.all 并行处理两个请求-------------------
    Promise.all([favouritePosting,favouriteTeam])
      .then(result => {
        // 处理收藏组队的数据------------------
        let jirenItemList = result[1].data.data.map( v=>{
          let team = {
            labelText : v.labelContent,
            title : v.title,
            description : v.content,
            initiator : v.initiatorNickName,
            peopleCount : (v.participantNumber + 1) + '/' + (v.dueMember + 1) ,
            postingPic : v.firstPicUrl,
            dueTime : '截止时间：' + (v.dueTime==null?"暂无":formatTime(v.dueTime)),
            id : v.id
          };
          // -------- 收藏组队的状态：1:我发起的 / 0:空---------
          // if(v.initializedByMe){
          //   tempList.teamCondition = 'mine';
          //   tempList.rightTagText = '我发起的';
          // }else{
          //   tempList.teamCondition = 'mine';
          //   tempList.rightTagText = '';
          // }

          if(v.initializedByMe){
            switch(v.status){
              case 0:
                team.teamCondition='mine'
                team.rightTagText='我发起的'
                break;
              case 1:
              case 2:
                team.teamCondition='mine'
                team.rightTagText='待处理'
                break;
              case 3:
              case 4:
              default:
                team.teamCondition='close'
                team.rightTagText='已关闭'
                break;
            }
          }else{
            if(v.applyClosed){
                team.teamCondition='close'
                team.rightTagText='已关闭'
            }else{
              switch(v.applyStatus){
                case 0:
                  team.teamCondition='applying'
                  team.rightTagText='我已申请'
                  break;
                case 1:
                  team.teamCondition='pass'
                  team.rightTagText='我已入队'
                  break;
                case 2:
                  team.teamCondition='refuse'
                  team.rightTagText='申请未通过'
                  break;
            }
  
            }
          }

          return team;
        });
        // 处理收藏帖子的数据---------------------------------
        let jishiItemList = result[0].data.data.map( v=>{
          let tempList = {
            labelText : v.labelContent,
            title : v.title,
            description : v.brief,
            userName : v.initiatorNickName,
            userAvatar : v.initiatorAvatar,
            postingPic : v.firstPicUrl,
            id : v.id
          };
          // 处理发布日期：-------------
          // 不写参数表示当前日期
          let now = new Date();
          // 可以接受字符串的参数'2021-07-31 15:20:00'
          let updateTime = new Date(v.updateTime)
          // 毫秒单位转换
          let hour = Math.floor((now-updateTime)/1000/60/60);
          if(hour < 24){
            tempList.publishTime = hour + '小时前';
          }else{
            tempList.publishTime = Math.floor(hour/24) + '天前';
          };
          // -------- 收藏帖子的状态：1:我发起的 / 0:空 ---------
          if(v.status){
            tempList.rightTagText = '我发起的';
          }else{
            tempList.rightTagText = '';
          }
          return tempList;
        });
        self.setData({
          jirenItemList,
          jishiItemList,
          isRefresherOpen :false
        });
      })
      .catch(err => {
        console.log(err);
      })
  },


  // 以下为scroll-view的事件
  onScrollToLower:function(){
  },
  onRefresherRefresh(){
    const that = this;
    getFirstPageData(that, 10);
  },
  // ------- ----- 事件： 将下一页数据加载到页面上，并继续请求 ----
  onPostingReachBottom(){
    const that = this;
    let jishiIsLastPage = that.data.jishiIsLastPage;
    if(!jishiIsLastPage){
      let {      
        jishiIsLastPage,
        jishiCurrent,
        jishiPages,
        jishiItemList
      } = that.data.postingNextPage;
      let before = that.data.jishiItemList;
      jishiItemList = before.concat(jishiItemList);
      that.setData({
        jishiIsLastPage,
        jishiCurrent,
        jishiPages,
        jishiItemList,
        'postingNextPage' : {}
      });
      getNextPostingPage(that);


    }

 
  },
  onTeamReachBottom(){
    const that = this;
    let jirenIsLastPage = that.data.jirenIsLastPage;
    if(!jirenIsLastPage){
      let {      
        jirenIsLastPage,
        jirenCurrent,
        jirenPages,
        jirenItemList
      } = that.data.teamNextPage;
      let before = that.data.jirenItemList;
      jirenItemList = before.concat(jirenItemList);
      that.setData({
        jirenIsLastPage,
        jirenCurrent,
        jirenPages,
        jirenItemList,
        'teamNextPage' : {}
      });
      getNextTeamPage(that);


    }
  },
  

  // 点击卡片之后的页面跳转


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this;
    getFirstPageData(that, 10);
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

})

// ------------ functions for request data （接口有关函数）---- ----------- ---------
// 1. 分页获取数据
async function getPostingData(pageNo, pageSize = 10) {
  return request({
    url : '/userFavouritePosting/getMyFavouritePostingByPage',
    header: {
      'content-type': 'applicationx-www-form-urlencoded',
       
    },
    data : {
      pageNo,
      pageSize
    }
  })
};
async function getTeamData(pageNo, pageSize = 10) {
  return request({
    url : '/userFavouriteTeam/getMyFavouriteTeamWithPage',
    header: {
      'content-type': 'applicationx-www-form-urlencoded',
       
    },
    data : {
      pageNo,
      pageSize
    }
  })
}
//  2. 分别处理帖子和组队数据
function dealWithPosting(res) {
  if(res.statusCode >=200 && res.statusCode <=300){

    let { current : jishiCurrent , pages : jishiPages , records } = res.data.data;
    let jishiIsLastPage = false;
    let jishiItemList = records.map( v=>{
      let tempList = {
        labelText : v.labelContent,
        title : v.title,
        description : v.brief,
        userName : v.initiatorNickName,
        userAvatar : v.initiatorAvatar,
        postingPic : v.firstPicUrl,
        id : v.id,
        publishTime : getDateDiff(v.updateTime)
      };
      // -------- 收藏帖子的状态：1:我发起的 / 0:空 ---------
      if(v.status){
        tempList.rightTagText = '我发起的';
      }else{
        tempList.rightTagText = '';
      }
      return tempList;
    });

    if(jishiCurrent == jishiPages || jishiPages == 0){
      jishiIsLastPage = true; // 判断是否是最后一页
    }
    return {
      jishiIsLastPage,
      jishiCurrent,
      jishiPages,
      jishiItemList
    };
  }else{
    wx.showToast({
      title: '请求失败',
      icon: 'error'
    })
  } 
}
function dealWithTeam(res) {
  if(res.statusCode >=200 && res.statusCode <=300){

    let { current : jirenCurrent , pages : jirenPages , records } = res.data.data;
    let jirenIsLastPage = false;
    let jirenItemList = records.map( v=>{
      let team = {
        labelText : v.labelContent,
        title : v.title,
        description : v.content,
        initiator : v.initiatorNickName,
        peopleCount : (v.participantNumber + 1) + '/' + (v.dueMember + 1) ,
        postingPic : v.firstPicUrl,
        dueTime : '截止时间：' + (v.dueTime==null?"暂无":formatTime(v.dueTime)),
        id : v.id
      };
      // -------- 收藏组队的状态：1:我发起的 / 0:空---------
      // if(v.initializedByMe){
      //   tempList.teamCondition = 'mine';
      //   tempList.rightTagText = '我发起的';
      // }else{
      //   tempList.teamCondition = 'mine';
      //   tempList.rightTagText = '';
      // }
      if(v.initializedByMe){
        switch(v.status){
          case 0:
            team.teamCondition='mine'
            team.rightTagText='我发起的'
            break;
          case 1:
          case 2:
            team.teamCondition='mine'
            team.rightTagText='待处理'
            break;
          case 3:
          case 4:
          default:
            team.teamCondition='close'
            team.rightTagText='已关闭'
            break;
        }
      }else{
        if(v.applyClosed){
            team.teamCondition='close'
            team.rightTagText='已关闭'
        }else{
          switch(v.applyStatus){
            case 0:
              team.teamCondition='applying'
              team.rightTagText='我已申请'
              break;
            case 1:
              team.teamCondition='pass'
              team.rightTagText='我已入队'
              break;
            case 2:
              team.teamCondition='refuse'
              team.rightTagText='申请未通过'
              break;
        }
        }
      }
      return team;
    });

    if(jirenCurrent == jirenPages || jirenPages == 0){
      jirenIsLastPage = true; // 判断是否是最后一页
    }
    return {
      jirenIsLastPage,
      jirenCurrent,
      jirenPages,
      jirenItemList
    };
  }else{
    wx.showToast({
      title: '请求失败',
      icon: 'error'
    })
  } 
}
// 3. 获取第一页, 用于onLoad/refresh刷新
async function getFirstPageData(that, pageSize){
  let p1 = getPostingData(1, pageSize);
  let p2 = getTeamData(1, pageSize);
  
  Promise.all([p1,p2])
  .then(result => {
    let posting = result[0],
        teams = result[1];
    let jishiData =  dealWithPosting(posting);
    let jirenData = dealWithTeam(teams);
    that.setData({...jishiData, ...jirenData, 'isRefresherOpen' : false})
    return Promise.resolve();
  }).then(_ => {
    getNextPostingPage(that);
    getNextTeamPage(that);
  }).catch(err => {
    console.log(err);
    wx.showToast({
      title: '请求失败，请重试',
      icon: 'error'
    })
  })
  // 加载下一页的数据
};
//  ---------- --------- 发送请求 获取下一页 帖子 或 组队
async function getNextPostingPage(that){
  let {
    jishiIsLastPage,
    jishiCurrent,
    jishiPages
  } = that.data;
  if(!jishiIsLastPage){
    try {
      let res = await getPostingData(jishiCurrent + 1);
      let postingData = dealWithPosting(res);
      that.setData({
        'postingNextPage' : postingData
      });
    } catch (error) {
      wx.showToast({
        title: error,
        icon: 'error'
      })
    }
  }
};
async function getNextTeamPage(that){
  let {
    jirenIsLastPage,
    jirenCurrent,
    jirenPages
  } = that.data;
  if(!jirenIsLastPage){
    try {
      let res = await getTeamData(jirenCurrent + 1);
      let teamData = dealWithTeam(res);
      that.setData({
        'teamNextPage' : teamData
      });
    } catch (error) {
      wx.showToast({
        title: error,
        icon: 'error'
      })
    }
  }
}



