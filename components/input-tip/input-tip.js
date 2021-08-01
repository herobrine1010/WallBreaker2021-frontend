Component({
  /**
   * 组件的属性列表
   */
  behaviors: ['wx://form-field-group'],
  properties: {
    //表单form中的name
    name:{
      type: String,
      value: '',
    },
    maxlength: {
      type: Number,
      value: 25
    },
    placeholder: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowTip: true,//暂时弃用，使用tip=''代替
    tip: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkLength: function(e) {
      let textLength = e.detail.value.length
      if (textLength >= this.data.maxlength)
      {
        this.setData({
          tip: '字符数已达上限!'
        })
      }
      else{
        this.setData({
          tip: ''
        })

      }
    },
    checkEmpty: function(e) {
      let textLength = e.detail.value.length
      if (textLength == 0)
      {
        this.setData({
          tip: '该项未填写'
        })
      }
    }
  }
})
