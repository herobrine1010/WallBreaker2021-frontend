// pages/collection/collection.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionTitle : "",
    leftButtonTitle : "",
    rightButtonTitle : "",
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
  onScrollToLower:function(){
    console.log("上拉触了滚动框的底");
  },


// 点击卡片之后的页面跳转


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    function setDueTime(time){
      if(time){
        let dueTime = new Date(time);
        return ('截止时间：' + dueTime.getFullYear() + '年' + dueTime.getMonth() + '月' + dueTime.getDay() + '日  ' + dueTime.getHours() + ':' + dueTime.getMinutes());
      }else{
        return '截止时间：暂无';
      };
    };
    // ----- --- ---------- ----判断为组队管理页面------ -------- ---- ----- ----- ---------
    let that=this;
    let teamAppliedByMe=request({
      url : '/userTeam/teamAppliedByMe',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      }
    })
    let teamInitiatedByMe=request({
      url : '/userTeam/teamInitiatedByMe',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      }
    })
      Promise.all([teamAppliedByMe,teamInitiatedByMe])
      .then(result => {
        let dataAppliedByMe=result[0].data.data;
        let dataInitiatedByMe=result[1].data.data;
        let lengthApplied=dataAppliedByMe.length;
        let lengthInitiated=dataInitiatedByMe.length;
        let i=0;
        let j=0;
        let turn='';
        let item=null;
        let list=[];
        while(i<lengthApplied||j<lengthInitiated){
          // Date(dataAppliedByMe[i].dueTime).

          if(i=lengthApplied){
            turn='initiator'
          }else if(j=lengthInitiated){
            turn='applier'
          }else{
            let date1=Date(dataAppliedByMe[i].updateTime).getTime();
            let date2=Date(DeviceOrientationEvent[i].updateTime).getTime();
            if(date1<=date2){
              turn='applier'
            }else{
              turn='initiator'
            }
          }
          if(turn=='applier'){
            item=dataAppliedByMe[j];
            item.dueTime = setDueTime(item.dueTime);
            console.log(item.dueTime);
            switch(dataInitiatedByMe){
              case 0:
                item.teamCondition='applying'
                item.rightTagText='我已申请'
                break;
              case 1:
              case 2:
                item.teamCondition='pass'
                item.rightTagText='我已入队'
                break;
              case 3:
              case 4:
                item.teamCondition='refuse'
                item.rightTagText='申请未通过'
                break;
              case 5:
              case 6:
                item.teamCondition='close'
                item.rightTagText='已关闭'
                break;
            }
            i++;
          }else if(turn=='initiator'){
            item=dataInitiatedByMe[j];

            item.dueTime = setDueTime(item.dueTime);
            console.log(item.dueTime);
            item.teamCondition='mine';
            item.rightTagText='我发起的';
            if(dataAppliedByMe.status>2){
              item.teamCondition='close';
              item.rightTagText='已关闭';
            }
            j++;
          }
          list.push(item);
          console.log(item);
        }
        that.setData({jirenItemList:list})
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

  }
})