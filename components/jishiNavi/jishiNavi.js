// components/navCustom/navCustom.js
Component({
  lifetimes:{
    attached:function(){
      // 获取导航栏信息
      const systemInfo = wx.getSystemInfoSync();
      // 胶囊按钮位置信息
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
      // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
      let navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
      let menuRight = systemInfo.screenWidth - menuButtonInfo.right;
      let menuTop = menuButtonInfo.top;
      let menuHeight = menuButtonInfo.height;

      // 动态获取标题宽度：
      // var obj=wx.createSelectorQuery();
      // obj.selectAll('.nav-title').boundingClientRect(function (rect) {
      //   console.log(rect[0].height)
      //   console.log(rect[0].width)
      // })
      // obj.exec() ;
      this.setData({
        navBarHeight,
        menuRight,
        menuTop,
        menuHeight
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    navTitleName:{
      type:String,
      value:'济事广场'
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
