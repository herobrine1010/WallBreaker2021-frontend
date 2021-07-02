// components/participant-avatar/participant-avatar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //组件的properties(即page的data)需要指定类型,Number/String/Object
    avatarList:{
      type:Object,
      value:[{title:"题目1", content:"内容1"}, 
      {title:"题目2", content:"内容2"}, 
      {title:"题目3", content:"内容3"}]

    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapAvatar:function(e){
      //绑参数在本事件的标签上用形如"data-xxx"的属性，
      //注意微信的自动转换"data-user-id"->"userId"
      //在子组件绑定的函数中，取值在e.currentTarget.dataset.xxx下取
      //在父组件绑定的函数中，取值在e.detail.xxx下取
      var t=e.currentTarget.dataset;
      //console.log(t);
      //使用triggerEvent传值，第一参数为字串形式的函数名(父组件使用的函数名，推荐与本函数同名),
      //第二参数为需要传递的值，推荐不要在子组件做拆分，直接把dataset传过去在父组件里拆
      this.triggerEvent('tapAvatar',t)
    }

  }
})
