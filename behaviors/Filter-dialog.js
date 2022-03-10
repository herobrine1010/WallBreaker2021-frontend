/* 
弹出筛选框相关逻辑, 需配合/components/label-selector/dialog-radio 组件
.json
"dialog-label": "/components/label-selector/dialog-radio"
.wxml
  <dialog-label id="dialog-label-selector" labels="{{labelList}}" bind:change="labelChanged"></dialog-label>

*/
module.exports = Behavior({
  data: {
    // 标签相关
    // 测试用数据
    labelList: [
      {
        "id": 26,
        "content": "水杯",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 27,
        "content": "雨伞",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 28,
        "content": "证件",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },

    ],
    // 用筛选框选中的标签列表， 目前为单选
    selectedLabelList: [],
    id: null, // selected labels id
  },
  methods: {
    // ------------筛选框相关的函数-----------------
    clickConditionFilter: function(e) {
      // 弹出筛选框
      let selector = this.selectComponent('#dialog-label-selector');
      // 重新加载筛选框, 更新数据
      selector.reset();
      selector.openClose(); //不用全局变量,即可弹出关闭dailog筛选标签
      selector.setLabelsSelected();
    },
    labelChanged: function(e) {
      // 点击确定button, 传入选中的标签
      let selectedLabelList = e.detail;
      this.setData({selectedLabelList})
    },
    // -----------筛选框函数结束--------------
  }
})