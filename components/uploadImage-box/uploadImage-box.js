// components/uploadImage-box/uploadImage-box.js
/** 
这个组件只负责选择图片，不能上传图片。
有三种方式通信，获取组件数据value
  1. export(), 通过selectComponent获取
  2. trigger事件, 通过bind:change监听事件
  3. behavior 在<form />中绑定name使用
 **/
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //引入外部图片，方便显示图片
    extImageList: {
      type: Array,
      data: []
    },
    //存储用户上传的图片路径，写在data里出错
    value: {
      type: Array,
      data:[]
    },
    maxLength:{
      type:Number,
      value:9,
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  behaviors: ['wx://component-export', 'wx://form-field'],
  // 用于selectComponent调用时的返回值
  export() {
    return { image: this.data.value }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    uploadImage: function() {
      var that = this;
      let editList = this.data.value
      wx.chooseImage({
        count: this.properties.maxLength-editList.length,　　　　　　　　　　　　　　　　　　    // 最多可以选择的图片张数,每次选择后减少之后选择的总数
        sizeType: ['compressed'],      // 选择图片的尺寸
        sourceType: ['album', 'camera'],           // 选择图片的来源
        success: function(res) {
          let imageSize = res.tempFiles[0].size;
          editList = editList.concat(res.tempFilePaths)   //向后追加，数组连接
          that.setData({
            value: editList
          })
        },
      })
      
    },
    deleteImage: function(e) {
      //获取要删除的图片序号
      let delIndex = e.currentTarget.dataset.index
      this.data.value.splice(delIndex,1)
      this.setData({
        value: this.data.value
      })
    },
    zoomInDetailPicture:function(e){
      var imgUrl = this.data.value;
      wx.previewImage({
        urls: imgUrl,//注意这个urls,如果原来是数组就直接用,如果原来就一张图需要加中括号强制把他变成数组
        current: e.currentTarget.dataset.picUrl,//不写值的话默认是上面那个数组的第一个元素,只有写了点击对应图片才能点哪张放大哪张
      })
    }
  },
  observers: {
    'value': function(value) {
      this.triggerEvent('change',value)
    } 
  },

})
