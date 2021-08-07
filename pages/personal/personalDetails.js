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
    userDetails: {
      nickName: '默认昵称',
      identification:'本科',
      isIdentificationVisible: true,
      grade: '20级',
      isGradeVisible: false,
      school: '土木工程学院',
      isSchoolVisible: false,
      major: '防灾减灾工程',
      isMajorVisible: false,
      wxId: 'wxid-25536748',
      description: '理工科钢铁直男一枚~'
    },
    uploadImageLock : true,

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
  // 定义表单提交事件 formSubmit，并且拿到表单的数据
  formSubmit : function(e){
    this.setData({
      userDetails:e.detail.value
    });
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
    let dialog = {
      isDialogShow: true,
      content:"确认修改？",
      hasInputBox:false,
      tip:"",
      cancelText:"取消",
      okText:"确认",
      tapOkEvent:"dialogTapOkForChangePersonalDetail"
    };
    this.setData({
      dialog
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
            'cookie':wx.getStorageSync("token")
          },
          method : 'PUT',
          data :  that.data.userDetails
        })
      }).then( res => {
        console.log(res);
      });
      requestList.push(p1);
    //------ --- 如果头像没有更改，则 修改个人资料请求 不包括头像----- --------- -------
    }else{
      let p1 = request({
        url : '/user/editMyInfo',
        header: {
          'content-type': 'application/json',
          'cookie':wx.getStorageSync("token")
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
        'cookie':wx.getStorageSync("token")
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
        'cookie':wx.getStorageSync("token")
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
        wx.showToast({
          title: '上传成功'
        })
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
    // -----------使用封装成promise 的request方法，注意添加本文件最上方的引入------------；
    const that = this;
    request({
      url : "/user/myInfoWithLabel",
      header: {
        'content-type': 'x-www-form-urlencoded',
        'cookie':wx.getStorageSync("token")
      }
    }).then( res => {
      let result = res.data.data;
      // console.log(result);
      // 提取用户的头像、昵称等个人信息--------
      let userDetails = {
        nickName: result.nickName ,
        identification:result.identification ,
        identificationPublic: result.identificationPublic ,
        grade: result.grade ,
        gradePublic: result.gradePublic ,
        school: result.school ,
        schoolPublic: result.schoolPublic ,
        major: result.major ,
        majorPublic: result.majorPublic ,
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

  }
})