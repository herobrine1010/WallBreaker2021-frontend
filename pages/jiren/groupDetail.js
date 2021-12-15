// pages/jiren/groupDetail.js
const { formatTime } = require('../../utils/util.js');
var util = require('../../utils/util.js');
import {request} from "../../request/request.js"
var app=getApp();
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
    applierList:[
      
    ],


    haveJoinedIn:false,
    haveSignedUp:false,
    timeIsOver:false,
    memberFull:false,
    result:"",
    // reply:"随便写点啥\n看看边界在哪\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n",
    reply:'',
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
    personalInfoList:{},
    // over:true,
    isPopNoticeShow : false
  },

  // 生命周期函数： ------- ----------- -------- ：
  onLoad: function (options) {
    if(options.teamId){
      this.setData({teamId:options.teamId})
    }
    var that=this;
    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight:res.windowHeight
        })
      }
    });


    let query = this.getTeamDetail(that.data.teamId);
    query.then(result=>{
      // 先处理组队数据，再发请求入队成员列表


      that.setData({
        teamDetail: result,
      })
      that.checkStatus(result);

      return that.getTeamMemberList(that.data.teamId, that.data.amITeamInitiator, result.dueMember, that.data.applyStatus);
    })
    .then(teamMemberList => {
    // 先处理头像数据，再判断是否为发起者，再发请求获取申请者数据 
      that.setData({
        teamMemberList : teamMemberList
      })
      if(that.data.amITeamInitiator){
        return that.getApplierList(that.data.teamId)
        .then(applierList => {
          that.setData({
            applierList
          })
        })
      }
    }).catch(err=>{
      console.log(err);
    });




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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title : '欢迎注册使用济星云小程序！',
      path : '/pages/welcome/welcome'
    }
  },

  // ----- -------- 页面加载相关函数 ------ 如（组队内容、成员列表、申请人列表） ---- -------- -------- --------
  // (1.1). 组队的内容：（包含发起人的数据）
  getTeamDetail(teamId){
    let that=this;
    return request({
      url: '/team/getTeamAndCheckStatus/'+teamId,
      header:{
         
      }
    })
    .then(res=>{
      if(res.statusCode>=200&&res.statusCode<300){
        let teamdata=res.data.data;
          let {
            applyStatus, title, content, allPicUrl, dueTime, createTime, dueMember, initializedByMe, initiatorId, myFavourite, status, question, reason,applyClosed,applyNotice,notice
          }=teamdata;
          let picList = allPicUrl?allPicUrl.split(','):[];
          let fromTime=util.getDateDiff(teamdata.createTime);
          dueTime=util.getDateDiff(teamdata.dueTime) + '截止';
          let questionList = [];
          if(typeof question == 'string' && question!='{}'){
            question=JSON.parse(question);
            for(let key in question){
              questionList.push(question[key])
            }
          }
          let temp={
            applyStatus,
            status,
            title,
            initiatorId,
            'isTeamClosed': status>2?true:false,
            fromTime,
            dueTime,
            content,
            picturesNum:  picList.length,
            pictures: picList,
            dueMember,
            question:questionList,
            reason,
            applyClosed,
            applyNotice,
            notice
          };
          let result = '';
          if(status >= 3){ //如果组队已关闭
            if(reason){
              result = '组队招募已经关闭\n发起人结束招募的原因如下：'
            }else{
              result = '组队招募已经关闭'
            }
          }else if(applyStatus == 0){
            result = '你已经报名该组队，申请正在处理中~'
          }
          that.setData({
            amITeamInitiator:initializedByMe,
            isFavourite:myFavourite,
            applyStatus,
            status,
            reason,
            result,
            applyClosed,
            applyNotice,
            notice
          })
          return temp;
      }else{
        wx.showToast({
          title: '网络错误，请重试',
        })
        return new Error('网络错误（！200~300）');
      }
    })
    .then(temp => {
      return request({
        url: '/user/userInfo',
        data:{userId:temp.initiatorId},
        header:{
           
        }
      })
      .then(res =>{
        let {
          nickName, avatarUrl, description, grade, gradePublic, identification, identificationPublic, major, majorPublic, school, schoolPublic, wxId, wxIdPublic, interestLabel, personalLabel
        } = res.data.data;
        if(interestLabel){
          interestLabel = interestLabel.map(v=>{
            return v.content
          })
        }
        if(personalLabel){
          personalLabel = personalLabel.map(v=>{
            return v.content
          })
        }
        let teamDetail = {
          'avatar':avatarUrl,
          'nickName':nickName,
          description,
          'grade':gradePublic?grade:'',
          gradePublic,
          'identification':identificationPublic?identification:'',
          identificationPublic,
          'major':majorPublic?major:'',
          majorPublic,
          'school':schoolPublic?school:'',
          schoolPublic,
          wxId,
          wxIdPublic,
          interestLabel,
          personalLabel,
          ...temp
        };
        return teamDetail;
      })
    })
    .catch(err=>{
      console.log(err);
    })
  },
  // (1.2) 对组队返回的状态数据进行处理：
  checkStatus(teamData){
    let that = this;
    let{
      reason,
      status,
      applyStatus,
      applyClosed,
      applyNotice,
      notice
    }=teamData;
    let amITeamInitiator = that.data.amITeamInitiator;
    //  ----- --------- -入队显示提示气泡：--- strat ------
    if(applyStatus == 1 ||amITeamInitiator){
      that.setData({
        isPopNoticeShow : true
      });
      // ------ --------- 提示点击头像气泡, 2.3s后消失
      setTimeout( _ => {
        that.setData({
          isPopNoticeShow : false
        })
      },3000)
    }
    // ------ ------- -入队显示提示气泡 -- -end-  -- -----


    if(that.data.amITeamInitiator){
      if(notice){
        if(status==3||status==4){ //超过截止日期
          that.showTipBox('组队招募已结束') 
        }
        //如果有新申请待处理且有红点提醒
        //产品：暂时不做弹窗逻辑
        // else if(status==1){
        //   that.showTipBox('有新的申请')
        // }
      }
      
    }else{
      if(applyNotice){ //如果有消息
        //先发阅读消息的请求
        wx.request({
          url:app.globalData.url+ '/userTeam/applicantCheckNotice',
          method:"POST",
          data:{teamId:that.data.teamId},
          header:{cookie:app.globalData.token}
        })
        //再弹窗提示对应消息
        if(applyClosed){ //优先处理close
          if(!reason=='该组队招募已截止'){
            that.showTipBox('该组队招募已结束，理由为：\n'+reason)
          }else{
            that.showTipBox('该组队招募已截止')
          }
        }else{
          if(applyStatus==1){
            that.showTipBox('恭喜您已成功入队~可点击发起人头像查看联系方式，快去与ta联系吧！')
          }
          else if(applyStatus==2){
            that.showTipBox('很遗憾，本次申请未能通过，但请不要灰心，下一次可能就会组队成功~');
          }
        }
      }
    }
    // that.initializeResult();
    
  },

  // (2). 成员列表(需要组队内容请求来的dueMember数据)
  getTeamMemberList(teamId,amITeamInitiator,dueMember, applyStatus){
    let self = this;
    return request({
      url: '/userTeam/getAllMemberInfoByTeamId/'+teamId,
      header:{ }
    })
    .then(res=>{
      if(res.statusCode>=200&&res.statusCode<300){

        let list=[];
        let data=res.data.data;
        for (let teamMember of data){
          let {
            initiator, me, id,  answer, nickName, avatarUrl, description, grade, gradePublic, identification, identificationPublic, major, majorPublic, school, schoolPublic, wxId, wxIdPublic, interestLabel, personalLabel
          } = teamMember;
          if(interestLabel){
            interestLabel = interestLabel.map(v=>{
              return v.content
            })
          }
          if(personalLabel){
            personalLabel = personalLabel.map(v=>{
              return v.content
            })
          }
          if(!amITeamInitiator){
            if(applyStatus == 1 || applyStatus == 2){ //申请者被同意入队，能看发起者信息
              if(!initiator && !me){
                wxId = '';
                wxIdPublic = false;
              }
            }else{// 尚未入队
              wxId = '';
              wxIdPublic = false;
            }
          }
          let temp = {
            id,
            initiator,
            me,
            'avatar':avatarUrl,
            'nickName':nickName,
            description,
            'grade':(gradePublic && grade)?grade:'保密',
            gradePublic,
            'identification':(identificationPublic && identification)?identification:'保密',
            identificationPublic,
            'major':(majorPublic && major)?major:'保密',
            majorPublic,
            'school':(schoolPublic && school)?school:'保密',
            schoolPublic,
            wxId,
            wxIdPublic,
            interestLabel,
            personalLabel
          };
          if(amITeamInitiator){
            // 排除：1 answer = null;2. answer ={}（空对象）
            if(answer && (typeof answer == 'string') && answer!="{}"){
              answer=JSON.parse(answer)
              let values = Object.values(answer);
              temp.answer = values;
              temp.isCheckAnswerButtonShow=true;
            }
              temp.wxIdPublic=true; 
              temp.wxId = wxId;               
          }
          list.push(temp);
        };
        for(let i=0;i<dueMember - data.length+1;i++){
          list.push({});
        };
        return Promise.resolve(list);
      }else{
        wx.showToast({
          title: '请求网络错误，请重试',
        })
        throw new Error('请求网络错误，请重试')
      }
    })
  },

  // (3). 申请者列表（只有initiator可以发出这个请求）
  getApplierList(teamId){
    let that = this;
    return request({
      url:'/userTeam/getApplierInfoByTeamId/'+teamId,
    })
    .then(res=>{
      let data=res.data.data
      if(data.length == 0){
        return Promise.resolve([]);
      }else{
        let list=[];
        for(let applier of data){
          let {
            id, answer, nickName, avatarUrl, description, grade, gradePublic, identification, identificationPublic, major, majorPublic, school, schoolPublic, wxId, wxIdPublic, interestLabel, personalLabel, createTime
          } = applier;
          if(interestLabel){
            interestLabel = interestLabel.map(v=>{
              return v.content
            })
          };
          if(personalLabel){
            personalLabel = personalLabel.map(v=>{
              return v.content
            })
          };
          let isCheckAnswerButtonShow = false;
          if( typeof answer == 'string' && answer!='{}'){
            let answerList=[];
              answer=JSON.parse(answer)
              for(let key in answer){
                answerList.push(answer[key]);
              };
              answer = answerList;
              isCheckAnswerButtonShow = true;
          };
          let temp = {
            id,
            answer,
            isCheckAnswerButtonShow,
            'applyTime':util.getDateDiff(createTime),
            'avatar':avatarUrl,
            'nickName':nickName,
            description,
            'grade':gradePublic?grade:'',
            gradePublic,
            'identification':identificationPublic?identification:'',
            identificationPublic,
            'major':majorPublic?major:'',
            majorPublic,
            'school':schoolPublic?school:'',
            schoolPublic,
            'wxId':wxIdPublic?wxId:'',
            wxIdPublic,
            interestLabel,
            personalLabel
          };
          list.push(temp);
        }
        return list;
      }
    })
  },


