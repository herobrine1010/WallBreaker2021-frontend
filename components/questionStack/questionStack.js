// components/questionStack/questionStack.js
Component({
  behaviors: ["wx://form-field-group"],
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    // 是否需要申请者回答问题
    isNeedQuestion: true,
    // 需要申请者回答的问题
    questionList: [
      {
        id: 1,
        content: "这是问题1"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 是否需要申请者回答问题
    switchQuestion: function () {
      this.setData({
        isNeedQuestion: !this.data.isNeedQuestion
      });
    },
    // 增添删除问题的逻辑
    append: function () {
      this.data.questionList.push({ id: this.data.questionList.length + 1, content: "" });
      this.setData({
        questionList
      });
    },
    deleteLast: function () {
      this.data.questionList.pop();
      this.setData({
        questionList
      });
    }
  }
});
