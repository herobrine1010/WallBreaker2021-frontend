// package_avatar_frame/avatar-frame/page-select-backimg/select-back-img.ts

import {AvatarFrameSharedAssets} from '../resources/assets-base64'
import {AvatarFrameShareInfo} from '../share-common'
var app=getApp();

Page({

    /**
     * Page initial data
     */
    data: {
        imgUrl: '',
        backgroundBase64: AvatarFrameSharedAssets.mainBackground
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {
        return AvatarFrameShareInfo.data
    },

    onShow(){
        wx.reportEvent("avatar_frame_select_back_img", app.globalData.user_attribute)
    },

    
    /**
     * 页面按钮触控事件处理。
     * 按钮id放置于 data-btnid 中。
     */
    btnClickHandler(event: any) {
        const btnid = event.currentTarget.dataset.btnid
        switch (btnid) {
            case 'selectFromCam': // 从相机选择
                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['camera'],

                }).then(res => {
                    this.setData({
                        imgUrl: res.tempFilePaths
                    })

                    wx.navigateTo({
                        url: '../page-main/avatar-frame?imgUrl=' + this.data.imgUrl,
                    })
                })
                break

            case 'selectFromAlbum': // 从相册选择
                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['album'],

                }).then(res => {
                    this.setData({
                        imgUrl: res.tempFilePaths
                    })

                    wx.navigateTo({
                        url: '../page-main/avatar-frame?imgUrl=' + this.data.imgUrl,
                    })
                })
                break

            case 'selectFromAvatar': // 获取用户头像
                wx.getUserProfile({
                    desc: "获取用户头像"
                }).then(res => {
                    this.setData({
                        imgUrl: res.userInfo.avatarUrl.substr(0, res.userInfo.avatarUrl.length - 3) + '0' // 这种写法很垃圾……但我想偷懒qwq
                    })

                    wx.navigateTo({
                        url: '../page-main/avatar-frame?imgUrl=' + this.data.imgUrl,
                    })
                })
                break
        }
    }
})