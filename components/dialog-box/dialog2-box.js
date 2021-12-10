// components/dialog-box/dialog2-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'默认标题'
    },
    isDialogShow:{
      type:Boolean,
      value:false
    },
    content:{
      type:String,
      value:'这是默认内容这是因为中间不能够打省略号吗啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊这是默认内容'
    },
    pictures:{
      type:Array,
      value: [
        'a',
        'a',
        'b',
        'c'
      ]
    },
    picturesNum:{
      type:Number,
      value: 0
    },
    button:{
      type:String,
      value:"返回"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    maxHeight:"auto"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    detailHide:function(){
      this.setData({
        isDialogShow:false
      })
    },
    changeSize:function(){
      var that=this;
      var windowHeight;
      wx.getSystemInfo({
        success: function (res) {
            windowHeight= res.windowHeight;
        }
      });
      let query = this.createSelectorQuery();
      query.select('#scroll').boundingClientRect(rect=>{
          let maxHeight = rect.height;
          if(maxHeight>windowHeight*0.7){
            that.setData({
              maxHeight:"70vh"
            })
          }
        }).exec();
    }
  },
})
