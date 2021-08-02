// components/dropdown-box/dropdown-box.js
Component({
  behaviors: ['wx://form-field'], //使自定义组件可以被表单识别
  /**
   * 组件的属性列表
   */
  properties: {
    range: {
      type: Array,
      value: []
    },
    current: {
      type: Object,
      value: {
        id: 0,
        content: '竞赛'
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    value: '竞赛' //表单的value
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 展开折叠下拉框  
    openClose: function () {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //选择下拉框的元素展示
    optionTap: function (e) {
      console.log(e.target.dataset)
      let selectedDataset = e.target.dataset
      this.setData({
        current: selectedDataset,
        value: selectedDataset.content,
        isShow: false
      })
      this.triggerEvent("change", selectedDataset)

    },
    // 此方法供父组件调用
    close() {
      this.setData({
        isShow: false
      })
    }

  }
})