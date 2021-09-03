// pages/testPage/testfilter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tongdeLabels: [
      {
        "id": 26,
        "createTime": "2021-08-20 00:13:57",
        "updateTime": "2021-08-20 00:13:57",
        "content": "水杯",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 27,
        "createTime": "2021-08-20 00:16:04",
        "updateTime": "2021-08-20 00:16:04",
        "content": "雨伞",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 28,
        "createTime": "2021-08-20 00:16:04",
        "updateTime": "2021-08-20 00:16:04",
        "content": "证件",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 29,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "耳机",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 30,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "钥匙",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 31,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "钱包",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 32,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "数码",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 33,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "衣服",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 34,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "眼镜",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 35,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "文具",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 36,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "书籍",
        "type": "tongde",
        "deleted": false,
        "selected": null
      },
      {
        "id": 37,
        "createTime": "2021-08-20 00:16:05",
        "updateTime": "2021-08-20 00:16:05",
        "content": "其他",
        "type": "tongde",
        "deleted": false,
        "selected": null
      }
    ],
    on: false

  },
  openClose: function (e) {
    this.selectComponent('#filter').openClose();
  },
  filterChange: function (e) {
    let labels = e.detail;
    this.setData({tongdeLabels: labels});
    // this.selectComponent('#filter').close();
  }
})