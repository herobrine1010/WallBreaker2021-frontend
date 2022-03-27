// pages/xianyu/publish.js
var app=getApp();
import {request} from "../../request/request.js";
import {parseDetail} from "./tool.js"
const FormData = require('../../lib/wx-formdata-master/formData.js'); //实现文件上传
const categoryList=[
  {id:74,value:'互助'},
  {id:64,value:'图书'},
  {id:65,value:'美妆'},
  {id:66,value:'日用'},
  {id:67,value:'数码'},
  {id:68,value:'虚拟商品'},
  {id:69,value:'票务'},
  {id:70,value:'服饰'},
  {id:71,value:'出行'},
  {id:72,value:'其他'},
  ]
const zoneList=[
  {id:56,value:'四平路校区',},
  {id:58,value:'彰武路校区'},
  {id:57,value:'嘉定校区'},
  {id:60,value:'沪西校区'},
  {id:61,value:'沪北校区'},
  {id:59,value:'铁岭校区'},
  {id:63,value:'线上'},
  {id:62,value:'不限地点'},
]
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
    // 选中标签列表
    selectedLabelList: [],
    height:'auto',
    //------------确认提交的弹窗，用于渲染------------
    isDialogShow:false,
    dialogContent:"确认发布失物招领吗？",
    dialogTip:"",
    dialogCancelText:"取消",
    dialogOkText:"确认",



    type:0,
    typeName:'出售',
    haveEdited:false,
    
    priceInputWidth:12,

    contactTypeRange:contactTypeList,
    categoryList:categoryList,
    zoneList:zoneList,
    detail:{
      contactController:{
        lastIndex:0,
        count:1,
        showAddButton:true,
      },
      lastContactIndex:0,
      countContactNumber:1,
      showAddButton:true,
      contactList:[{
        index:-1,
        type:'',
        content:'',
        status:'new',
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)

    let typeName
    if(options.type==0){
      typeName='出售'
    }else if(options.type==1){
      typeName='求购'
    }
    this.setData({
      type:options.type,
      typeName,
      id:options.id,
      mode:options.mode||'new',
    })
    if(options.mode=='edit'){
      this.initializeAll()
    }else if(options.mode=='new'){
      this.initializeWx()
      this.askIfContinueEditing()
    }

    this.changeScrollHeight();
    
  },
  onUnload:function(e){
    if(this.data.mode=='new'&&this.data.haveEdited){
      app.globalData.xianyuSaving=true
      console.log(this.selectComponent('#image-box').image)
      uploadPictures(this.selectComponent("#image-box").image).then(res=>{
        console.log(res)
        if(res.allPicUrl){
          res.allPicUrl=res.allPicUrl.split(',')
        }
        wx.setStorageSync('xianyuEditHistory'+this.data.type, {
          ...this.data.detail,
          ...res,
        })
        app.globalData.xianyuSaving=false
      })
    }
  },
  askIfContinueEditing:function(e){
    let editHistory=wx.getStorageSync('xianyuEditHistory'+this.data.type)
    // console.log(editHistory)
    console.log('pictureList',editHistory.allPicUrl||[])
    if(editHistory){
      this.setData({
        dialog:{
          isDialogShow: true,
          title:'是否恢复上次编辑内容？',
          tapOkEvent:"confirmRestoreEditedContent"
        },
      })
    }
  },
  confirmRestoreEditedContent:function(e){
    let that=this
    let countDown=10
    waitAfterSavedContent(10)

    function waitAfterSavedContent(){
      if(app.globalData.xianyuSaving==true){
        if(countDown==10){
          wx.showLoading({
            title: '加载中',
          })
        }else if(countDown==0){
          that.restoreEditedContent()
          wx.hideLoading({
            success: (res) => {},
          })
          return
        }
        countDown--
        setTimeout(waitAfterSavedContent, 100);
      }else{
        that.restoreEditedContent()
      }
    }
  },
  restoreEditedContent:function(e){
    let editHistory=wx.getStorageSync('xianyuEditHistory'+this.data.type)
    this.setData({
      detail:editHistory,
      haveEdited:false,
    })
    this.changePriceInputWidth()
  },
  // onShareAppMessage: function () {
  //   return {
  //     title : '欢迎注册使用济星云小程序！',
  //     path:app.getSharedUrl()
  //   }
  // },
  initializeAll:function(e){
    let that=this
    let id=20
    if(this.data.id) id=this.data.id
    console.log('yi')
    request({
      url: '/market/getMarket/' + id+'/false',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
    }).then(res=>{
      // console.log(res.data)
      that.setData({
        detail:{
          ...parseDetail(res.data.data),
          ...parseIdToIndex(res.data.data),
          contactList:parseContactList(res.data.data),
          contactController:parseContactController(res.data.data),
        }
      })
      that.changePriceInputWidth()

    })
  },
  initializeWx:function(e){
    request({
      url : "/user/myInfo",
      header: {
        'content-type': 'x-www-form-urlencoded',
         
      }
    }).then(res=>{
      let wxId=res.data.data.wxId
      if(wxId){
        this.setData({['detail.contactList']:[{
          index:0,
          type:'微信',
          content:wxId,
          status:'new',
          showAddButton:true,
        }]})
      }
    })
  },

  goBack:function(e){
    if(this.data.mode=='edit'&&this.data.haveEdited){
      this.setData({
        dialog:{
          isDialogShow: true,
          title:'确定离开？',
          content:'本次编辑内容不会保存',
          tapOkEvent:"confirmGoBack"
        },
      })
    }else{
      this.confirmGoBack()
    }
  },

  confirmGoBack:function(e){
    if(getCurrentPages().length>1){
      wx.navigateBack({
        delta: 1
      });
    }else{
      wx.reLaunch({
        url: '/pages/xianyu/main?type={{type}}',
      })
    }
  },

  changeName(e){
    this.setData({
      ['detail.name']:e.detail.value,
      ['errors.name']:e.detail.value.length>=12?'字数已达上限':'',
      haveEdited:true,
    })
  },

  changeContent(e){
    this.setData({
      ['detail.content']:e.detail.value,
      ['errors.contentLimit']:e.detail.value.length>=200?'字数已达上限':'',
      ['errors.contentNone']:'',
      haveEdited:true,
    })
  },

  changeImage(e){
    this.setData({
      haveEdited:true,
      ['errors.images']:'',
    })
    // console.log('change')
  },

  changeCategory(e){
    this.setData({
      ['detail.categoryIndex']:e.detail.value,
      ['errors.category']:'',
      haveEdited:true,
    })
  },

  changeZone(e){
    this.setData({
      ['detail.zoneIndex']:e.detail.value,
      ['errors.location']:'',
      haveEdited:true,
    })
  },

  changePrice:function(e){
    let value=e.detail.value
    this.setData({
      ['detail.price']:value,
      haveEdited:true,
    })
    if(value){
      this.setData({['errors.price']:''})
    }
    this.changePriceInputWidth()
  },

  changePriceInputWidth(e){
    let value=String(this.data.detail.price||'')
    let length;
    if(value){
      length=6+11*value.replace(/[^\x00-\xff]/g, "ab").length
      length-=(value.split('.').length-1)*6  
    }else{
      length=12
    }
    this.setData({
      priceInputWidth:length,
    })
    
  },

  changeContactType:function(e){
    console.log(e)
    this.setData({
      ['detail.contactList['+e.currentTarget.dataset.index+'].index']:e.detail.value,
      haveEdited:true,
    })
    this.changeContactError()
    this.changeContactStatus(e.currentTarget.dataset.index)
  },

  changeContact:function(e){
    this.setData({
      ['detail.contactList['+e.currentTarget.dataset.index+'].content']:e.detail.value,
      haveEdited:true,
    })
    this.changeContactError()
    this.changeContactStatus(e.currentTarget.dataset.index)
  },

  changeContactError:function(){
    let contactError=false
    let status
    for(let item of this.data.detail.contactList){
      status=item.status
      if(status=='new'||status=='modified'){
        if(item.index<0||item.content.trim()==''){
          contactError=true
          break
        }
      }else{
        continue
      }
    }
    if(!contactError){
      this.setData({
        ['errors.contact']:'',
      })
    }
  },

  changeContactStatus:function(index){
    let status=this.data.detail.contactList[index].status
    if(status=='complete'){
      this.setData({
        ['detail.contactList['+index+'].status']:'modified'
      })
    }else{

    }
  },
  
  addNewContact:function(e){
    console.log(this.data.detail.contactList)
    let count=this.data.detail.contactController.count+1
    let list=this.data.detail.contactList
    list.push({
      index:-1,
      type:'',
      content:'',
      status:'new',
    })
    this.setData({
      ['detail.contactList']:list,
      ['detail.contactController']:{
        lastIndex:list.length-1,
        count:count,
        showAddButton:count>=4?false:true,
        showMinusButton:true,
      },
      haveEdited:true,
    })
    // this.countContactNumber()
  },

  deleteContact:function(e){
    console.log(this.data.detail.contactList)
    let count=this.data.detail.contactController.count-1
    let list=this.data.detail.contactList
    let deleteItem=list[e.currentTarget.dataset.index]
    let status=deleteItem.status
    if(status=='new'){
      deleteItem.status='ignore'
    }else{    //'modified' 'complete'
      deleteItem.status='deleted'
    }
    let lastContactIndex=this.data.detail.contactController.lastIndex
    if(e.currentTarget.dataset.index==lastContactIndex){
      for(let i=lastContactIndex-1;i>=0;i--){
        status=list[i].status
        if(status!='ignore'&&status!='deleted'){
          lastContactIndex=i
          break
        }
      }
    }
    this.setData({
      // ['detail.contactList['+e.currentTarget.dataset.index+'].status']:status,
      ['detail.contactList']:list,
      ['detail.contactController']:{
        lastIndex:lastContactIndex,
        count:count,
        showAddButton:count>=4?false:true,
        showMinusButton:count<=1?false:true,
      },
      haveEdited:true
    })
    // this.countContactNumber()
  },

  printContactList:function(){
    console.log(this.data.detail)
  },

  countContactNumber:function(){
    let count=0
    for(let item of this.data.detail.contactList){
      if(item.status!='ignore'&&item.status!='delete'){
        count++
      }
    }
    console.log(count)
    this.setData({
      ['detail.contactLimit']:count>=4?true:false,
    })
  },

  formValidationError:function(e){
    let errors={}
    let detail=this.data.detail
    if(!detail.name){
      errors.name='该项未填写'
    }
    if(!detail.content){
      errors.contentNone='该项未填写'
    }
    if(!this.selectComponent('#image-box').image.length){
      if(this.data.type==0){
        errors.images='请至少选择一张图片上传'
      }
    }
    if(!detail.price){
      errors.price='该项未填写'
    }
    if(!detail.categoryIndex){
      errors.category='该项未填写'
    }
    if(!detail.zoneIndex){
      errors.location='该项未填写'
    }

    let contactError=false
    let status
    for(let item of detail.contactList){
      status=item.status
      if(status=='new'||status=='modified'){
        if(item.index<0||item.content.trim()==''){
          contactError=true
          break
        }
      }else{
        continue
      }
    }
    if(contactError){
      errors.contact='请将联系方式补充完整'
    }
    this.setData({errors})
    return Object.keys(errors).length
  },

  cancelPublishDetail:function(e){

  },

  publishDetail:function(e){

    if(this.formValidationError()){
      return
    }else{
      this.setData({
        dialog:{
          isDialogShow: true,
          title:'确定发布出售帖子？',
          tapOkEvent:"confirmPublishDetail"
        },
      })
      
    }
  },

  confirmPublishDetail:function(){
    if(this.data.publishing)return
    this.setData({
      publishing:true,
    })
    let detail=this.data.detail
    detail.type=this.data.type
    initializeMarket.bind(this)(detail,this.selectComponent("#image-box").image)
  },

  
  changeScrollHeight:function(){
    let windowHeight;
    let operationAreaHeight;
    //设置scroll-view高度
    wx.getSystemInfo({
      success: function (res) {
          windowHeight= res.windowHeight;
      }
    });
    let query = wx.createSelectorQuery();
    query.select('#operation-area').boundingClientRect(rect=>{
      operationAreaHeight=rect.height
    }).exec();
    query.select('#scroll').boundingClientRect(rect=>{
        let top = rect.top;
        let height=windowHeight-top-operationAreaHeight;
        this.setData({
          height:height+'px',
        });
      }).exec();
      
  },
  hideDialog(){
    this.setData({
      isDialogShow:false,
    })
  },
  onShow(){
    console.log('here is onshow of xianyu publish')
    console.log(this.options.type)
  }
})

