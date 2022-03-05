// pages/xianyu/detail.js
import {request} from "../../request/request.js";
import {parseDetail} from "./tool.js"

const app=getApp()
const contactTypeList=[
  {id:39,value:'微信'},
  {id:38,value:'QQ'},
  {id:40,value:'手机号'},
  {id:41,value:'邮箱'},
  {id:42,value:'其他'},
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight:'auto',

    initializedByMe:false,
    type:'',
    typeName:'',

    isPersonalInfoShow:false,
    initiatorDetail:{},
    // detail:{
    //   initiatorAvatar:'',
    //   initiatorName:'破壁者1号',
    //   createTime:'2021年5月15日 16:34',
    //   starNumber:11,
    //   name:'TOM FORD口红',
    //   location:'四平',
    //   price_integer:299,
    //   price_fractional:'.50',
    //   content:'九成新，用了不超过5次，去年圣诞节购入，不喜欢了，蹲一个有缘人！联系我24小时发货！主要在四平交易，线上也可，不过会用比较小众的物流。九成新，用了不超过5次，去年圣诞节购入，不喜欢了，蹲一个有',
    //   allPicUrl:['https://wallbreaker-tongji.oss-cn-shanghai.aliyuncs.com/static-img/jiren/team/ee2d71c472aa4c83a4fea4943eb40afbtmp_48dfa61e3c5bbc404b2cf7920dcfdd5471fc3563ac05ae81.jpg',],
    //   contactList:[{key:'微信',value:'pobier123'},{key:'电话',value:'12121212121'},{key:'QQ',value:'141415964'}]
    // },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let typeName
    if(options.type==0){
      typeName='出售'
    }else if(options.type==1){
      typeName='求购'
    }
    this.setData({
      id:options.id||23,
      type:options.type||0,
      typeName,
    })

    this.initializeScrollViewHeight()
    this.getDetail()

  },
  onShow:function(options){
    if(app.globalData.xianyuRefresh){
      this.getDetail()
    }
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

  initializeScrollViewHeight:function(){
    var that=this;
    let windowHeight
    let operationAreaHeight
    wx.getSystemInfo({
      success: function (res) {
        windowHeight=res.windowHeight
      }
    });
    let query = wx.createSelectorQuery();
    query.select('#operation-area').boundingClientRect(rect=>{
      operationAreaHeight=rect.height
      console.log(operationAreaHeight)
    }).exec();
    query.select('#scroll-view').boundingClientRect(rect=>{
        let top = rect.top;
        console.log(top)
        let height=windowHeight-top-operationAreaHeight;
        this.setData({
          scrollViewHeight:height,
        });
      }).exec();
      
  },

  getDetail(){
    let that=this
    request({
      url: '/market/getMarket/' + this.data.id+'/true',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
    }).then(res=>{
      console.log(res.data)
      that.setData({
        like:res.data.data.myFavourite,
        initializedByMe:res.data.data.initializedByMe,
        detail:{
          ...parseDetail(res.data.data),
          contactList:parseContactList(res.data.data),
        }
      })
    })
  },

  getInitiatorDetail:function(){
    request({
      url: '/user/userInfo',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data:{userId:this.data.detail.userId}
    }).then(res=>{
      console.log(res)
      let data=res.data.data
      delete data.wxId
      this.setData({
        initiatorDetail:{
          ...data,
          avatar:data.avatarUrl,
          personalLabel:data.personalLabel.map(item=>item.content),
          interestLabel:data.interestLabel.map(item=>item.content),
  
        },
      })
    })
    
  },

  showInitiatorInformation:function(e){
    if(!Object.keys(this.data.initiatorDetail).length){
      this.getInitiatorDetail()
    }
    this.setData({isPersonalInfoShow:true})
  },

  collectDetail:function(e){
    if(this.data.initializedByMe)return
    request({
      url: '/userFavouriteMarket/addToMyFavouriteMarket/' + this.data.detail.id,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
    }).then(res=>{
      console.log(res)
      if(res.data.success){
        this.setData({
          like:true,
          ['detail.countFavourite']:this.data.detail.countFavourite+1,
        })
        wx.showToast({
          title: '收藏成功',
          icon:'success',
        })
    
      }
    })
  },

  cancelCollectDetail:function(e){
    request({
      url: '/userFavouriteMarket/RemoveFromMyFavouriteMarket/' + this.data.detail.id,
      method: 'DELETE',
      header: {
        'content-type': 'application/json'
      },
    }).then(res=>{
      console.log(res)
      if(res.data.success){
        this.setData({
          like:false,
          ['detail.countFavourite']:this.data.detail.countFavourite-1,
        })
        wx.showToast({
          title: '取消收藏成功',
          icon:'success',
        })
      }
    })
    
  },

  zoomInDetailPicture:function(e){
    var imgUrl = this.data.detail.allPicUrl;
    wx.previewImage({
      urls: imgUrl,//注意这个urls,如果原来是数组就直接用,如果原来就一张图需要加中括号强制把他变成数组
      current: imgUrl[e.currentTarget.dataset.index],//不写值的话默认是上面那个数组的第一个元素,只有写了点击对应图片才能点哪张放大哪张   
      // ||后面是发起者视角的自定义组件，传来的picUrl
    })
  },

  showContactListModal:function(e){
    this.setData({
      dialog:{
        isDialogShow: true,
        title:'该同学留下的联系方式如下\n请保护好同学隐私哦～',
        contactList:this.data.detail.contactList,
        hideCancelButton:true,
        tapOkEvent:"hideModal",
      }
    })

  },

  hideModal:function(e){
    this.setData({['dialog.isDialogShow']:false})
  },

  editDetail:function(e){
    wx.navigateTo({
      url: '/pages/xianyu/publish?mode=edit&type='+this.data.type+'&id='+this.data.detail.id,
    })
  },

  closeDetail:function(e){
    this.setData({
      dialog:{
        isDialogShow: true,
        title:'确认下架？',
        content:'下架后帖子不会出现在校\n园闲鱼页面，是否确定？',
        tapOkEvent:"confirmCloseDetail",
      }
    })
  },

  deleteDetail:function(e){
    this.setData({
      dialog:{
        isDialogShow: true,
        title:'确认删除？',
        content:'删除后无法恢复，是否确定？',
        tapOkEvent:"confirmDeleteDetail",
      }
    })
  },

  confirmCloseDetail:function(e){
    let that=this
    request({
      url: '/userMarket/hideMyMarket',
      header: {
        'content-type': 'application/json',
      },
      method : 'POST',
      data: {
        id:this.data.detail.id
      }
    }).then(res=>{
      console.log(res)
      if(res.statusCode==200){
        wx.showToast({
          title: '成功',
          icon:'success',
        })
        this.setData({
          ['detail.hidden']:1,
        })
        app.globalData.xianyuRefresh=true
      }
    })
  },

  confirmDeleteDetail:function(e){
    let that=this
    request({
      url: '/userMarket/deleteMyMarket/'+this.data.detail.id,
      header: {
        'content-type': 'application/json',
      },
      method : 'POST',
    }).then(res=>{
      console.log(res)
      if(res.statusCode==200){
        wx.showToast({
          title: '成功',
          icon:'success',
        })
        app.globalData.xianyuRefresh=true
        console.log(this.selectComponent('#navigation-bar'))
        this.selectComponent('#navigation-bar').back()
      }
    })
  },
})

function parseContactList(detail){
  let contactList=detail.marketContactList
  let index
  return detail.marketContactList.map((item,i)=>{
    for(let j in contactTypeList){
      if(item.contactType==contactTypeList[j].id){
        index=j
        break
      }
    }

    return {
      key:contactTypeList[index].value,
      value:item.contact,
    }
  })

  
}