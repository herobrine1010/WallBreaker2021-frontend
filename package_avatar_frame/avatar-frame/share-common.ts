
export class AvatarFrameShareInfo {
    public static data = {
        title: '济星云樱花头像',
        path: getApp().getSharedUrl({}, 'pages/avatar-frame-launcher/avatar-frame-launcher'),
        imageUrl: '/package_avatar_frame/avatar-frame/resources/share-img.jpg',
        success: (res) => {
            wx.showToast({
                title: '分享成功',
                icon: 'success'
            })
        },
        fail: (res) => {
            wx.showToast({
                title: '分享失败',
                icon: 'error'
            })
        }
    }
}