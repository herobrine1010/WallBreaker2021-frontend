// components/teamDetail/initiator-teamDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认标题"
    },
    isTeamClosed: {
      type: Boolean,
      value: false
    },
    avatar: {
      type: String,
      value: "https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02"
    },
    nickname: {
      type: String,
      value: "默认昵称"
    },
    fromTime: {
      type: String,
      value: "默认天数前"
    },
    dueTime: {
      type: String,
      value: "默认天数后结束"
    },
    isDetailShow: {
      type: Boolean,
      value: false
    },
    content: {
      type: String,
      value:
        "这是默认内容这是因为中间不能够打省略号吗啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊这是默认内容"
    },
    pictures: {
      type: Array,
      value: ["a", "a", "b", "c"]
    },
    picturesNum: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    tapAvatar: function () {
      this.triggerEvent("tapAvatar");
    },
    closeTeam: function () {
      this.triggerEvent("closeTeam");
    },
    seeDetail: function () {
      this.setData({
        isDetailShow: true
      });
    },
    detailHide: function () {
      this.setData({
        isDetailShow: false
      });
    },
    viewPic(e) {
      this.triggerEvent("viewPic", e.currentTarget.dataset);
    }
  }
});
