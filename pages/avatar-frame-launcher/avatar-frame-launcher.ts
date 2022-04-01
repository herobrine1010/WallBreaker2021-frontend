// pages/avatar-frame-launcher/avatar-frame-launcher.ts
Page({

    /**
     * Page initial data
     */
    data: {

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad() {
        wx.redirectTo({
            url: '/package_avatar_frame/avatar-frame/page-welcome/welcome'
        })
    }

})