// components/dropdown-box/dropdown-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    range: {
      type: Array,
      value: []
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    //控制下拉菜单的显示
    isShow: false,
    //选择范围 
    result: [{
      id: 0,
      name: 'test1'
    },
    {
      id: 1,
      name: 'test2'
    }
    ],
    //当前选择项
    current: {}



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
        isShow: false
      })
      //this.triggerEvent("change", { ...selectedDataset })

    },
    // 此方法供父组件调用
    close() {
      this.setData({
        isShow: false
      })
    }

  },
  lifetimes: {
    attached() {
      let result = []
      //初始化data的result
      console.log('this.data',this.data)      
      for (let item of this.data.range) {
        console.log(item)
        result.push(item)
      }
      console.log('result',result)
      this.setData({
        //current: Object.assign({}, this.data.defaultOption),
        result: result
      })
    }
  }
})