// 以下是和 点击头像 展示个人资料卡片 有关的操作 ---------- --------------- -----
// 认为发起者是第0个，已入队成员可以查看其wxId
tapAvatar(e){
  const that = this;
  let index=e.currentTarget.dataset.index;
  let avatar = that.data.teamMemberList[index];
  if(!avatar.description){
    avatar.description = '这位同济er暂时没有话想说～';
  }
  let applyStatus = that.data.teamDetail.applyStatus;
  if(index == 0 && (applyStatus==1||applyStatus==2)){
    avatar.wxIdPublic = true;
  };
  that.setData({
    isPersonalInfoShow:true,
    avatar
  })
},
tapInitiatorAvatar(){
  const that = this;
  let teamDetail = that.data.teamDetail;
  let applyStatus = teamDetail.applyStatus;
  if(applyStatus==1||applyStatus==2){
    teamDetail.wxIdPublic = true;
  }else{
    teamDetail.wxIdPublic = false;
    teamDetail.wxId = '';
  }
  that.setData({
    isPersonalInfoShow:true,
    avatar:teamDetail
  })
},
tapApplierAvatar(e){
  const that = this;
  let index=e.currentTarget.dataset.index;
  let avatar = this.data.applierList[index];
  that.setData({
    isPersonalInfoShow:true,
    avatar
  })
},
//   复制资料卡片的wxid:
copyWxId(){
  let wxId = this.data.avatar.wxId;
  wx.setClipboardData({
    data: wxId,
  })
},

