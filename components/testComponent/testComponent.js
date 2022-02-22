Component({
  behaviors: [],

  properties: {
    // 传入参数。用于父组件对子组件传值
    myProperty: {
      // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: "", // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) {} // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    },
    myProperty2: String // 简化的定义方式
  },
  data: {}, // 私有数据，可用于模版渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {}
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {},

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {}
  },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
        myProperty: "Test"
      });
    },
    jumpToTest: function () {
      wx.navigateTo({
        url: "/pages/testPage/testPage"
      });
    },
    jumpToJiren: function () {
      wx.navigateTo({
        url: "/pages/jiren/main"
      });
    },
    jumpToJishi: function () {
      wx.navigateTo({
        url: "/pages/jishi/main"
      });
    },
    jumpToPersonal: function () {
      wx.navigateTo({
        url: "/pages/personal/main"
      });
    }
  }
});
