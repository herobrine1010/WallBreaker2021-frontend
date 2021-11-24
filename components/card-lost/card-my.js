// components/card-lost/card-my.js
import {request} from "../../request/request.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    card: {
      type: Object,
      value: {
        title: '示例标题示例标题示例标题',
        postingDate: '2021年6月21日',
        labelText: ['口红', 'Gucci'],
        description: '在学校图书馆门口捡到一只Gucci的口红，看起来还没有用过多少，九成新。文字长度超过两行需要自动截取，只保留两行文字',
        postingPic: 'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
        type: 0,       // 物品遗失0 or 寻找失主1
        closed: false,
        id: 0
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
/*     title: '示例标题示例标题示例标题',
    postingDate: '2021年6月21日',
    labelText: ['口红', 'Gucci'],
    description: '在学校图书馆门口捡到一只Gucci的口红，看起来还没有用过多少，九成新。文字长度超过两行需要自动截取，只保留两行文字',
    postingPic: 'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
    type:  0,
    closed: false, */

    dialog:{
      isDialogShow: false,
      content:'该条信息关闭后不可重启，确定要关闭吗?',
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      isShowInfo:false,
      /*tapOkEvent:"dialogTapOkForAcceptApplying"*/
    },
  },
  lifetimes: {
    attached: function() {
      let card = this.data.card;
      this.setData({
        title: card.title,
        postingDate: card.postingDate,
        labelText: card.labelContent,
        description: card.description,
        postingPic: card.postingPic,
        type:  card.type,
        closed: card.closed,
        id: card.id
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapClose: function() {
      // this.triggerEvent('close',this.data.detail);
      this.setData({
        'dialog.isDialogShow':true,
      });

    },
    tapOk: function() {
      const that = this;
      this.setData({closed:true});
      request({
        url: "/userLostFound/removeMyLostFound",
        header: {
          'content-type': 'application/json',
          'cookie':wx.getStorageSync("token")
        },
        method : 'POST',

        data: {
          id: that.data.id
        }
      }).then(res => {
        let data = res.data.data;
        console.log(res)
      })
    },
    navigateToDetail: function() {
      wx.navigateTo({
        url: '/pages/tongde/detail?lostfoundId='+this.data.id,
      })
    }
  }
})
