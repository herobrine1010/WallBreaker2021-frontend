// components/card-lost/card-my.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'示例标题示例标题示例标题'
    },
    postingDate:{
      // 发布日期
      type:String,
      value:'2021年6月21日'
    },
    labelText:{
      type:Array,
      value:['口红', 'Gucci']
    },
    description:{
      type:String,
      value:'在学校图书馆门口捡到一只Gucci的口红，看起来还没有用过多少，九成新。文字长度超过两行需要自动截取，只保留两行文字'
    },
    postingPic:{
      // 图片URL
      type:String,
      value:'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700'
    },
    type: {
      // 物品遗失0 or 失物寻主1
      type: Number,
      value: 1
    },
    closed:{
      type: Boolean,
      value: false
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
    tapClose: function() {
      this.setData({closed: true});
    }
  }
})
