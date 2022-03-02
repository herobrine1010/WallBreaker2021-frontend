// pages/personalDetails/main.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";
const FormData = require('../../lib/wx-formdata-master/formData.js'); //实现文件上传

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    avatarPath : '../../static/icon/default-user-big.png',
    identificationList : ['本科生','硕士研究生','博士研究生','博士后'],
    schoolList : ['同心学堂','同德学堂','同舟学堂','同和学堂','济人学堂','济世学堂','济美学堂','济勤学堂','国豪学堂','建筑与城市规划学院','土木工程学院','机械与能源工程学院','经济与管理学院','环境科学与工程学院','材料科学与工程学院','电子与信息工程学院','外国语学院','航空航天与力学学院','数学科学学院','物理科学与工程学院','化学科学与工程学院','医学院','口腔医学院','交通运输工程学院','中德学院','中德工程学院','铁道与城市轨道交通研究院','职业技术教育学院','生命科学与技术学院','软件学院','汽车学院','海洋与地球科学学院','艺术与传媒学院','人文学院','体育教学部','法学院','政治与国际关系学院','马克思主义学院','设计创意学院','测绘与地理信息学院','上海国际知识产权学院','国际足球学院'],
    uploadImageLock : true,
    isWxidPopoverShow : false
  },

  // ------------- ------- ----- below 以下是 自定义事件---- ------ -----
  //定义更换头像事件 changeImage
  changeImage : function(){
    var self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        self.setData({
          tempFilePaths,
          avatarPath : tempFilePaths,
          uploadImageLock : false
        })
      }
    })
  },

  //  picker组件的更改事件：
  onIdentificationChange(e){
    let index = e.detail.value;
    let identification = this.data.identificationList[index];
    this.setData({
      'userDetails.identification' : identification
    })
  },
  onGradeChange(e){
    let index = e.detail.value;
    let reg = /(\d+)/g;
    let grade = this.data.gradeList[index].match(reg)[0];
    this.setData({
      'userDetails.grade' : grade
    })
  },
  onSchoolChange(e){
    let index = e.detail.value;
    let school = this.data.schoolList[index];
    this.setData({
      'userDetails.school' : school
    })
  },



  // 定义表单提交事件 formSubmit，并且拿到表单的数据
  formSubmit : function(e){
    let detail = e.detail.value;
    this.setData({
      userDetails:{
        ...this.data.userDetails,
        ...detail,
      }
    });
    
    console.log(this.data.userDetails)
    if(this.data.userDetails.canChangeName&&this.data.userDetails.nickName!=this.data.userDetails.originalNickName){
      this.setData({
        dialog:{
          isDialogShow: true,
          content:"确认修改吗？\n昵称14天内不可再次修改噢~",
          hasInputBox:false,
          tip:"",
          cancelText:"取消",
          okText:"确认",
          tapOkEvent:"showConfirmChangePersonalDetailModal",
        }
      })
    }else{
      this.showConfirmChangePersonalDetailModal()
    }

  },
  // ------- 隐藏 微信号提示气泡 -------------
  hidePopover(){
    this.setData({
      isWxidPopoverShow : false
    })
  },


  // 定义点击事件，拿到标签数据
  btnTap:function(){
    //从label-selector组件中拿到数据
    const personalLabelData = this.selectComponent('#personalLabel').data.labels;
    const interestLabelData = this.selectComponent('#interestLabel').data.labels;
    let labels = personalLabelData.concat(interestLabelData);
    this.setData({
      labels
    })
   
    // ------------- 弹出对话框让用户确定--------------------------

  },

  showConfirmChangePersonalDetailModal:function(){
    this.setData({
      dialog: {
        isDialogShow: true,
        content:"确认提交个人资料修改吗？",
        hasInputBox:false,
        tip:"",
        cancelText:"取消",
        okText:"确认",
        tapOkEvent:"dialogTapOkForChangePersonalDetail"
      }
    })
  },

  // 用户在对话框中点击确定后，会触发以下事件，并向服务器发送请求
  dialogTapOkForChangePersonalDetail:function(){
    let that = this ;
    let labels = that.data.labels;
    let requestList = [];
    // --- -- 用户更改头像之后，锁被打开 之后 --------- --------- ----- ----
    // -------  首先应根据本地路径上传图片，拿到图片的url,之后将url和表单数据一起提交 ------
    if(!that.data.uploadImageLock){
      let imageData = new FormData();
      imageData.appendFile("files",this.data.tempFilePaths[0]);
      let data = imageData.getData();
      let p1 =  request({
        url:'/team/jirenUploadPhotos',
        method : 'POST',
        header: {
          "content-type": data.contentType
        },
        data: data.buffer,
      }).then(res => {
        that.data.userDetails.avatarUrl = res.data.data;
        return request({
          url : '/user/editMyInfo',
          header: {
            'content-type': 'application/json',
             
          },
          method : 'PUT',
          data :  that.data.userDetails
        })
      });
      requestList.push(p1);
    //------ --- 如果头像没有更改，则 修改个人资料请求 不包括头像----- --------- -------
    }else{
      let p1 = request({
        url : '/user/editMyInfo',
        header: {
          'content-type': 'application/json',
           
        },
        method : 'PUT',
        data : that.data.userDetails
      })
      requestList.push(p1);
    };

    // -------------- 以下是修改个人资料:(数据可见性）  -----------
    let publicData = that.data.userDetails;
    let p2 = request({
      url : '/userPublicInfo/editMyPublicInfo',
      header: {
        'content-type': 'application/json',
         
      },
      method : 'PUT',
      data : {
        gradePublic: publicData.gradePublic,
        identificationPublic: publicData.identificationPublic,
        majorPublic: publicData.majorPublic,
        schoolPublic: publicData.schoolPublic
      }
    });
    requestList.push(p2);

    // ----------以下是：--------更改个人和兴趣标签------------------------------------
    // 1.请求参数为JSON 格式，不能有null；所以先将 selected = null 转为 false ; 再转为JSON格式------
    labels = labels.map(v => {
      return{
        id : v.id,
        content : v.content,
        selected : v.selected==null?false:v.selected
      }
    });
    // 小程序会自动转JSON格式
    // console.log(JSON.stringify(labels));
    let p3 = request({
      url : '/userLabel/editMyLabel',
      header: {
        'content-type': 'application/json',
         
      },
      method : 'POST',
      data : labels
    })
    requestList.push(p3);

    let isRequestSuccess = true;
    
    Promise.all(requestList)
    .then(res => {
      // 遍历返回值，判断请求是否正确
      for (let resData in res){
        if(resData.statusCode>=300 || resData.statusCode<200){
          isRequestSuccess = false;
        }
      };
      if(!isRequestSuccess){
        wx.showToast({
          title: '网络错误',
          icon: 'error'
        })
      }else{
        that.setData({['userDetails.canChangeName']:false})
        wx.showToast({
          title: '上传成功'
        });
        setTimeout(() => {
          wx.navigateBack({
            delta : 1
          })
        }, 1000);
      }
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '请求失败',
        icon : 'error'
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let source = options.source;
    if(source == 'needWxId'){
      this.setData({
        isWxidPopoverShow : true
      })
    }
    // 获取当前的年份，用于picker选择器的数据列表
    let endYear = new Date().getFullYear();
    let startYear = 2010;
    let gradeList = [];
    for(let i = endYear; i>= startYear; i--){
      gradeList.push(i+'级');
    };
    this.setData({
      gradeList
    });

    // -----------使用封装成promise 的request方法，注意添加本文件最上方的引入------------；
    const that = this;
    request({
      url : "/user/myInfoWithLabel",
      header: {
        'content-type': 'x-www-form-urlencoded',
         
      }
    }).then( res => {
      console.log(res)
      let result = res.data.data;
      // 提取用户的头像、昵称等个人信息--------
      let userDetails = {
        nickName: result.nickName ,
        originalNickName:result.nickName,
        canChangeName:result.canChangeName,
        identification:result.identification ,
        identificationPublic: result.identificationPublic===null?true :  result.identificationPublic ,
        grade: result.grade ,
        gradePublic: result.gradePublic === null ? true : result.gradePublic,
        school: result.school ,
        schoolPublic: result.schoolPublic === null ? true : result.schoolPublic,
        major: result.major ,
        majorPublic: result.majorPublic === null ? true : result.majorPublic,
        wxId: result.wxId ,
        description: result.description 
      };
      // 提取用户的个人和兴趣标签--------
      let personalLabel = result.personalLabel.map( v=> {
        return {
          id : v.id,
          content : v.content,
          selected : v.selected
        }
      });
      let interestLabel = result.interestLabel.map( v=> {
        return {
          id : v.id,
          content : v.content,
          selected : v.selected
        }
      })

      that.setData({
        userId : result.id,
        avatarPath : result.avatarUrl,
        userDetails,
        personalLabel,
        interestLabel
      })
    }).catch( err => {
      console.log(err);
      wx.showToast({
        title: '页面加载错误',
        icon: 'error'
      })
    })
  },

  clickNickNameInput:function(e){
    if(!this.data.userDetails.canChangeName){
      this.setData({
        dialog: {
          isDialogShow: true,
          content:"昵称14天内不可再次修改噢~",
          hasInputBox:false,
          tip:"",
          okText:"确认",
          hideCancelButton:true,
          tapOkEvent:"none"
        }
      })
    }
  },

  none:function(){

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

})