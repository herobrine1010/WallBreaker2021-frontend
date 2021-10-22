module.exports = Behavior({
    data: {
        keyword: '',
    },
    methods: {
          // 绑定搜索事件： 光标离开触发：--- 点击叉号取消搜索 ----------------------
        onSearch:function(e){
            this.setData({
            keyword : e.detail.value
            })
        },
        onCancleSearch:function(){
            this.setData({
            keyword : ''
            })
        },
    }
})