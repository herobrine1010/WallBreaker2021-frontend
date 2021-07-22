// components/label-selector/label-selector.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title : {
      type : String,
      value : '个人标签'
    },
    isWarnVisiable : {
      type : Boolean,
      value : false
    },
    labels : {
      type : Array,
      value : []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLabelTap : function(e){
      // console.log(e.currentTarget.dataset.index);
      const index = e.currentTarget.dataset.index;
      let labels = this.data.labels;
      //判断当前选中了几个标签
      let sum = 0;
      for(let i = 0;i<labels.length;i++){
        if(labels[i].isLabelActive){
          sum +=1;
        }
      }
      if(sum<3){
        labels[index].isLabelActive  = !labels[index].isLabelActive;
        this.setData({
          labels,
        })
      }else if(labels[index].isLabelActive){//已选中3个标签后，只减不加
        labels[index].isLabelActive  = false;
        this.setData({
          labels,
          isWarnVisiable : false
        })
      }else{
        this.setData({
          isWarnVisiable : true
        })
      }
    }
  }
})
