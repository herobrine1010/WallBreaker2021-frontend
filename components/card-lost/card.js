// components/card-lost/card.js
Component({
  /**
   * 组件的属性列表
   */
  

  /*externalClasses:['card','image','tag','description','time','B'],外部样式类*/

  properties:{

    labelText:{
      type:String,
      value:'雨伞'
    },
    title:{
      type:String,
      value:'物品名称'
    },
    publishTime:{
      type:String,
      value:'1天前'
    },

    description:{
      type:String,
      value:'简要描述简要描述简要描述捡到东西的地方是哪里...'
    },
    postingPic:{
      type:String,
      value:''
    },
    isShowClose:{
      type:Boolean,
      value:false
    },
    closed:{
      type:Boolean,
      value:false
    },
    isShowKind:{
      type:Boolean,
      value:false
    },
    kind:{
      type:String,
      value:'失物招领'
    },
    cardMy:{
      type:Boolean,
      value:false
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
    tapClose:function(e){
      console.log(e)
      this.triggerEvent('tapClose',this.data.detail);
    },
  }
})
