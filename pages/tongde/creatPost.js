// pages/tongde/creatPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagboxShow:false,
    tagList:[{
      'name':'水杯',
      'choosen':false
    },{
      'name':'雨伞',
      'choosen':false
    },{
      'name':'证件',
      'choosen':false
    },{
      'name':'耳机',
      'choosen':false
    },{
      'name':'钥匙',
      'choosen':false
    },{
      'name':'钱包',
      'choosen':false
    },{
      'name':'数码',
      'choosen':false
    },{
      'name':'衣物',
      'choosen':false
    },{
      'name':'眼镜',
      'choosen':false
    },{
      'name':'文具',
      'choosen':false
    },{
      'name':'书籍',
      'choosen':false
    },{
      'name':'其他',
      'choosen':false
    }],

    connactTypes:['QQ','微信','手机','邮箱','其他'].map(item=>{
      return {content:item}
    }),
    connactType:{content:'QQ'},
    height:'auto',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    this.changeScrollHeight();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickToChooseTag:function(){
    let tagList=this.data.tagList;
    let tagChoosenList=this.data.tagChoosenList;
    for(let key in tagList){
      if(tagList[key].choosen){
        tagList[key].choosen=false;
        for(let key2 in tagChoosenList){
          // console.log(tagChoosen)
          if(tagList[key].name==tagChoosenList[key2]){
            tagList[key].choosen=true;
            break;
          }
        }
      }
    }
    this.setData({
      tagboxShow:true,
      tagList
    })
  },
  clickTag:function(e){
    console.log(e)
    let tagList=this.data.tagList;
    tagList[e.currentTarget.dataset.index].choosen=!tagList[e.currentTarget.dataset.index].choosen;
    this.setData({tagList})
  },
  clickYesOfTagBox:function(){
    let list=[];
    let tagList=this.data.tagList;
    for(let key in tagList){
      if( tagList[key].choosen){
        list.push(tagList[key].name)
      }
    };
    this.setData({
      tagChoosenList:list,
      tagboxShow:false
    })
  },
  clickNoOfTagBox:function(){
    this.setData({tagboxShow:false})
  },
  changeScrollHeight:function(){
    let windowHeight;
    //设置scroll-view高度
    wx.getSystemInfo({
      success: function (res) {
          windowHeight= res.windowHeight;
      }
    });
    let query = wx.createSelectorQuery();
    query.select('#scroll').boundingClientRect(rect=>{
      console.log(rect)
        let top = rect.top;
        let height=windowHeight-top;
        this.setData({
          height:height+'px',
        });
      }).exec();
      
  },
})