/**
 * 头像框制作工具 欢迎页。
 * 
 * 2051565 龚天遥
 * 2022年3月27日创建
 * 上海市嘉定区
 */

// pages/avatar-frame/welcome.ts

import {AvatarFrameSharedAssets} from '../resources/assets-base64'
import {AvatarFrameShareInfo} from '../share-common'

Page({

    /**
     * Page initial data
     */
    data: {
        backgroundBase64: AvatarFrameSharedAssets.welcomeBackground,
        enterBtnBase64: AvatarFrameSharedAssets.welcomeEnterButton,
        logoBase64: AvatarFrameSharedAssets.logos
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {
        return AvatarFrameShareInfo.data
    },

    btnEnter() {
        wx.navigateTo({
            url: '../page-select-backimg/select-back-img'
        })
    }
})