// 对应的html应为<scroll-view id="scroll" style="height: {{scrollviewHeight}};"></scroll-view> 
// 这个behavior将scrollview高度改为占满整个页面 除了自定义navigator

module.exports = Behavior({
  data: {
      scrollviewHeight: 'auto',
  },
  lifetimes:{
    attached:function(e){
      this.changeScrollHeight();
    }
  },
  methods: {
    // onShow: function() {
    //   this.changeScrollHeight();
    // },
    changeScrollHeight:function(){
      let windowHeight;
      //设置scroll-view高度
      wx.getSystemInfo({
        success: function (res) {
            windowHeight= res.windowHeight;
        }
      });
      let query = wx.createSelectorQuery();
      query.select('#scroll-view').boundingClientRect(rect=>{
          let top = rect.top;
          let height=windowHeight-top;
          this.setData({
            scrollviewHeight:height+'px',
          });
        }).exec();
        
    },
  }
})