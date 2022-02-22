// components/filter/filter.js
Component({
  properties: {
    // 传入的标签列表
    labels: {
      type: Array,
      value: []
    },
    // 是否开启筛选，用于渲染页面
    isFilterOn: {
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
      },
      {
        id: 27,
        createTime: "2021-08-20 00:16:04",
        updateTime: "2021-08-20 00:16:04",
        content: "雨伞",
        type: "tongde",
        deleted: false,
        selected: false
      }
    ],
    selectedLabelList: [],
    isFilterShow: false // 是否显示筛选框，用于弹出收回筛选框
    // isFilterOn: false, // 是否开启筛选，用于切换页面“筛选”样式
  },

  lifetimes: {
    attached: function () {
      // 重置标签，将selected由数据库中的null重置为false
      const labels = this.data.labels;
      for (const item of labels) {
        item.selected = false;
      }
      this.setData({ labelList: labels });
    }
  },
  observers: {
    labelList: function (labels) {
      this.setData({
        selectedLabelList: labels.filter(label => label.selected)
      });
    },
    selectedLabelList: function (list) {
      this.setData({ isFilterOn: list.length != 0 });
    }
  },
  methods: {
    tapLabel: function (e) {
      // 改变某个标签的选中状态
      const labels = this.data.labelList;
      const index = e.currentTarget.dataset.index;
      // 通过索引index（从0开始）修改数组元素，index与id不同
      labels[index].selected = !labels[index].selected;
      this.setData({ labelList: labels });
      // 根据需要触发事件
      // this.triggerEvent('change',this.data.selectedLabelList);
    },
    tapComfirm: function (e) {
      this.triggerEvent("change", this.data.selectedLabelList);
      this.close();
    },
    tapCancel: function () {
      this.close();
    },
    tapShade: function (e) {
      this.close();
    },
    openClose: function (e) {
      // 控制标签列表显示与关闭
      this.setData({ isFilterShow: !this.data.isFilterShow });
    },
    close: function () {
      this.setData({ isFilterShow: false });
    }
  }
});
