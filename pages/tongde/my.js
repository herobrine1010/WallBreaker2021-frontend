// pages/tongde/my.js
import {request} from "../../request/request.js";
import {formatTime, getDateDiff} from "../../utils/util.js";
const setHeight = require("../../behaviors/SetHeight.js")
const app = getApp()

async function requestWithPage(pageNo) {
  return request({
    url: "/userLostFound/getMyLostFoundWithPage",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method : 'GET',
    data: {
      pageNo: pageNo,
      pageSize: 7
    }
  })
}
function dealRequestData(res) {
  let data = res.data.data.records;
  const pages = res.data.data.pages;
  let myLostFoundItemList = data.map(v => {
    // 分割日期字符串"2021-5-23 12:23:34" 再连接成"2021年5月23号"
    let dateList = v.createTime.split(/-|\s/,3);
    let dateString = `${dateList[0]}年${dateList[1]}月${dateList[2]}日`;
    return {
      'id': v.id, //跳转用
      'title':  v.name,
      'type': v.type,
      'postingDate': dateString,
      'description': v.content,
      'postingPic': v.firstPicUrl,
      'closed': v.closed,
      'labelContent': v.labelList,
      'closed': v.status, // 帖子是否关闭 0--未关闭 1--关闭
      'ownerNotice': v.ownerNotice,
      'isPublishedByMe': v.ownerUserId === app.globalData.token
    }
  });
  return {myLostFoundItemList, pages};

}
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
    pageNo: 1,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  methods: {
  onLoad: function (options) {
    requestWithPage(1)
    .then(res => {

      const {myLostFoundItemList} = dealRequestData(res);
      this.setData({
        myLostFoundItemList,
      });
    })
  },
  async getNextPage() {
    if(this.data.isLoading === true) return;
    if(this.data.pageNo >= this.data.pages) return;

    this.setData({isLoading: true})
    const res = await requestWithPage(this.data.pageNo + 1);
    const {myLostFoundItemList:nextPageData,pages} = dealRequestData(res);
    this.setData({
      myLostFoundItemList: this.data.myLostFoundItemList.concat(nextPageData),
      pageNo: this.data.pageNo + 1,
      pages
    });
    this.setData({isLoading: false})
  }
  }
})