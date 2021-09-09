// pages/collection/collection.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";
import {formatTime} from "../../utils/util.js";

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
      'title':'示例标题示例标题示例标题…',
      'teamCondition':'refuse',
      'rightTagText':'申请未通过',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'initiator':'发起人: 示例用户',
      'peopleCount':'3/5',
      'postingPic':''
    },
    {
      'labelText':'熬夜秃头',
      'title':'示例标题示例标题示例标题…',
      'teamCondition':'pass',
      'rightTagText':'我已入队',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'description':'这是一段描述性文字，仅用于测试。这是一段……',
      'initiator':'发起人: 示例用户',
      'peopleCount':'3/5',
      'postingPic':''
    },
    {
      'labelText':'熬夜秃头',
      'title':'示例标题示例标题示例标题…',
      'teamCondition':'mine',
      'rightTagText':'',
      'dueTime':'截止时间: 2021年6月21日 14:00',
      'description':'这是一段描述性文字，仅用于测试。这是一段测试组件是否可以正常换行的文字……',
      'initiator':'',
      'peopleCount':'0/5',
      'postingPic':''
    }
    ],
    jishiItemList : [
      {
        'labelText':'教务',
        'title':'学生评学评教通知',
        'rightTagText':'',
        'userName':'新生院张老师',
        'publishTime':'2天前',
        
        'description':'请大家登陆1.tongji.edu.cn，尽快完成评学评教！超过九月一号未完成的同学不能参加下学期的',
        'postingPic':''
      },
      {
        'labelText':'活动',
        'title':'十大歌手领票',
        'rightTagText':'我发布的',
        'userName':'学生会小王',
        'publishTime':'1天前',
        'description':'这是一段描述性文字，仅用于测试。这是一段……',
        'postingPic':''
      },
      {
        'labelText':'教务',
        'title':'学生评学评教通知',
        'rightTagText':'',
        'userName':'新生院张老师',
        'publishTime':'2天前',
        
        'description':'请大家登陆1.tongji.edu.cn，尽快完成评学评教！超过九月一号未完成的同学不能参加下学期的',
        'postingPic':''
      },
      {
        'labelText':'活动',
        'title':'十大歌手领票',
        'rightTagText':'我发布的',
        'userName':'学生会小王',
        'publishTime':'1天前',
        'description':'这是一段描述性文字，仅用于测试。这是一段……',
        'postingPic':''
      },
      {
        'labelText':'教务',
        'title':'学生评学评教通知',
        'rightTagText':'',
        'userName':'新生院张老师',
        'publishTime':'2天前',
        
        'description':'请大家登陆1.tongji.edu.cn，尽快完成评学评教！超过九月一号未完成的同学不能参加下学期的',
        'postingPic':''
      },
      {
        'labelText':'活动',
        'title':'十大歌手领票',
        'rightTagText':'我发布的',
        'userName':'学生会小王',
        'publishTime':'1天前',
        'description':'这是一段描述性文字，仅用于测试。这是一段……',
        'postingPic':''
      }
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
  // 以下为发起请求：
  getList(self) {
    let favouritePosting = request({
      url : '/userFavouritePosting/getMyFavouritePosting',
      header: {
        'content-type': 'applicationx-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      }
    });
    let favouriteTeam = request({
      url : '/userFavouriteTeam/getMyFavouriteTeam',
      header: {
        'content-type': 'applicationx-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      }
    });
    // 采用Promise.all 并行处理两个请求-------------------
    Promise.all([favouritePosting,favouriteTeam])
      .then(result => {
        console.log(result[0].data.data[0]);
        // 处理收藏组队的数据------------------
        let jirenItemList = result[1].data.data.map( v=>{
          let team = {
            labelText : v.labelContent,
            title : v.title,
            description : v.content,
            initiator : v.initiatorNickName,
            peopleCount : v.participantNumber + '/' + v.dueMember,
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
            description : v.content,
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
    console.log("上拉触了滚动框的底");
  },
  onRefresherRefresh(){
    const self = this;
    this.getList(self);
  },

  

  // 点击卡片之后的页面跳转


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const self = this;
    this.getList(self);
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
    this.onLoad();
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