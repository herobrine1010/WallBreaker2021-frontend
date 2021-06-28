// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#EE3D42",
    listTab:  [{
      "pagePath": "/pages/jishi/main",
      "iconPath": "/static/icon/jishi.png",
      "selectedIconPath": "/static/icon/jishi-solid.png"
    },
    {
      "pagePath": "/pages/jiren/main",  
      "iconPath": "/static/icon/jiren.png",
      "selectedIconPath": "/static/icon/jiren-solid.png"
    },
    {
      "pagePath": "/pages/personal/main",
      "iconPath": "/static/icon/personal.png",
      "selectedIconPath": "/static/icon/jiren-solid.png"
    }]
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      //this.setData({
       // selected: data.index
      //})
    }
  }
})