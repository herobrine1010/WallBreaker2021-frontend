// components/label-selector/dialog-radio.js
const baseSelectBehavior = require("./baseBehavior.js");
Component({
  behaviors: [baseSelectBehavior],
  /**
   * 组件的方法列表
   */
  methods: {
    tapLabel: function (e) {
      const index = e.currentTarget.dataset.index;
      const labels = this.data.labelList;
      if (labels[index].selected) {
        labels[index].selected = false;
      } else {
        this.reset();
        labels[index].selected = true;
      }

      this.setData({
        labelList: labels
      });
    }
  }
});
