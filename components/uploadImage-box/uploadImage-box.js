// components/uploadImage-box/uploadImage-box.js
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
    //存储用户上传的图片路径
    imageList: {
      type: Array,
      data:[]
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  behaviors: ['wx://component-export'],
  // 用于selectComponent调用时的返回值
  export() {
    return { image: this.data.imageList }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    uploadImage: function() {
      var that = this;
      let editList = that.data.imageList
      wx.chooseImage({
        count: 9,　　　　　　　　　　　　　　　　　　    // 最多可以选择的图片张数
        sizeType: ['original', 'compressed'],      // 选择图片的尺寸
        sourceType: ['album', 'camera'],           // 选择图片的来源
        success: function(res) {
          editList = editList.concat(res.tempFilePaths)   //向后追加，数组连接
          that.setData({
            imageList: editList
          })
        },
      })
      
    },
    deleteImage: function(e) {
      //获取要删除的图片序号
      let delIndex = e.currentTarget.dataset.index
      console.log('删除序号',delIndex)
      this.data.imageList.splice(delIndex,1)
      this.setData({
        imageList: this.data.imageList
      })
    },
    zoomInDetailPicture:function(e){
      var imgUrl = this.data.imageList;
      wx.previewImage({
        urls: imgUrl,//注意这个urls,如果原来是数组就直接用,如果原来就一张图需要加中括号强制把他变成数组
        current: e.currentTarget.dataset.picUrl,//不写值的话默认是上面那个数组的第一个元素,只有写了点击对应图片才能点哪张放大哪张
      })
    }
  },
  observers: {
    'imageList': function(imageList) {
      this.triggerEvent('change',imageList)
    } 
  },
  /*
  lifetimes: {
    attached() {
      this.setData({
        imageList: srcList


      })


    }
  }
    */
  

})
