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
    //截止时间
    date: '2016-09-01',
    //需求人数
    memberNumberOptions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    memberNumber: 1,
    
    //是否需要申请者回答问题
    isNeedQuestion: true,

    //需要申请者回答的问题
    questionList: [
      {
        id: 1,
        content: '问题1'
      },
      {
        id: 2,
        content: '问题2'
      }
    ]

  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      memberNumber: e.detail.value
    })
  },
  switchQuestion: function () {
    this.setData({
      isNeedQuestion: !this.data.isNeedQuestion
    })
  },
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
  }
})