import {request} from "../../request/request.js"
// pages/jiren/anwserQuestion.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxlengthMessage: "",
    questionItems: [
      {
        index: 1,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      },
      {
        index: 2,
        questionText: '这里是问题，xxxxx？'
      }

    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    if(options.teamId){
      request({
        url: '/team/getTeam/'+options.teamId,
        // data:{question},
        header:{'cookie':app.globalData.token},
      })
      .then(res => {
        let question=JSON.parse(res.data.data.question);
 
        let list=[];
        for(let item in question){
          list.push({
            questionText:question[item],
          })
        }
        that.setData({
          teamId:options.teamId,
          questionItems:list
        })
      })

    }

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



  submitAnswer: function(e) {
    var answerList = e.detail.value
    this.setData({answerList:e.detail.value})
    let dialog = {
      isDialogShow: true,
      content:"确定提交回答吗？",
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      tapOkEvent:"dialogTapOkForSubmitAnswer"
    };
    this.setData({
      dialog
    })
  },
  dialogTapOkForSubmitAnswer:function(){
    let that=this;
    let index=1;
    let answerList={};
    for (let key in that.data.answerList) {
        answerList[index] = that.data.answerList[key];
        index = index + 1;
    };
    request({
      url: '/userTeam/apply',
      method:"POST",
      header:{'cookie':app.globalData.token},
      data:{
        teamId:that.data.teamId,
        // answer:that.data.answerList,
        answer:JSON.stringify(answerList)
      },
    })
    .then(res => {
      if(res.statusCode==200 && res.data.success){
        const eventChannel = that.getOpenerEventChannel()
        eventChannel.emit('getResult', {data: true});
        //调试用
        wx.navigateBack({
          delta: 0,
        });
        wx.showToast({
          title: '申请已提交',
          icon:'success',
          duration:2000
        });
      }else if(res.data.msg == "noWxId"){
        let dialog = {
          hasInputBox:false,
          content:"请完善微信号~",
          tip:"填写微信号可以更好地使用组队功能，保证微信号只有队伍成员可见！",
          cancelText:"返回",
          okText:"去填写",
          tapOkEvent:"tapOkForAddWxId",
          tapCancelEvent:"tapCancelForAddWxId",
          isDialogShow:true,
        }
        that.setData({
          dialog
        });
      }else{
        wx.showToast({
          title: '网络异常，请重试 :(',
          icon: 'none',
          duration: 1000
        });
      }
    })
  },

  // 完善微信号的两个事件
  tapOkForAddWxId(){
    wx.navigateTo({
      url: '../personal/personalDetails?source=needWxId',
    })
  },
  tapCancelForAddWxId(){
    this.setData({
      isDialogShow:false
    })
  },
  
  isMaxlength: function(e) {
    var textLength = e.detail.value.length;
    let questions=this.data.questionItems;
    let index=e.target.dataset.index;
    if (textLength==50)
    {
      questions[index].message='字符数已达上限！';
      questions[index].isMaxlength=true;
      this.setData({questionItems:questions})
    }else if(questions[index].isMaxlength==true&&textLength<50){
      questions[index].message='';
      questions[index].isMaxlength=false;
      this.setData({questionItems:questions})
    }
  }
})