async function uploadPictures(images){
  if(!images.length)return {}
  let resultList=[],uploadList=[]
  for(let image of images){
    if(image.indexOf('wallbreaker')>-1){
      resultList.push(image)
    }else{
      resultList.push(null)
      uploadList.push(image)
    }
  }
  // console.log(resultList)
  // console.log(uploadList)

  let resultData={}
  if(uploadList.length){
    let imageData = new FormData();
    for (let image of uploadList) {
      imageData.appendFile("files",image)
    }
    var data = imageData.getData();
    await request({
      url : '/market/marketUploadPhotos',
      method: 'POST',
      header: {
        'content-type': data.contentType,
      },
      data : data.buffer
    }).then(res=>{
      console.log(res)
      if(res.data.success){
        uploadList=res.data.data.split(',')
        for(let key in resultList){
          if(!resultList[key]){
            resultList[key]=uploadList.shift()
          }
        }
      }
    })
  }
  resultData.allPicUrl=resultList.join(',')
  resultData.firstPicUrl=resultList[0]

  return resultData
}

async function initializeMarket(detail,images){
  let that=this

  this.setData({haveEdited:false})

  let imageUrlData
  await uploadPictures(images).then(res=>{
    imageUrlData=res
  })

  let {type,name,content,categoryIndex,zoneIndex,price,contactList}=detail
  // type=type==1?true:false

  let data={
    type,
    name,
    content,
    category:categoryList[categoryIndex].id,
    location:zoneList[zoneIndex].id,
    price,
    ...imageUrlData,
    released:1,
  }

  let url
  if(this.data.mode=='new'){
    url='/market/initializeMarket'
  }else if(this.data.mode=='edit'){
    url='/userMarket/editMyMarket'
    data.id=detail.id
  }else{
    console.log(this.data.mode)
    wx.showToast({
      title: 'error',
      icon:'error',
    })
    return
  }
  
  console.log(data)
  
  request({
    url: url, 
    header: {
      'content-type': 'application/json',
    },
    method : 'POST',
    data: data
  }).then(res=>{
    console.log(res)
    if(res.data.success||res.statusCode==200){
      let id
      if(that.data.mode=='new'){
        id=res.data.data.id
      }else if(that.data.mode=='edit'){
        id=detail.id
      }
      uploadContactList(id,contactList).then(results=>{
        console.log(results)

        if(this.data.mode=='new'){
          wx.removeStorageSync('xianyuEditHistory'+this.data.type)
          that.setData({
            haveEdited:false,
          })
        }else if(this.data.mode=='edit'){

        }

        app.globalData.xianyuRefresh=true

        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000,
          success: that.goBack()
        });


      })
    }else{
      console.log('fail')
    }
  })

}

