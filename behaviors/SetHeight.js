// 对应的html应为<scroll-view id="scroll" style="height: {{scrollviewHeight}};"></scroll-view> 
// 这个behavior将scrollview高度改为占满整个页面 除了自定义navigator

module.exports = Behavior({
  data: {
      scrollviewHeight: '',
  },
  methods: {
    onShow: function() {
      this.changeScrollHeight();
    },
    changeScrollHeight:function(){
      let windowHeight;
      //设置scroll-view高度
      wx.getSystemInfo({
        success: function (res) {
            windowHeight= res.windowHeight;
            // console.log("windows",windowHeight);
        }
      });
      let query = wx.createSelectorQuery();
      query.select('#scroll').boundingClientRect(rect=>{
        // console.log(rect)
          let top = rect.top;
          // console.log(top);
          let height=windowHeight-top;
          console.log(height);
          this.setData({
            scrollviewHeight:height+'px',
          });
        }).exec();
        
    },
  }
})