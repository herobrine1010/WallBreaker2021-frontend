// pages/jiren/groupDetail.js
const { formatTime } = require('../../utils/util.js');
var util = require('../../utils/util.js');
var app=getApp();
var that=this;
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    
    amITeamInitiator:true,
    title:'破壁者首次文艺汇演来啦！！破壁者首次文艺汇演来啦！！破壁者首次文艺汇演来啦！！',
    dialog:{
      isDialogShow: false,
      content:"爬爬爬爬爬爬爬爬啊啊啊啊啊啊啊啊啊啊啊",
      hasInputBox:true,
      tip:"提示：爬",
      cancelText:"取消",
      okText:"确认",
      tapOkEvent:"",
    },
    dialog2:{
      isDialogShow:false,
      title:"title",
      content:"随便写一点",
      pictures:[],
      botton:"返回"
    },
    teamDetail:{
      // title:'周末狼人杀大家来玩啊我只是为了凑够二十五个字好够了',
      // // title:'周末狼人杀',
      // isTeamClosed: false,
      // avatar:'https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02',
      // nickname: '龙龙',
      // fromTime: '1天前',
      // dueTime: '2天后结束',
      // content: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n我不知道怎么找图片就拿头像来凑\n最多四百字\n那最多多少行?',
      // picturesNum:  0,
      // pictures: ['https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02','https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02','https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02','https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02'],
    },
    isFavourite:false,
    avatarList:[],
    currentUser:[],
    detail:{
      'title':'破·数学建模找队友，来来来！',
      'avatar':'https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02',
      'nickname':'小砂糖星',
      'fromTime':'3天前',
      'dueTime':'3天后结束'
    },
    applierList:[
      // {
      //   'id':'001',
      //   'avatar':'https://s3-alpha.figma.com/profile/06efcf65-977c-4154-b8a3-3db3f6a2f79f',
      //   'nickname':'herobrine',
      //   'applyTime':'22分钟前'
      // },
    ],
    haveJoinedIn:false,
    haveSignedUp:false,
    timeIsOver:false,
    memberFull:false,
    maxHeight:"auto",
    result:"",
    // reply:"随便写点啥\n看看边界在哪\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n",
    reply:'',
    haveQuestions:true,
    beClosedInAdvance:false,
    beRefused:false,

    dialogForBeingAccrept:false,
    dialogForBeingCloseInAdvance:false,
    tipBox:{
      show:false,
      text:"随便写点什么"
    },
  
    initiatorScrollHeight:'auto',
    targetId:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // console.log(options)
    if(!options.teamId){
      this.setData({teamId:9})
    }else{
      console.log('updateTeamId');
      this.setData({teamId:options.teamId})
    }
    let app=getApp();
    var that=this;
    // var picList = this.data.teamDetail.pictures.split(',')
    // console.log(picList)
    // console.log(picList.length)
    //拼接 发起人 和 参与者列表
    // {"avatar":"...","me":false,"initiator":false,"id":1}
    this.setData({avatarList:[
      {"initiator":true,"avatar":'https://s3-alpha.figma.com/profile/d6f5f7f8-2382-43db-bcff-8c585b068d02',id:1},
      {"me":true,"avatar":"https://s3-alpha.figma.com/profile/06efcf65-977c-4154-b8a3-3db3f6a2f79f",id:2},
      {"avatar":"https://s3-alpha.figma.com/profile/dda831f2-b8ec-4bb9-b165-1708bad4fb9e",id:3},
      {"avatar":"https://tcs-devops.aliyuncs.com/thumbnail/1125d19274b242f1e0371f5aa532a3b0a998/w/200/h/200"},
      {"avatar":"http://tiebapic.baidu.com/forum/w%3D580%3B/sign=ef2e2225da11728b302d8c2af8c7c2ce/c995d143ad4bd1134dde1a864dafa40f4bfb0576.jpg"},
      {"avatar":"http://tiebapic.baidu.com/forum/w%3D580%3B/sign=fa624952e31ea8d38a22740ca731324e/ac6eddc451da81cbf0437d241766d016082431b6.jpg"},{},{},{},{}
    ]});
    wx.request({
      url: app.globalData.url+'/team/getTeamAndCheckStatus/'+this.data.teamId,
      header:{  'cookie':wx.getStorageSync('token')},
      success:function(res){
        console.log(res);
      }
    })


    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight:res.windowHeight
        })
      }
    });
    this.initializeResult();
    this.changeScrollHeight();

    this.changeTeamDetail();

    // if(this.data.amITeamInitiator){
    //   this.changeSizeOfInitiatorPage();
    // }else{

    // };
    
    
    this.changeInitiatorList();

    // this.seeDetail();
    // console.log(this.data.timeIsOver);
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