async function uploadContactList(id,contactList){
  let status
  let data
  let newList=[]
  let editList=[]
  let requestList=[]
  for(let item of contactList){
    console.log(item)
    if(item.index<0)continue
    data={
      contactType:contactTypeList[item.index].id,
      contact:item.content,
    }
    switch(item.status){
      case 'ignore':
      case 'complete':
        continue
      case 'new':
        newList.push(data)
        break
      case 'modified':
        editList.push({
          ...data,
          id:item.id,
        })
        break
      case 'deleted':
        requestList.push(request({
          url: '/market/deleteMarketContact/'+item.id, 
          header: {
            'content-type': 'application/json',
          },
          method : 'POST',
        }))
    }
    
  }
  if(newList.length){
    requestList.push(request({
      url: '/market/postMarketContact/' + id,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data:newList
    }))  
  }
  if(editList.length){
    requestList.push(request({
      url: '/market/editMarketContact/' + id,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data:editList
    }))  
  }
  console.log('newList',newList)
  console.log('editList',editList)
  console.log('requestList',requestList)

  return Promise.all(requestList)

}

function parseIdToIndex(detail){
  let {category,location}=detail
  let categoryIndex,zoneIndex
  for(let index in categoryList){
    if(category==categoryList[index].id){
      categoryIndex=index
      break
    }
  }
  for(let index in zoneList){
    if(location==zoneList[index].id){
      zoneIndex=index
      break
    }
  }
  return {
    categoryIndex,zoneIndex,
  }
}

function parseContactList(detail){
  console.log(detail)
  let contactList=detail.marketContactList
  let index
  if(contactList.length){
    return detail.marketContactList.map((item,i)=>{
      for(let j in contactTypeList){
        if(item.contactType==contactTypeList[j].id){
          index=j
          break
        }
      }

      return {
        id:item.id,
        index:i,
        type:contactTypeList[index].value,
        content:item.contact,
        status:'complete',
      }
    })
  }else{
    return [{
      index:-1,
      type:'',
      content:'',
      status:'new',
    }]
  }
  
}

function parseContactController(detail){
  let list=detail.marketContactList
  let count=list.length
  let data={
    lastIndex:list.length-1,
    count:count,
    showAddButton:count>=4?false:true,
    showMinusButton:count<=1?false:true,
  }
  console.log(data)
  return data

}