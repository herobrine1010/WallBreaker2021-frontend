function matchPropName(list) {

  return changedList;
}
Component({
  behaviors: ['wx://form-field'],
  properties: {
    //承接父组件传值
    range: {
      type: Array,
      value: [{
        id:  0,
        name: 'test'
      }]
    },
    //默认显示
    defaultOption: {
      type: Object,
      value: {
        id: '000',
        name: '全部城市'
      }
    },
    //key,text实现字符转换
    key: {
      type: String,
      value: 'id'
    },
    text: {
      type: String,
      value: 'name'
    }
  },
  data: {
    isShow: false,
    current: {},
    value: 0,
  },
  observers: {
    "current": function(current) {
      this.setData({value: current.id});
    },
    "range": function(range) {
      // 属性名称转换, 如果不是 { id: '', name:'' } 格式，则转为 { id: '', name:'' } 格式
      let result = []
      if (this.data.key !== 'id' || this.data.text !== 'name') {       
        for (let item of this.data.range) {
          let { [this.data.key]: id, [this.data.text]: name } = item
          result.push({ id, name })
        }
      }
      this.setData({
        result
      })
    }
  },
  methods: {
    optionTap(e) {
      let dataset = e.target.dataset
      this.setData({
        current: dataset,
        isShow: false
      });

      // 调用父组件方法，并传参
      this.triggerEvent("change", { ...dataset })
    },
    openClose() {
      this.setData({
        isShow: !this.data.isShow
      })
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
      // 属性名称转换, 如果不是 { id: '', name:'' } 格式，则转为 { id: '', name:'' } 格式
      let result = []
      if (this.data.key !== 'id' || this.data.text !== 'name') {       
        for (let item of this.data.range) {
          let { [this.data.key]: id, [this.data.text]: name } = item
          result.push({ id, name })
        }
      }
      this.setData({
        // 初始化后未选择，current显示defaultOption
        current: Object.assign({}, this.data.defaultOption), 
        result
      })
    }
  }
})