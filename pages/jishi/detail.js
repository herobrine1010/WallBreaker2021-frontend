// pages/jishi/detail.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    like:false,
    // title:'破壁者首次文艺汇演来啦！！破壁者首次文艺汇演来啦！！破壁者首次文艺汇演来啦！！',
    // userAvatar:'/static/icon/default-user-big.png',
    // userName:"破壁者1号",
    // time:'2021年6月9日    21:40',
    // description:"为了增进学院同学对本专业就业领域和就业方向的了解，提升就业技巧，获取就业信息，学院于……",
    // pictures:['','','','','','','',''],


    isPersonalInfoShow : false,
    animationData:{},
    signature:'这是一段个性签名',
    identity:'建筑学院 风景园林 2018级 本科生',
    tags: ['细节控','好学小白','996','口才','设计','文字']
  },
  onLoad:function(options){
    if(!options.postingId){
      var postingId=13;
    }else{
      var postingId=options.postingId
    };

    this.setData({postingId:postingId})

    this.changeDetail();
    // this.setUserInfo();
  },


  changeDetail:function(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/posting/getPosting/'+that.data.postingId,
      header:{'cookie':app.globalData.token},
      success:function(res){
        if(res.statusCode==200){
          let postingdata=res.data.data;
          wx.request({
            url: app.globalData.url+'/user/userInfo',
            data:{userId:postingdata.initiatorId},
            success:function(res){
            if(res.statusCode==200){
              let userdata=res.data.data;
              let pictures=(postingdata.allPicUrl?postingdata.allPicUrl.split(','):[])
              that.setData({
                title:postingdata.title,
                userAvatar:userdata.avatarUrl,
                userName:userdata.nickName,
                time:postingdata.create_time,
                description:postingdata.content,
                pictures:pictures,
                like:postingdata.myFavourite
              })
              }
            }
          });
          wx.request({
            url: app.globalData.url+'/user/userInfo',
            data:{
              userId:postingdata.initiatorId
            },
            success:function(res){
              let data=res.data.data;
              let personalInfo={
                'initiator':data.initiator,
                'me':data.me,
                'avatar':data.avatarUrl,
                'id':data.id,
                'nickname':data.nickName,
                'wxId':data.wxId,
                'description':data.description,
                'school':data.school,
                'major':data.major,
                'grade':data.grade,
                'identity':data.identification,

                'wxIdPublic':data.wxIdPublic,
                'schoolPublic':data.schoolPublic,
                'majorPublic':data.majorPublic,
                'gradePublic':data.gradePublic,
                'identityPublic':data.identityPublic,

                'personalLabel':(data.personalLabel?data.personalLabel.map(that.getContent):[]),
                'interestLabel':(data.interestLabel?data.interestLabel.map(that.getContent):[]),
              }
              that.setData({personalInfo})
            }
          })
        }
      }
    })


  },
  // setUserInfo:function(){
    
  // },
  getContent:function(item){
    return item.content
  },


  Like:function(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/userFavouritePosting/addToMyFavouritePosting/'+this.data.postingId,
      method:"POST",
      header:{'cookie':app.globalData.token},
      success:function(res){
        if(res.statusCode==200){
          that.setData({
            like: true
          })
        }
      }
    })
  },
  cancelLike:function(){
    let app=getApp();
    let that=this;
    wx.request({
      url: app.globalData.url+'/userFavouritePosting/RemoveFromMyFavouritePosting/'+this.data.postingId,
      method:"DELETE",
      header:{'cookie':app.globalData.token},
      success:function(res){
        if(res.statusCode==200){
          that.setData({
            like: false
          })
        }
      }
    })
  },
  showPersonDetail:function(e){
    this.selectComponent("#personalAnimation1").showModal();
  },
  // chooseSezi:function(e){
  //   // 用that取代this，防止不必要的情况发生
  //   var that = this;
  //   // 创建一个动画实例
  //   var animation  = wx.createAnimation({
  //     // 动画持续时间
  //       duration:200,
  //       // 定义动画效果，当前是匀速
  //       timingFunction:'ease'
  //     })
  //     // 将该变量赋值给当前动画
  //   that.animation = animation
  //   // 先在y轴偏移，然后用step()完成一个动画
  //   animation.translateY(200).step()
  //   // 用setData改变当前动画
  //   that.setData({
  //     // 通过export()方法导出数据
  //     animationData: animation.export(),
  //     // 改变view里面的Wx：if
  //     isPersonalInfoShow:true
  //   })
  //   // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
  //   setTimeout(function(){
  //     animation.translateY(0).step()
  //     that.setData({
  //       animationData: animation.export()
  //     })
  //   },200)
  // },
  // hideModal:function(e){
  //   var that = this;
  //   var animation = wx.createAnimation({
  //     duration:200,
  //     timingFunction:'linear'
  //   })
  //   that.animation = animation
  //   animation.translateY(200).step()
  //   that.setData({
  //     animationData:animation.export()
      
  //   })
  //   setTimeout(function () {
  //     animation.translateY(0).step()
  //     that.setData({
  //       animationData: animation.export(),
  //       chooseSize: false
  //     })
  //   }, 200) 
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {

  // },

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
    return {
      title : '欢迎注册使用济星云小程序！',
      path : '/pages/welcome/welcome'
    }
  },
})