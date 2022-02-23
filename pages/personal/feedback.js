// pages/feedback/feedback.js
// 首先引入封装成promise的 request
import { request } from "../../request/request.js";
const FormData = require('../../lib/wx-formdata-master/formData.js'); //实现文件上传

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackMessage : "",
    lock: false,
    // text:'test',
  },
  formSubmit: function(e){
//   防止重复点击提交，添加锁
    if(this.data.lock == false){
      this.setData({lock:true})
      let text = e.detail.value.feedbackText;
      let str = text.trim();//去除收尾字符串
      // 判断是否全是空格 空字符串
      if(str == null || str == '' || str == undefined){
        this.setData({
          feedbackMessage : "该项未填写！"
        });
      }else{   
<<<<<<< Updated upstream
        request({
          url: '/feedback/feedBack',
          method : 'POST',
          header : {
            'content-type' :  'application/x-www-form-urlencoded',
             
          },
          data : {
            'content' : text
=======
        let images=this.selectComponent("#image-box").image
        let promise
        if(images.length){
          let imageData = new FormData();
          for (let image of images) {
            imageData.appendFile("files",image)
>>>>>>> Stashed changes
          }
          imageData = imageData.getData();
          promise=request({
            url : '/feedback/UploadPhotos',
            method: 'POST',
            header: {
              'content-type': imageData.contentType,
            },
            data : imageData.buffer
          })
        }else{
          promise=new Promise((resolve)=>{
            resolve({noImage:true})
          })
        }
        promise.then(res=>{
          let data={content:text}
          if(!res.noImage){
            data.allPicUrl=res.data.data
          }
          console.log(data)
          request({
            url: '/feedback/feedBack',
            method : 'POST',
            header : {
              'content-type' :  'application/json',
               
            },
            data : data
          }).then(res =>{
            console.log(res)
            wx.showToast({
              title: '感谢您的反馈！',
              icon: 'success'
            });
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
        })

        
      }
      this.setData({lock:false})
    }
    

  },
  handleInput: function(e){
    this.setData({
      feedbackMessage : e.detail.cursor>=310?"字符已达上限！":''
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new Promise((resolve,reject)=>{
      resolve({data:'something'})
    }).then(res=>{
      console.log(res)
    })
  },

})