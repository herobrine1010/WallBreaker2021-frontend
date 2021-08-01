// pages/jiren/initiateTeam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //组队主题
    themeOptions: [
      {
        id: 1,
        name: '竞赛'
      },
      {
        id: 2,
        name: '学术科研'
      },
      {
        id: 3,
        name: '一起造梦'
      },
      {
        id: 4,
        name: '其他'
      }
    ],
    //主题下拉框的选中项
    theme: {
      id:1,
      name:'竞赛'
    },
    //截止时间
    dueDate: '2021-09-01',
    //需求人数
    memberNumberOptions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    memberNumber: 1,
    
    //组队标题
    teamTitle: '',
    //组队内容
    teamContent:'',

    //图片url
    pictureURL: [],

    //是否需要申请者回答问题
    isNeedQuestion: true,
    //需要申请者回答的问题
    questionList: [
      {
        id: 1,
        content: ''
      },
      {
        id: 2,
        content: ''
      }
    ],
    
    //确认提交弹窗
    isDialogShow:false,
    dialogContent:"确认发起组队吗？",
    dialogTip:"",
    dialogCancelText:"取消",
    dialogOkText:"确认",

  },
  dropdownChange: function (e) {
    this.setData({
      theme: e.detail
    })
    console.log('选中主题',this.data.theme)
  },

  bindDateChange: function (e) {
    this.setData({
      dueDate: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      memberNumber: this.data.memberNumberOptions[e.detail.value]
    })
  },
  //是否需要申请者回答问题
  switchQuestion: function () {
    this.setData({
      isNeedQuestion: !this.data.isNeedQuestion
    })
  },
  //增添删除回答的逻辑
  append: function () {
    let newList = this.data.questionList
    let length = newList.length
    newList.push({id: length+1, content: ''})
    this.setData({
      questionList: newList
    })

  },
  deleteLast: function () {
    let newList = this.data.questionList
    newList.pop()
    this.setData({
      questionList: newList
    })
  },
  //表单提交
  teamInfoSubmit:function(e){
    this.setData({isDialogShow:true});
    console.log(e.detail.value)
    console.log(this.data.questionList)
    
  },
  //弹窗点按确认
  tapOk:function(e){
    console.log("点击确认之后的业务");
    wx.showToast({
      title: '成功提交！',
      icon: 'none',
      duration: 1000
    })
  },
})