// 以下是和 发起者 initiator 有关的操作事件 ---------start---------------------
  handleCloseTeam: function(){
    let dialog = {
      isDialogShow: true,
      content:"请填写结束招募理由，\n理由将被队内成员看到",
      hasInputBox:true,
      tip:"提示：结束组队招募后，\n将无法查看队友联系方式",
      cancelText:"取消",
      okText:"确认",
      tapOkEvent:"dialogTapOkForCloseTeam"
    };
    this.setData({
      dialog
    });
  },
  dialogTapOkForCloseTeam:function(e){
    let that=this;
    let reason=this.selectComponent("#dialogBox").data.reason;
    if(!reason){
      let dialog=this.data.dialog;
      dialog.tip="请输入原因！\n ";
      this.setData({dialog:dialog});
      return true
    }else{
      let teamId = that.data.teamId;
      request({
        url: '/team/terminateTeam',
        method:'GET',
        data:{
          teamId:teamId,
          reason:reason
        },
        header:{
          'content-type': 'application/x-www-form-urlencoded',
           
        },
      }).then(res=>{
        if(res.statusCode>=200&&res.statusCode<300){
          wx.showToast({
            title: '组队招募已结束！',
            icon:'success'
          })

          that.onLoad({"teamId":teamId});
          
          //return that.getTeamDetail(teamId);
        }
      }).then(result => {
        that.setData({
          teamDetail: result,
        })
      })

    }
  },

  showAnswers:function(e){// wxml页面上还存在点问题，待更改！！！！！！！！！！！！！！！！！！
    let that = this;
    let index=e.currentTarget.dataset.index;
    let applier = that.data.applierList[index]
    let answer = {
      answerList : that.data.applierList[index].answer,
      questionList : that.data.teamDetail.question,
      nickName : applier.nickName,
      avatar : applier.avatar
    }
    this.setData({
      answer,
      isAnswerShow: true
    });

  },
  detailHide(){
    this.setData({
      answer : null,
      isAnswerShow: false
    });
  },
  // 在弹出的资料卡中点击查看回答
  showAnswersInPersonalAnimation:function(e){// wxml页面上还存在点问题，待更改！！！！！！！！！！！！！！！！！！
    let that = this;
    let avatar=e.currentTarget.dataset.avatar ;
    let answer = {
      answerList : avatar.answer,
      questionList : that.data.teamDetail.question,
      nickName : avatar.nickName,
      avatar : avatar.avatar
    }
    that.setData({
      answer,
      isAnswerShow: true,
      // isPersonalInfoShow:false
    });

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
  
  acceptApplying: function(e){
    let applyer = e.currentTarget.dataset;
    this.setData({ 
      targetId:applyer.applyerId,
      targetName:applyer.applyerName,
    });
    let dialog = {
      isDialogShow: true,
      content:'确定同意 ' + applyer.applyerName + ' 加入组队？',
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
  dialogTapOkForAcceptApplying:function(){
    let app=getApp();
    let that=this;
    request({
      url: '/userTeam/approveApplication',
      header:{
        'content-type':'application/json',
         
      },
      data:{
        userId:this.data.targetId,
        teamId:this.data.teamId
      },
      method:'POST'
    }).then(res => {
      that.showTipBox(that.data.targetName+'已成功入队！可点击头像查看微信号，快去与ta联系吧！');

      // 重新请求获取 成员列表、申请者列表数据
      let getTeamMemberList = that.getTeamMemberList(that.data.teamId, that.data.amITeamInitiator, that.data.teamDetail.dueMember);
      let getApplierList = that.getApplierList(that.data.teamId);
      return Promise.all([getTeamMemberList,getApplierList])
    }).then(res => {
      that.setData({
        teamMemberList : res[0],
        applierList : res[1],
        haveJoinedIn:true
      })
    }).catch( err=>{
      console.log(err);
    })

    // this.initializeResult();
  },

  refuseApplying: function(e){
    let applyer = e.currentTarget.dataset;
    this.setData({ 
      targetId:applyer.applyerId,
      targetName : applyer.applyerName
    });
    let dialog = {
      isDialogShow: true,
      content:'确定拒绝 ' + applyer.applyerName  + ' 加入组队？',
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
  dialogTapOkForRefuseApplying:function(){//待解决 ： initializeResult 和 changeScrollHeight 作用
    let app=getApp();
    let that=this;
    request({
      url: '/userTeam/rejectApplication',
      header:{
        'content-type':'application/json',
         
      },
      data:{
        userId:that.data.targetId,
        teamId:that.data.teamId
      },
      method:'POST',
    }).then(res => {
      wx.showToast({
        title: '已拒绝'+that.data.targetName+'的申请',
        icon: 'success'
      });

      // 请求 申请者列表的数据
      return that.getApplierList(that.data.teamId);
    }).then(res=>{
      that.setData({
        applierList : res,
        beRefused:true
      });
      // that.initializeResult();
      // that.changeScrollHeight();
    }).catch(err=>{
      console.log(err);
    })
  },

  seeDetail:function(e){//样式 待调整
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
    request({
      url: '/userTeam/autoApproveByTeamId/'+this.data.teamId,
      header:{
         
      },
    }).then(res=>{
      // 重新请求获取 成员列表、申请者列表数据
      let getTeamMemberList = that.getTeamMemberList(that.data.teamId, that.data. amITeamInitiator, that.data.teamDetail.dueMember);
      let getApplierList = that.getApplierList(that.data.teamId);
      return Promise.all([getTeamMemberList,getApplierList]);
    }).then(res => {
      that.showTipBox('入队申请已全部接受，可点击头像查看微信号，快去与ta联系吧！');
      that.setData({
        teamMemberList : res[0],
        applierList : res[1],
        haveJoinedIn:true
      })
    }).catch( err=>{
      console.log(err);
    });
  },

  //------- ------ ------- 以下是和 申请者 applicant 有关的操作事件 -------- --------- ---
  tapFavourite:function(){
    let app=getApp();
    let that=this;
    if(this.data.isFavourite==false){
      wx.request({
        url: app.globalData.url+'/userFavouriteTeam/addToMyFavouriteTeam/'+this.data.teamId,
        header:{
          'cookie':app.globalData.token
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
          'cookie':app.globalData.token
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


// 下方申请按钮  /   最上头像列表的加号
  applyButton:function(e){
    let that=this;
    let {
      notice,
      applyStatus,
      applyNotice,
      applyClosed,
    } = that.data.teamDetail;
    let status = that.data.status;
    if(status>=3){
      wx.showToast({
        title: '组队已关闭',
        icon : 'error'
      })
    }else if(that.data.amITeamInitiator){
      wx.showToast({
        title: '你已经在队伍中了',
        icon : 'error'
      })
    }else if(status == 2){
      wx.showToast({
        title: '组队成员已满',
        icon : 'error'
      })
    }else if(applyStatus == 0){
      wx.showToast({
        title: '你已经申请过了',
        icon : 'error'
      })
    }else if(applyStatus == 1){
      wx.showToast({
        title: '你已经在队伍中了',
        icon : 'error'
      })
    }
    
    else if(applyStatus == 2){
      wx.showToast({
        title: '你的申请已被拒绝，去看看别的组队吧~',
        icon : 'error'
      })
    }

    else if(applyClosed){
      wx.showToast({
        title: '队伍已关闭',
        icon : 'error'
      })
    } else {
      if(this.data.teamDetail.question.length==0){
        request({
          url:'/userTeam/apply',
          method:"POST",
          header:{ },
          data:{
            teamId:that.data.teamId,
          },
        }).then(res => {
          if(res.statusCode>=200&&res.statusCode<300 && res.data.success){
            wx.showToast({
              title: '申请已提交',
              icon:'success',
              duration:2000
            });
            return that.getTeamDetail(that.data.teamId);
          }else if(res.data.msg == "noWxId"){
            let dialog = {
              hasInputBox:false,
              content:"请完善微信号~",
              tip:"填写微信号可以更好地使用组队功能，保证微信号只有队伍成员可见！",
              cancelText:"返回",
              okText:"去填写",
              tapOkEvent:"tapOkForAddWxId",
              tapCancelEvent:"tapCancelForAddWxId",
              isDialogShow:true,
            }
            that.setData({
              dialog
            });
          }else{
            wx.showToast({
              title: '网络异常，请重试 :(',
              icon: 'none',
              duration: 1000
            });
          }
        }).then(result => {
          if(result){
            that.setData({
              teamDetail: result,
              timeIsOver:(result.status>2?true:false)
            })
            that.checkStatus(result);
          }
        }).catch(err => {
          console.log(err);
        })
      }else{
        wx.navigateTo({
          url: '/pages/jiren/answerQuestion?teamId='+that.data.teamId,
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            getResult: function(data) {
              if(data){
                that.setData({
                  haveSignedUp:true,
                  result:"您已报名该组队，申请正在处理中~"
                });
                //以下这个函数没有发挥作用，解决办法并不容易。等和后端接口接上后问题自然就解决了，也不需要下面这个函数调用了。
                // that.changeScrollHeight();
              }
              that.getTeamDetail(that.data.teamId)
              .then(result=>{
                that.setData({
                  teamDetail: result,
                  timeIsOver:(result.status>2?true:false)
                })
                that.checkStatus(result);
              }).catch(err => {
                console.log(err);
              })
              
            }
          }
        })
      };
    }
    
  },
  // 完善微信号的两个事件
  tapOkForAddWxId(){
    wx.navigateTo({
      url: '../personal/personalDetails?source=needWxId',
    })
  },
  tapCancelForAddWxId(){
    this.setData({
      isDialogShow:false
    })
  },

// 取消申请事件
  cancelButton: function(e){
    let dialog = {
      isDialogShow: true,
      content:'确定取消申请？',
      hasInputBox:false,
      cancelText:"取消",
      okText:"确认",
      tapOkEvent:"dialogTapOkForCancelApplication"
    };
    this.setData({
      dialog
    })
  },
  dialogTapOkForCancelApplication:function(e){
    let that=this;
    request({
      url:'/userTeam/cancelApply',
      data:{
        teamId:that.data.teamId
      },
      method:'POST',
      header:{ },
    }).then(res => {
      if(res.statusCode>=200&&res.statusCode<300){
        return that.getTeamDetail(that.data.teamId);
      }else{
        throw new Error('网络故障，请重试')
      }
    }).then(result=>{
      that.setData({
        teamDetail: result,
        timeIsOver:(result.status>2?true:false)
      })
      that.checkStatus(result);
    }).catch(err => {
      console.log(err);
    }) 
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
    
    let query = wx.createSelectorQuery();
    query.select('#scroll').boundingClientRect(rect=>{
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
        let top = rect.top;
        let height=this.data.windowHeight-top;
        this.setData({
          initiatorScrollHeight:height+'px',
          // initiatorScrollHeight:100+'px',
        });
      }).exec();
  },
  // 点击图片 图片放大预览事件
  zoomInDetailPicture:function(e){
    var imgUrl = this.data.teamDetail.pictures;
    wx.previewImage({
      urls: imgUrl,//注意这个urls,如果原来是数组就直接用,如果原来就一张图需要加中括号强制把他变成数组
      current: e.currentTarget.dataset.picUrl||e.detail.picUrl,//不写值的话默认是上面那个数组的第一个元素,只有写了点击对应图片才能点哪张放大哪张   
      // ||后面是发起者视角的自定义组件，传来的picUrl
    })
  }

})
