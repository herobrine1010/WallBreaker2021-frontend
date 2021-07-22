// components/personal-brief/personal-brief.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatarPath :{
      type: String,
      value: '../../static/icon/default-user-big.png'
    },
    personBrief :{
      type: Object,
      value: {}
    },
    labels :{
      type: Array,
      value:[{
        type : 'personal',
        name : '细节控'
      },{
        type : 'personal',
        name : '好学小白'
      },{
        type : 'interest',
        name : '口才'
      },{
        type : 'interest',
        name : '设计'
      }]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
