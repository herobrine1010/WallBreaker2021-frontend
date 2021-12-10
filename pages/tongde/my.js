// pages/tongde/my.js
import {request} from "../../request/request.js";
import {formatTime, getDateDiff} from "../../utils/util.js";
const setHeight = require("../../behaviors/SetHeight.js")
Component({
  behaviors: [setHeight],
  /**
   * 页面的初始数据
   */
  data: {
     myLostFoundItemList:[
      // {
      // 'id': '10', //跳转用
      // 'labelContent': ['水杯','钱包'],
      // 'title':'示例标题示例标题',
      // 'type': 0,
      // 'postingDate':'2021年6月21日',
      // 'description':'这是一段描述性文字，仅用于测试。这是一段用来测试省略号是否能正常显示的文字',
      // 'postingPic':'https://assets.burberry.com/is/image/Burberryltd/109A4FC5-0F33-4E5B-8488-11626C39FB3F.jpg?$BBY_V2_B_3x4$&wid=1278&hei=1700',
      // 'closed': false
      // }
    ], 

  },
  /**
   * 生命周期函数--监听页面加载
   */
  methods: {
  onLoad: function (options) {
    request({
      url: "/userLostFound/getMYLostFound",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      },
      method : 'GET',
    }).then(res => {
      let data = res.data.data;
      // console.log("我的失物招领返回数据：",data);
      let myLostFoundItemList = data.map(v => {
        // 分割日期字符串"2021-5-23 12:23:34" 再连接成"2021年5月23号"
        let dateList = v.createTime.split(/-|\s/,3);
        let dateString = `${dateList[0]}年${dateList[1]}月${dateList[2]}日`;
        // console.log(dateString);
        return {
          'id': v.id, //跳转用
          'title':  v.name,
          'type': v.type,
          'postingDate': dateString,
          'description': v.content,
          'postingPic': v.firstPicUrl,
          'closed': v.closed,
          'labelContent': v.labelList,
          'closed': v.status // 帖子是否关闭 0--未关闭 1--关闭
        }
      });
      myLostFoundItemList.reverse();
      this.setData({
        myLostFoundItemList,
      });
    })
  },
  }
})