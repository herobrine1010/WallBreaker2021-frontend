// components/label-selector/dialog-radio.js
const baseSelectBehavior = require("./baseBehavior.js");
Component({
    behaviors: [baseSelectBehavior],
    /**
     * 组件的方法列表
     */
    methods: {
        tapLabel: function(e) {
            this.reset();
            let labels = this.data.labelList;
            let index = e.currentTarget.dataset.index;
            labels[index].selected  = !labels[index].selected;
            this.setData({
              labelList: labels,
            });
            
        }
    }
})
