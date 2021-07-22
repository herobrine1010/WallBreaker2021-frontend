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
      let imageList = that.data.imageList
      wx.chooseImage({
        count: 9,　　　　　　　　　　　　　　　　　　    // 最多可以选择的图片张数　　
        sizeType: ['original', 'compressed'],      // 选择图片的尺寸
        sourceType: ['album', 'camera'],           // 选择图片的来源
        success: function(res) {
          imageList.push(res.tempFilePaths)   //向后追加
          that.setData({
            imageList: imageList
          })
        },
      })
      console.log(that.data)
    },
    deleteImage: function(e) {
      console.log(e.target.dataset.index)
      let delIndex = e.target.dataset.index
      let editList = this.data.imageList
      console.log(editList)
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
