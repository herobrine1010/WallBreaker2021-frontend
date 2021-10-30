// components/label-selector/dialog-radio.js
const baseSelectBehavior = require("./baseBehavior.js");
Component({
    behaviors: [baseSelectBehavior],
    /**
     * 组件的方法列表
     */
    methods: {
        tapLabel: function(e) {
            let index = e.currentTarget.dataset.index;
            let labels = this.data.labelList;
            if (labels[index].selected) {
                labels[index].selected = false; 
            } else {
                this.reset();
                labels[index].selected  = true;
            }

            this.setData({
              labelList: labels,
            });
            
        }
    }
})
