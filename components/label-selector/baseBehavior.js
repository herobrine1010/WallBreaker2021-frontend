module.exports = Behavior({
    properties: {
      // 传入的标签列表
      labels: {
        type: Array,
        value: [],
      },
      // 是否显示筛选框，用于弹出收回筛选框
      isFilterShow: {
        type: Boolean,
        value: false
      }
    },
    data: {
      // 组件专属的标签列表
      labelList: [
        {
          id: 26,
          createTime: "2021-08-20 00:13:57",
          updateTime: "2021-08-20 00:13:57",
          content: "水杯",
          type: "tongde",
          deleted: false,
          selected: false
        }
      ],
      selectedLabelList: [], 
      isWarnVisiable: false
   },
    
  
    lifetimes: {
      attached: function() {
        this.reset();
      }
    },
    observers: {
    },
    methods: {
      tapLabel: function(e) {
        // 改变某个标签的选中状态
        let labels = this.data.labelList;
        let index = e.currentTarget.dataset.index;
        // 通过索引index（从0开始）修改数组元素，index与id不同
        let sum = 0;
        for(let i = 0;i<labels.length;i++){
          if(labels[i].selected){
            sum +=1;
          }
        }
        if(sum<3){
          labels[index].selected  = !labels[index].selected;
          this.setData({
            labelList: labels,
          })
        }else if(labels[index].selected){//已选中3个标签后，只减不加
          labels[index].selected  = false;
          this.setData({
            labelList: labels,
            isWarnVisiable : false
          })
        }else{
          this.setData({
            isWarnVisiable : true
          })
        }
      },
      tapConfirm: function(e) {
        /* 点击标签时不改变selectedLabelList, 当点击确定时才修改selectedLabelList, 确认修改 */
        this.setData({
          selectedLabelList: this.data.labelList.filter(label => label.selected)
        });
        this.triggerEvent('change',this.data.selectedLabelList);
        this.close();
      },
      tapCancel: function() {
        this.close();
      },
      // ------功能性函数------
      reset: function() {
        // 重置标签，将selected由数据库中的null重置为false
        let labels = this.data.labels;
        for (let item of labels) {
          item.selected = false;
        }
        this.setData({labelList: labels});
      },
      setLabelsSelected: function() {
      /* 根据已选标签设置所有标签的选中性 */
        let tagList = this.data.labelList;
        let tagChoosenList = this.data.selectedLabelList;
        for(let key in tagList){
          tagList[key].selected=false;
          for(let key2 in tagChoosenList){
            if(tagList[key].id==tagChoosenList[key2].id){
              tagList[key].selected=true;
              break;
            }
          }
        };
        this.setData({labelList: tagList});
      },
      checkLength:  function() {
  
      },
      // ------ 显示\展示相关函数
      openClose: function(e) {
        // 控制标签列表显示与关闭
        this.setData({isFilterShow: !this.data.isFilterShow});
      },
      close: function() {
        this.setData({isFilterShow: false});
      }
    }
  })
  