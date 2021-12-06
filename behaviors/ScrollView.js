  // 滚动框的 滚动和回到最上事件：------------- -------------- ----------
module.exports = Behavior({
    data: {
        isRefresherOpen : false,
        showGoTopButton: false,
        topNum:0,
    },
    methods: {
        returnTop: function () {
            let that=this;
            this.setData({
             topNum:  0
            });
            setTimeout(function () {
              that.setData({showGoTopButton:false})
            }, 100)
          },
        onMyScroll:function(e){
          if(e.detail.scrollTop>100){
            this.setData({showGoTopButton:true})
          }else if(this.data.showGoTopButton){
            this.setData({showGoTopButton:false})
          }
        },
        onRefresherRefresh: function(){
          // 空方法 具体页面处重写
          setTimeout(this.setData({isRefresherOpen: false}), 2000);
        },

        // 与分页接口相关的代码
        
    }
  
})