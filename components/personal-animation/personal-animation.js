// components/personal-animation/personal-animation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPersonalInfoShow:{
      type:Boolean,
      value:true
    },
    animationData:{
      type:Object,
      value:{}
    },
    personalInfo:{
      type:Object,
      value:{
        "avatar":"https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02",
        "nickname":"小砂糖星!",
        "wxId":"abcdefg123456789",
        "description":"START:DASH!",
        "school":"建筑学院",
        "major":"风景园林",
        "grade":"2018级",
        "identity":"本科生",

        "wxIdPublic":true,
        "schoolPublic":true,
        "majorPublic":true,
        "gradePublic":true,
        "identityPublic":true,

        "personalLabel":['细节控','好学小白','996'],
        "interestLabel":['口才','设计','文字']
      }
    },
    isCheckAnswerButtonShow:{
      type:Boolean,
      value:true
    },
   
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
    showModal:function(test){
      this.setData({"personalInfo.avatar":test})
      // 用that取代this，防止不必要的情况发生
      var that = this;
      // 创建一个动画实例
      var animation  = wx.createAnimation({
        // 动画持续时间
          duration:200,
          // 定义动画效果，当前是匀速
          timingFunction:'ease'
        })
        // 将该变量赋值给当前动画
      that.animation = animation
      // 先在y轴偏移，然后用step()完成一个动画
      animation.translateY(200).step()
      // 用setData改变当前动画
      that.setData({
        // 通过export()方法导出数据
        animationData: animation.export(),
        // 改变view里面的Wx：if
        isPersonalInfoShow:true
      })
      // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
      setTimeout(function(){
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export()
        })
      },200)
    },
    hideModal:function(e){
      var that = this;
      var animation = wx.createAnimation({
        duration:500,
        timingFunction:'ease'
      })
      that.animation = animation
      animation.translateY(500).step()
      that.setData({
        animationData:animation.export()
        
      })
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export(),
          isPersonalInfoShow: false
        })
      }, 500)
    },
  }
})
