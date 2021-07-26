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
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    //存储用户上传的图片路径
    imageList:[
      
    ]
    
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
      let editList = this.data.imageList
      console.log('删除序号',delIndex)
      editList.splice(delIndex,1)
      this.setData({
        imageList: editList
      })


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