// 以下是和 发起者 initiator 有关的操作事件 ---------start---------------------
  handleCloseTeam: function(){
    let dialog = {
      isDialogShow: true,
      content:"请填写结束招募理由，理由将被队内成员看到",
      hasInputBox:true,
      tip:"提示：结束组队招募后，将无法查看队友联系方式",
      cancelText:"取消",
      okText:"确认",
      tapOkEvent:"dialogTapOkForCloseTeam"
    };
    this.setData({
      dialog
    })
  },
  dialogTapOkForCloseTeam:function(e){
    this.setData({
      'teamDetail.isTeamClosed':true
    })
    console.log(e);
  },
  showAnswers:function(){

  },

  changeTeamDetail:function(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/team/getTeam/'+this.data.teamId,
      header:{
        'cookie':wx.getStorageSync('token'),
      },
      success:function(res){
        // console.log(res);
        let teamdata=res.data.data;
        console.log(teamdata);
        let initiatorid=teamdata.initiatorId;
        // console.log(initiatorid);
        wx.request({
          url: app.globalData.url+'/user/userInfo',
          data:{userId:initiatorid},
          header:{
            'cookie':wx.getStorageSync('token'),
          },
          success:function(res){
            // console.log(res)
            let initiatordata=res.data.data;
            if(teamdata.allPicUrl){
              var picList = teamdata.allPicUrl.split(',');
            }else{
              var picList=[];
            }
            // console.log(picList)
            // console.log(picList.length)
            let fromTime=util.getDateDiff(teamdata.createTime);
            let teamDetail={
              title:teamdata.title,
              isTeamClosed: false,
              avatar:initiatordata.avatarUrl,
              nickname:initiatordata.nickName,
              fromTime: fromTime,
              dueTime: '2天后结束',
              content: teamdata.content,
              // content:'1&nbsp; 2',
              picturesNum:  picList.length,
              pictures: picList,
            };    
            that.setData({teamDetail:teamDetail});
            that.changeSizeOfInitiatorPage();
          }
        })
      }
    })
  },


  changeInitiatorList:function(){
    let app=getApp();
    let that=this;
    let list=[];
    wx.request({
      url: app.globalData.url+'/userTeam/getApplierInfoByTeamId/'+this.data.teamId,
      success:function(res){
        let data=res.data.data
        console.log(data);
        for(let i in data){
          // console.log(user);
          // let now=new Date();
          // let createtime=new Date(data[i].createTime);
          // let hour=Math.floor((now-createtime)/1000/60/60);
          // if(hour<24){
          //   var applyTime=hour+'小时前';
          // }else{
          //   var applyTime=Math.floor(hour/24)+'天前';
          // };
          list.push({
            avatar:data[i].avatarUrl,
            nickname:data[i].nickName,
            applyTime:util.getDateDiff(data[i].createTime),
            id:data[i].id,

          })
        };
        that.setData({
          applierList:list,
        })
      }
    })
  },
  acceptApplying: function(e){
    console.log(e.currentTarget.dataset);
    let applyer = e.currentTarget.dataset;
    this.setData({ targetId:applyer.applyerid,});
    let dialog = {
      isDialogShow: true,
      content:'确定同意 ' + applyer.applyername  + ' 加入组队？',
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      tapOkEvent:"dialogTapOkForAcceptApplying"
    };
    this.setData({
      dialog,
    })
  },
  dialogTapOkForAcceptApplying:function(e){
    //  console.log(e);
    let app=getApp();
    let that=this;
    console.log(this.data.targetId);
    wx.request({
      url: app.globalData.url+'/userTeam/approveApplication',
      header:{
        'content-type':'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync('token')
      },
      data:{
        userId:this.data.targetId,
        teamId:this.data.teamId
      },
      method:'POST',
      success:function(){
        let list=that.data.applierList;
        let newList=[];
        for(let i in list){
          if(list[i].id!=that.data.targetId){
            newList.push(list[i]);
          }
        };
        that.setData({
          applierList:newList
        });
        wx.showToast({
          title: '接受id为'+that.data.targetId+'的申请',
        });
      }
    })

    this.setData({
      haveJoinedIn:true
    })
    this.initializeResult();
    // this.changeScrollHeight();
  },
  refuseApplying: function(e){
    let applyer = e.currentTarget.dataset;
    this.setData({ targetId:applyer.applyerid,});
    // console.log(this.data.targetId);
    let dialog = {
      isDialogShow: true,
      content:'确定拒绝 ' + applyer.applyername  + ' 加入组队？',
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      tapOkEvent:"dialogTapOkForRefuseApplying"
    };
    this.setData({
      dialog,
    })
  },
  dialogTapOkForRefuseApplying:function(){
    let app=getApp();
    let that=this;
    console.log(this.data.targetId);
    wx.request({
      url: app.globalData.url+'/userTeam/rejectApplication',
      header:{
        'content-type':'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync('token')
      },
      data:{
        userId:this.data.targetId,
        teamId:this.data.teamId
      },
      method:'POST',
      success:function(){
        let list=that.data.applierList;
        let newList=[];
        for(let i in list){
          if(list[i].id!=that.data.targetId){
            newList.push(list[i]);
          }
        };
        that.setData({
          applierList:newList
        });
        wx.showToast({
          title: '拒绝id为'+that.data.targetId+'的申请',
        });
      }
    });
    this.setData({
      beRefused:true
    });
    this.initializeResult();
    this.changeScrollHeight();
  },


  tapAvatar:function(e){
    this.setData({"currentUser":e.detail});
    console.log(this.data.currentUser);
    this.selectComponent("#personalAnimation").showModal(this.data.currentUser.userAvatar);
    
  },

  seeDetail:function(e){
    console.log("查看全部");
    let teamDetail=this.data.teamDetail;
    let dialog2={
      isDialogShow:true,
      title:teamDetail.title,
      content:teamDetail.content,
      pictures:teamDetail.pictures,
      button:"返回"
    };
    this.setData({
      dialog2:dialog2
    });
    this.selectComponent('#dialog2').changeSize();
    // this.changeScrollHeight2();
    //@李雨龙
  },
  tapFavourite:function(){
    let app=getApp();
    let that=this;
    if(this.data.isFavourite==false){
      wx.request({
        url: app.globalData.url+'/userFavouriteTeam/addToMyFavouriteTeam/'+this.data.teamId,
        header:{
          'cookie':wx.getStorageSync('token')
        },
        method:'POST',
        success:function(){
          wx.showToast({
            title: '已加入收藏',
            icon: 'success',
            duration: 1000
          })
          that.setData({isFavourite:true});
        }
      })
    }else{
      wx.request({
        url: app.globalData.url+'/userFavouriteTeam/RemoveFromMyFavouriteTeam/'+this.data.teamId,
        header:{
          'cookie':wx.getStorageSync('token')
        },
        method:'DELETE',
        success:function(){
          wx.showToast({
            title: '已取消收藏',
            icon: 'success',
            duration: 1000
          })
          that.setData({isFavourite:false});
        }
      })
    }
    // this.onLoad();
  },

  tapOk:function(e){
    console.log("点击确认之后的业务");
    wx.showToast({
      title: '爬了',
      icon: 'none',
      duration: 1000
    })
    wx.navigateTo({
      url: '/pages/jiren/answerQuestion',
    })
  },
  
  acceptAllButton:function(e){
    let dialog = {
      isDialogShow: true,
      content:'确定自动将最早申请的用户填满空位？',
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确定",
      tapOkEvent:"dialogTapOkForAcceptAllApplications"
    };
    this.setData({
      dialog,
    })
  },

  dialogTapOkForAcceptAllApplications(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/userTeam/autoApproveByTeamId/'+this.data.teamId,
      header:{
        'cookie':wx.getStorageSync('token')
      },
      success:function(){
        that.setData({applierList:[]})
      }
    })
  },



  // 以下是和 申请者 applicant 有关的操作事件
  applicantClick:function(e){
    console.log(e);
  },
  initializeResult:function(e){
    let data=this.data;
    if(data.timeIsOver){
      this.setData({
        result:"组队招募已经结束",
        over:true
      })
    }else if(data.memberFull){
      this.setData({
        result:"队伍成员已满",
        over:true,
      })
    }else if(data.beClosedInAdvance){
      this.setData({
        result:"组队招募已经关闭\n发起人关闭的原因如下：",
        reply:"我就想提早结束，乂，我就是玩。",
        over:true
      })
    }else if(data.haveJoinedIn){
      this.setData({
        result:"您已成功入队"
      })
    }else if(data.beRefused){
      this.setData({
        result:"您的申请被拒绝\n发起人拒绝的原因如下：",
        reply:"我就是不要你，乂，我就是玩。",
      })
    }else if(data.haveSignedUp){
      this.setData({
        result:"您已报名该组队，申请正在处理中~"
      })
    }
  },


  changeScrollHeight:function(){
    if(this.data.amITeamInitiator){return;}
    var that = this;
    var windowHeight;
    var height;
    //设置scroll-view高度
    wx.getSystemInfo({
      success: function (res) {
          windowHeight= res.windowHeight;
      }
    });
    let query = wx.createSelectorQuery();
    query.select('#scroll-1').boundingClientRect(rect=>{
        let maxHeight = rect.height;
        if(!that.data.result&&!that.data.reply){  
          if(maxHeight>windowHeight*0.65){
            that.setData({
              maxHeight:"65vh"
            });
          }
        }else if(that.data.result&&!that.data.reply){
          if(maxHeight>windowHeight*0.60)  {
            that.setData({
              maxHeight:"60vh"
            })
          }
        }else if(that.data.result&&that.data.reply){
          if(maxHeight>windowHeight*0.5){
            that.setData({
              maxHeight:"50vh"
            })
          }
        }
      }).exec();
      
  },
  applyButton:function(e){
    var that=this;
    if(!this.data.haveQuestions){
      this.setData({
        result:"您已报名该组队，申请正在处理中~",
        haveSignedUp:true
      });
      wx.showToast({
        title: '申请已提交',
        icon:'success',
        duration:2000
      });
    }else{
      wx.navigateTo({
        url: '/pages/jiren/answerQuestion',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          getResult: function(data) {
            if(data){
              that.setData({
                haveSignedUp:true,
                result:"您已报名该组队，申请正在处理中~"
              });
              //以下这个函数没有发挥作用，解决办法并不容易。等和后端接口接上后问题自然就解决了，也不需要下面这个函数调用了。
              that.changeScrollHeight();
            }
          }
        }
      })
    };
    console.log("over");
  },
  cancelButton: function(e){
    let dialog = {
      isDialogShow: true,
      content:'确定取消申请？',
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      tapOkEvent:"dialogTapOkForCancelApplication"
    };
    this.setData({
      dialog
    })
  },
  dialogTapOkForCancelApplication:function(e){
    this.setData({
      haveSignedUp:false,
      result:'',
    });
    console.log(this);
    this.changeScrollHeight();
  },
  dialogTapOkForCloseTeam:function(){
    this.setData({
      beClosedInAdvance:true,
      dialogForBeingCloseInAdvance:true,
    });
    this.initializeResult();
    this.changeScrollHeight();
  },


  testButton:function(e){
    let tipBox = {
      show:true,
      text:"该组队招募已结束，理由为：\n二十五个字二十五个字二十五个字二十五个字二十五个字"
    };
    this.setData({
      tipBox:tipBox
    })
  },
  tipBoxButton:function(e){
    this.setData({
      tipBox:{show:false}
    })
  },
  changeScrollHeight2(){
    var that=this;
      var windowHeight=this.windowHeight
      
      // console.log(this);
      let query = wx.createSelectorQuery();
      query.select('#scroll').boundingClientRect(rect=>{
        console.log(rect)
          let maxHeight = rect.height;
          if(maxHeight>windowHeight*0.7){
            that.setData({
              maxHeight:"70vh"
            })
          }
        }).exec();
  },
  changeSizeOfInitiatorPage(){
    // var that=this;
    let query = wx.createSelectorQuery();
    query.select('#initiator-scroll').boundingClientRect(rect=>{
      console.log(rect)
        let top = rect.top;
        let height=this.data.windowHeight-top;
        this.setData({
          initiatorScrollHeight:height+'px',
          // initiatorScrollHeight:100+'px',
        });
      }).exec();
  }
})
