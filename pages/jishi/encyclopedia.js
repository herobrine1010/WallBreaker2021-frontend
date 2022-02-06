// pages/jishi/communication.js
import { request } from "../../request/request.js";
import util from "../../utils/util.js";
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:0,
    sectionName:'question_answer_section',
    // sectionName:'communication_section',
    url_suffix_list:['QuestionAnswer','Communication'],
    tabHeight:36,
    baseQuestionAnswerScrollViewHeight:0,
    question_answer_scroll_view_height:'auto',
    question_answer_section:{
      current:1,
      pages:1,
      pageSize:15,
      keyword:'',
      loadingTimeout:2000,
      dataList:[],
      showGoTopButton:false,
      refresherEnabled:true,
      scrollViewHeight:'auto',
      isEnd:false,
    },
    communication_section:{
      filterOpen:false,
      current:1,
      pages:1,
      pageSize:10,
      keyword:'',
      loadingTimeout:2000,
      dataList:[],
      zoneIdList:[56,57,58,59,60,61],
      zoneNameList:['四平','嘉定','彰武','铁岭','沪西','沪北'],
      zoneColorList:['#3A3042','#7C3ECC','#957D95','#3E92CC','#17B2E5','#BA75FF'],
      // zoneNameList:['四平校区','嘉定校区','彰武校区','铁岭校区','沪西校区','沪北'],
      zoneIndex:null,
      onFilter:false,
      refresherEnabled:true,
      scrollViewHeight:'auto',
      isEnd:false,
    },
    feedback:{
      modalShow:false,
      content:'',
      type:null,
      content:'',
      tip:'',
    },

    topNum:0,
    loading:false,
    submitFeedbackLock:false,
    outerScrollViewHeight:'auto',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initOuterScrollViewHeight();
    this.initQuestionAnswerScrollViewHeight();
    this.getTabHeight();
    this.getData(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title : '欢迎注册使用济星云小程序！',
      path:app.getSharedUrl()
    }
  },
  initOuterScrollViewHeight:function(){
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight:res.windowHeight
        })
      }
    });
    console.log(this.data.windowHeight)
    let query = wx.createSelectorQuery();
    query.select('#outer-scroll-view').boundingClientRect(rect=>{
        let top = rect.top;
        let height=this.data.windowHeight-top;
        this.setData({
          outerScrollViewHeight:height+'px',
        });
      }).exec();
  },
  initQuestionAnswerScrollViewHeight:function(){
    let query = wx.createSelectorQuery();
    query.select('#question-answer-scroll-view').boundingClientRect(rect=>{
        let top = rect.top;
        let height=this.data.windowHeight-top;
        this.setData({
          baseQuestionAnswerScrollViewHeight:height,
        });
      }).exec();
  },
  getTabHeight:function(){
    let query = wx.createSelectorQuery();
    query.select('#tab').boundingClientRect(rect=>{
      console.log(rect);
      console.log('tabTop'+rect.top)
        let height=rect.height;
        // let top = rect.top;
        // let height=this.data.windowHeight-top;
        this.setData({
          tabTop:rect.top,
          tabHeight:height,
        });
      }).exec();
  },
  updateTabBottom:function(){
    
  },
  changeScrollViewHeight:function(){

  },

  onRefresherRefresh(){
    this.getData(true);
  },
  onScrollToLower(){
    this.getData();
  },
  onOuterScroll:function(e){
    // this.setData({[this.data.sectionName+'.topNum']:e.detail.scrollTop})
    // console.log(this.data[this.data.sectionName].topNum)
    let enabled=this.data.sectionName+'.refresherEnabled'
    if(e.detail.scrollTop>20){
      this.setData({[enabled]:false})
    }else{
      this.setData({[enabled]:true})
    }

    console.log(this.data.sectionName)
    if(this.data.sectionName=='question_answer_section'){
      this.onQuestionAnswerScroll();
    }
    
  },
  onQuestionAnswerScroll:function(e){
    let query = wx.createSelectorQuery();
    query.select('#tab').boundingClientRect(rect=>{
      let bottom=rect.bottom;
        if(bottom<this.data.tabTop+2){
          if(!this.data.questionAnswerScrollViewShrinkage){
            console.log(12)
            this.setData({
              questionAnswerScrollViewShrinkage:true,
              question_answer_scroll_view_height:this.data.baseQuestionAnswerScrollViewHeight+this.data.tabHeight+'px',
              // question_answer_scroll_view_top_num:e.detail.scrollTop-this.data.tabHeight
            })  
          }
        }else{
          if(this.data.questionAnswerScrollViewShrinkage){
            console.log(34)
            this.setData({
              questionAnswerScrollViewShrinkage:false,
              question_answer_scroll_view_height:'auto'
              })
          }
          
        }
      }).exec();
    console.log(this.data.tabBottom,this.data.tabTop)
    
  },

  onMyScroll:function(e){
    // let button=this.data.sectionName+'.showGoTopButton'
    // if(e.detail.scrollTop>100){
    //   this.setData({[button]:true})
    // }else if(this.data.showGoTopButton){
    //   this.setData({[button]:false})
    // }
    
   },


  onSearch:function(e){
    this.setData({[this.data.sectionName+'.keyword']:e.detail.value})
    this.getData(true);
  },
  onCancleSearch:function(e){
    this.setData({[this.data.sectionName+'.keyword']:''})
    console.log(this.data)
    console.log(this.data[this.data.sectionName])
    this.getData(true);
  },
  getData: function (reset) {
    console.log('uuu')
    console.log(reset)
    if(this.data.loading)return
    var that=this;
    let data =this.data[this.data.sectionName];
    let {current,pageSize,keyword,zoneId,isEnd}=data;
    current++;
    if(reset){
      console.log('iii')
      current=1;
      this.setData({[this.data.sectionName+'.dataList']:[]})
    }else if(isEnd){
      return
    }
    this.setData({loading:true})
    let sendData={pageNo:current,pageSize,keyword}
    if(zoneId)sendData.zoneId=zoneId;
    setTimeout(() => {
      this.detectLoadingTimeout.bind(this)
    }, this.data.loadingTimeout);
    request({
      url: '/encyclopedia/encyclopediaGet'+that.data.url_suffix_list[that.data.tabIndex],
      header: {
        'content-type': 'x-www-form-urlencoded',
      },
      data:sendData
    })
    .then(res => {
      // console.log(res)
      let {current,pages,records} =res.data.data
      if(this.data.sectionName=='question_answer_section'){
        console.log('sfs')
        records=records.map(item => {
          if(item.allPicUrl)
            item.all_pic_url_list=item.allPicUrl.split(',')
          return item;
        })
      }
      let {dataList}=that.data[this.data.sectionName]
      dataList=dataList.concat(records)
      let data=that.data[that.data.sectionName]
      that.setData({
        loading:false,
        [that.data.sectionName]:{
          ...data,
          current,
          pages,
          dataList,
          isEnd:current==pages?true:false,
        }
      })
      console.log(that.data)
    })      
  },
  detectLoadingTimeout: function(){
    if(this.data.loading){
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
      this.setData({loading:false})
    }
  },
  changeItem:function(e){
    let index=e.currentTarget.dataset.item
    if(index==0){
      this.setData({
        tabIndex:e.currentTarget.dataset.item,
        sectionName:'question_answer_section'
      })  
    }else if(index==1){
      this.setData({
        tabIndex:e.currentTarget.dataset.item,
        sectionName:'communication_section'
      })
    }
    this.getData(true)
  },
  clickQuestionAnswerLine:function(e){
    let index=e.currentTarget.dataset.index;
    let status=this.data.question_answer_section.dataList[index].answer_show;
    this.setData({['question_answer_section.dataList['+index+'].answer_show']:!status})
    if(!status){
      request({
        url: '/encyclopedia/viewQuestionAnswer/'+e.currentTarget.dataset.id,
        method:'get',
        header: {
          'content-type': 'x-www-form-urlencoded',
        },
        // data:{communicationId:e.currentTarget.dataset.id}
      })
    }
  },
  previewImage:function(e){
    console.log(e.currentTarget.dataset)
    wx.previewImage({
      urls: e.currentTarget.dataset.imageList,//注意这个urls,如果原来是数组就直接用,如果原来就一张图需要加中括号强制把他变成数组
      current: e.currentTarget.dataset.imageIndex,//不写值的话默认是上面那个数组的第一个元素,只有写了点击对应图片才能点哪张放大哪张   
      // ||后面是发起者视角的自定义组件，传来的picUrl
    })
  },
  changeZoneFilterStatus:function(){
    this.setData({['communication_section.filterOpen']:!this.data.communication_section.filterOpen})
  },
  chooseZone:function(e){
    let index = e.currentTarget.dataset.index; 
    let {zoneIndex}=this.data.communication_section;
    this.setData({
      communication_section:{
        ...this.data.communication_section,
        filterOpen:false,
        zoneId:index==zoneIndex?null:this.data.communication_section.zoneIdList[index],
        zoneIndex:index==zoneIndex?null:index,
        onFilter:index==zoneIndex?false:true,
      }
    })
    this.getData(true);
  },
  makePhoneCall:function(e){
    console.log(e.currentTarget.dataset)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      success:() => {
        request({
          url: '/encyclopedia/callCommunication/'+e.currentTarget.dataset.id,
          method:'get',
          header: {
            'content-type': 'x-www-form-urlencoded',
          },
          // data:{communicationId:e.currentTarget.dataset.id}
        })
      }
    })
  },
  changeFeedbackType:function(e){
    this.setData({['feedback.type']:e.currentTarget.dataset.index})
    if(this.data.feedback.tip=='请选择反馈类型')
      this.setData({['feedback.tip']:''})
  },
  inputFeedback:function(e){
    this.setData({['feedback.content']:e.detail.value})
    if(this.data.feedback.tip=='请输入反馈信息')
      this.setData({['feedback.tip']:''})
  },
  clickFeedbackButton:function(){
    this.setData({['feedback.modalShow']:true})
  },
  cancelFeedback:function(){
    this.setData({
      feedback:{
        modalShow:false,
        content:'',
        type:null,
        content:'',
        tip:'',
      }
    })
  },
  setFeedbackContent(e){
    this.setData({['feedback.content']:e.detail.value})
  },
  confirmFeedback:function(e){
    console.log(this.data.feedback.content)
    if(!this.data.feedback.type){
      this.setData({['feedback.tip']:'请选择反馈类型'})
      return
    }else if(this.data.feedback.content.trim().length==0){
      this.setData({['feedback.tip']:'请输入反馈信息'})
      return
    }else{
      let that=this;
      request({
        url: '/feedback/feedBack',
        method : 'POST',
        // header : {'content-type' :  'application/x-www-form-urlencoded',},
        data : {
          content : this.data.feedback.content,
          type: this.data.feedback.type,
          source:1,
        }
      }).then(res =>{
        that.cancelFeedback();
        wx.showToast({
          title: '感谢您的反馈！',
          icon: 'success'
        });
     })
    }
  },
  formSubmit: function(e){
    //   防止重复点击提交，添加锁
        if(this.data.submitFeedbackLock == false){
          this.data.submitFeedbackLock == true;
          let type=e.detail.value.type;
          let text = e.detail.value.feedbackText;
          let str = text.trim();//去除收尾字符串
          // 判断是否全是空格 空字符串
          if(str == null || str == '' || str == undefined){
            this.setData({
              feedbackMessage : "该项未填写！"
            });
          }else{   
            request({
              url: '/feedback/feedBack',
              method : 'POST',
              header : {'content-type' :  'application/x-www-form-urlencoded',},
              data : {
                'content' : text,
                'source':1,
                type
              }
            }).then(res =>{
              wx.showToast({
                title: '感谢您的反馈！',
                icon: 'success'
              });
              this.data.submitFeedbackLock = false;
              setTimeout(_ => {
                wx.navigateBack({
                  delta: 1,
                })
              },1000)
    
            }).catch(err=>{
              wx.showToast({
                title: '请求失败，请稍后再试',
                icon: 'error'
              })
            })
          }
        }
      },
})