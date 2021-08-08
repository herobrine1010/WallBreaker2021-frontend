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
    
    console.log(options)
    if(!options.teamId){
      this.setData({teamId:67})
    }else{
      console.log('updateTeamId');
      this.setData({teamId:options.teamId})
    }
    let app=getApp();
    var that=this;
    
    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight:res.windowHeight
        })
      }
    });
    // this.initializeResult();

    // this.initializeAvatarList();
    this.changeTeamDetail();
    // this.initializeAvatarList();

    // this.changeScrollHeight();

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

  initializeAvatarList:function(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/userTeam/getAllMemberInfoByTeamId/'+that.data.teamId,
      header:{'cookie':wx.getStorageSync('token')},
      success:function(res){
        if(res.statusCode==200){
          console.log(res);
          let list=[];
          let data=res.data.data;
          console.log(data);
          for(let i=0;i<data.length;i++){
            let info={
              'initiator':data[i].initiator,
              'me':data[i].me,
              'avatar':data[i].avatarUrl,
              'id':data[i].id,
              'nickname':data[i].nickName,
              'wxId':data[i].wxId,
              'description':data[i].description,
              'school':data[i].school,
              'major':data[i].major,
              'grade':data[i].grade,
              'identity':data[i].identification,

              'wxIdPublic':data[i].wxIdPublic,
              'schoolPublic':data[i].schoolPublic,
              'majorPublic':data[i].majorPublic,
              'gradePublic':data[i].gradePublic,
              'identityPublic':data[i].identityPublic,

              'personalLabel':data[i].personalLabel.map(this.getContent),
              'interestLabel':data[i].interestLabel.map(this.getContent),

            }
            list.push(info);
            
          }
          for(let i=0;i<that.data.teamDetail.due_member-data.length;i++){
            list.push({});
          }
          that.setData({avatarList:list});
          console.log(that.data.avatarList)
        }
      }
    })

  },

  getContent:function(item){
    return item.content
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
  showTipBox:function(message){
    let tipBox = {
      show:true,
      text:message
    };
    this.setData({
      tipBox:tipBox
    })
  },

  
  changeTeamDetail:function(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/team/getTeamAndCheckStatus/'+this.data.teamId,
      header:{
        'cookie':wx.getStorageSync('token'),
      },
      success:function(res){
        if(res.statusCode!=200){return}
        let teamdata=res.data.data;
        console.log(teamdata);
        that.setData({
          amITeamInitiator:teamdata.initializedByMe,
          isFavourite:teamdata.myFavourite
        })
        let initiatorid=teamdata.initiatorId;
        wx.request({
          url: app.globalData.url+'/user/userInfo',
          data:{userId:initiatorid},
          header:{
            'cookie':wx.getStorageSync('token'),
          },
          success:function(res){
            // console.log(res)
            let initiatordata=res.data.data;
            var picList=(teamdata.allPicUrl?teamdata.allPicUrl.split(','):[]);
            let fromTime=util.getDateDiff(teamdata.createTime);
            let teamDetail={
              title:teamdata.title,
              isTeamClosed: (teamdata.status>2?true:false),
              avatar:initiatordata.avatarUrl,
              nickname:initiatordata.nickName,
              fromTime: fromTime,
              dueTime: '2天后结束',
              content: teamdata.content,
              picturesNum:  picList.length,
              pictures: picList,
              due_member:teamdata.dueMember,
              question:teamdata.question,
              reason:teamdata.reason
            };    
            that.setData({teamDetail:teamDetail});
            
            that.initializeAvatarList();

            if(that.data.amITeamInitiator){
              if(teamdata.status==4){
                that.showTipBox('组队招募已结束')
              }
              that.changeSizeOfInitiatorPage();
            }else{
              if(teamdata.status==2){
                that.setData({memberFull:true})
              }
              switch(teamdata.applyStatus){
                case 0:
                  that.setData({haveSignedUp:true})
                  break
                case 1:
                  that.setData({haveJoinedIn:true});
                  that.showTipBox('恭喜您已成功入队~可点击发起人头像查看联系方式，快去与ta联系吧！')
                  wx.request({
                    url:app.globalData.url+ '/userTeam/checkApproved',
                    method:"POST",
                    data:{teamId:that.data.teamId}
                  })
                  break;
                case 2:
                  that.setData({haveJoinedIn:true});
                  break;
                case 3:
                  that.setData({beRefused:true});
                  that.showTipBox('很遗憾，本次申请未能通过，但请不要灰心，下一次可能就会组队成功~');
                  wx.request({
                    url:app.globalData.url+ 'userTeam/checkRejected',
                    method:"POST",
                    data:{teamId:that.data.teamId}
                  });
                  break;
                case 4:
                  that.setData({beRefused:true});
                  break;
                case 5:
                  if(teamdata.reaon){
                    that.setData({beClosedInAdvance:true})
                    that.showTipBox('该组队招募已结束，理由为：\n'+teamdata.reason)
                  }else{
                    that.setData({timeIsOver:true})
                    that.showTipBox('该组队招募已截止')
                  }
                  break;
                case 6:
                  if(teamdata.reaon){
                    that.setData({beClosedInAdvance:true})
                  }else{
                    that.setData({timeIsOver:true})
                  }
                  break;
    
              }
              that.initializeResult();
              // that.changeScrollHeight();
            }
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
          list.push({
            applyTime:util.getDateDiff(data[i].createTime),
            'initiator':data[i].initiator,
            'me':data[i].me,
            'avatar':data[i].avatarUrl,
            'id':data[i].id,
            'nickname':data[i].nickName,
            'wxId':data[i].wxId,
            'description':data[i].description,
            'school':data[i].school,
            'major':data[i].major,
            'grade':data[i].grade,
            'identity':data[i].identification,

            'wxIdPublic':data[i].wxIdPublic,
            'schoolPublic':data[i].schoolPublic,
            'majorPublic':data[i].majorPublic,
            'gradePublic':data[i].gradePublic,
            'identityPublic':data[i].identityPublic,

            'personalLabel':data[i].personalLabel.map(this.getContent),
            'interestLabel':data[i].interestLabel.map(this.getContent),


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
        that.initializeAvatarList();
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
    switch(e.dataset.container){
      case 'avatar-list':
        this.setData({personalInfo:this.data.avatarList[e.dataset.index]});
        break;
      case 'initiator':
        this.setData({personalInfo:this.data.avatarList[0]});
        break;
      case 'applierList':
        this.setData({personalInfo:this.data.applierList[e.dataset.index]});
        break;    
    }

    console.log(e);
    // this.setData({"currentUser":e.detail});
    // console.log(this.data.currentUser);
    this.selectComponent("#personalAnimation").showModal(this.data.currentUser.userAvatar);
    // this.selectComponent("#personalAnimation").showModal();
    
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
        that.setData({applierList:[]});
        that.initializeAvatarList();
      }
    })
  },



  // 以下是和 申请者 applicant 有关的操作事件
  applicantInitialize:function(){

  },



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
        reply:this.data.teamDetail.reason,
        over:true
      })
    }else if(data.haveJoinedIn){
      this.setData({
        result:"您已成功入队"
      })
    }else if(data.beRefused){
      this.setData({
        result:'您的申请被拒绝'
      })
    }else if(data.haveSignedUp){
      this.setData({
        result:"您已报名该组队，申请正在处理中~"
      })
    }
    console.log(this);
    this.changeScrollHeight();
  },


  changeScrollHeight:function(){
    if(this.data.amITeamInitiator){return;}
    console.log('work')
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
        console.log(maxHeight)
        console.log(windowHeight)
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
    if(!this.data.teamDetail.question){
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
      tip:"取消申请后无法再次申请",
      cancelText:"取消",
      okText:"确认",
      tapOkEvent:"dialogTapOkForCancelApplication"
    };
    this.setData({
      dialog
    })
  },
  dialogTapOkForCancelApplication:function(e){
    wx.request({
      url: app.globalData.url+'/userTeam/cancelApply',
      header:{'cookie':wx.getStorageSync('token')},
      success:function(res){
        this.setData({
          // haveSignedUp:false,
          beRefused:true,
          result:'已取消申请',
        });
        this.changeScrollHeight();
      }
    })

    
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
