/**
 * 头像框制作工具页面。
 * 
 * 2051565 龚天遥
 * 2022年3月21日创建
 * 上海市嘉定区
 */

import { request } from "../../request/request";
import {WxCanvasPlus} from "../../utils/WxCanvasPlus"

// pages/avatar-frame/avatar-frame.ts
Page({

    /**
     * Page initial data
     */
    data: {
        canvas: null, // WxCanvasPlus 对象
        avatarImg: null, // 头像图对象
        avatarImgWidth: 0,
        avatarImgHeight: 0,
        avatarImgLeftOffset: 0,
        avatarImgTopOffset: 0,
        frameImg: null, // 头像框对象

        /**
         * 头像框候选。
         * 每元素结构如下：
         * {
         *   src: "https://..."
         * }
         */
        frameCandidates: [],

        /**
         * 上一次的 canvas 触控信息。
         */
        prevCanvasTouches: []
    },

    redrawAvatarAndFrame() {
        this.data.canvas.clear()
        
        const canvasHeight = this.data.canvas.getCanvas().height
        const canvasWidth = this.data.canvas.getCanvas().width
        this.data.canvas.getContext().drawImage(
            this.data.avatarImg, this.data.avatarImgLeftOffset,
            this.data.avatarImgTopOffset, this.data.avatarImgWidth, this.data.avatarImgHeight
        )
        this.data.canvas.getContext().drawImage(this.data.frameImg, 0, 0, canvasWidth, canvasHeight)
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad() {
        /** 获取头像框。 */
        wx.request({
            url: 'https://www.gardilily.com/wallbreakertest/avatarframe/getFrames.php',
            success: (res) => {
                if (res.statusCode == 200) {
                    let data = res.data.data
                    let arr: Array<object> = []
                    for (let it of data) {
                        arr.push({
                            src: it
                        })
                    }

                    this.setData({
                        frameCandidates: arr
                    })
                }
            }
        })

        this.data.canvas = new WxCanvasPlus('#avatar-frame-canvas', () => {
            this.data.avatarImg = this.data.canvas.getCanvas().createImage()
            this.data.frameImg = this.data.canvas.getCanvas().createImage()
            this.data.frameImg.onload = () => {
                this.redrawAvatarAndFrame()
            }
        })
    },


    /**
     * Lifecycle function--Called when page show
     */
    onShow() {

    },


    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {

    },

    /**
     * 页面按钮触控事件处理。
     * 按钮id放置于 data-btnid 中。
     */
    btnClickHandler(event: any) {
        const btnid = event.currentTarget.dataset.btnid
        switch (btnid) {
            case 'selectFromCamOrAlbum': // 从相机或相册选择
                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['camera', 'album'],

                }).then(res => {
                    this.data.avatarImg.src = res.tempFilePaths
                    this.data.avatarImg.onload = () => {
                        let imgW = this.data.avatarImg.width
                        let imgH = this.data.avatarImg.height
                        let aspectRatio = imgW / imgH
                        let canvasL = this.data.canvas.getWidth()
                        if (imgW < imgH) {
                            imgW = canvasL
                            imgH = imgW / aspectRatio
                            this.data.avatarImgTopOffset = -(imgH - canvasL) / 2
                        } else {
                            imgH = canvasL
                            imgW = imgH * aspectRatio
                            this.data.avatarImgLeftOffset = -(imgW - canvasL) / 2
                        }
                        this.data.avatarImgWidth = imgW
                        this.data.avatarImgHeight = imgH
                        this.redrawAvatarAndFrame()
                    }
                })
                break

            case 'selectFromAvatar': // 获取用户头像
                wx.getUserProfile({
                    desc: "获取用户头像"
                }).then(res => {
                    this.data.avatarImg.src = res.userInfo.avatarUrl
                    this.data.avatarImg.onload = () => {
                        this.redrawAvatarAndFrame()
                    }
                    this.data.avatarImgLeftOffset = 0
                    this.data.avatarImgTopOffset = 0
                    this.data.avatarImgHeight = this.data.canvas.getHeight()
                    this.data.avatarImgWidth = this.data.canvas.getWidth()
                })
                break

            case 'saveImg': // 保存图片
                wx.canvasToTempFilePath({
                    canvas: this.data.canvas.getCanvas()
                }).then(res => {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath
                    }).then(res => {

                    })
                })

                break
        }
    },

    /**
     * 头像框图被选中后自动调用。
     * 图片src应该设置到 data-imgsrc 中。
     */
    onImageSelect(event: any) {
        const src = event.currentTarget.dataset.imgsrc
        this.data.frameImg.src = src
    },

    /**
     * 画板触控事件处理回调。
     */
    canvasTouchHandler(event: any) {
        //console.log("event in:")
        //console.log(event)

        /**
         * 处理触控信息。
         * 我们假设之前已经有触控记录了。只需要从之前的触控记录里寻找1或2条，完成相关计算。
         */
        const processTouches = (prevTouches: Array<object>, currTouches: Array<object>) => {
            if (currTouches.length == 1) {
                // 单指操作，仅拖动。
                let prev = {
                    x: prevTouches[0].x,
                    y: prevTouches[0].y
                }
                let curr = {
                    x: currTouches[0].x,
                    y: currTouches[0].y
                }

                this.data.avatarImgLeftOffset += curr.x - prev.x
                this.data.avatarImgTopOffset += curr.y - prev.y
            } else if (currTouches.length >= 2) {
                // 双指操作，拖动并缩放。
                let prevF1 = {
                    x: prevTouches[0].x,
                    y: prevTouches[0].y
                }
                let prevF2 = {
                    x: prevTouches[1].x,
                    y: prevTouches[1].y
                }
                let currF1 = {
                    x: currTouches[0].x,
                    y: currTouches[0].y
                }
                let currF2 = {
                    x: currTouches[1].x,
                    y: currTouches[1].y
                }

                let deltaF1 = {
                    x: currF1.x - prevF1.x,
                    y: currF1.y - prevF1.y
                }

                let deltaF2 = {
                    x: currF2.x - prevF2.x,
                    y: currF2.y - prevF2.y
                }

                let prevDist = Math.sqrt(Math.pow(prevF1.x - prevF2.x, 2) + Math.pow(prevF1.y - prevF2.y, 2))
                let currDist = Math.sqrt(Math.pow(currF1.x - currF2.x, 2) + Math.pow(currF1.y - currF2.y, 2))

                let zoomRatio = currDist / prevDist
                
                if (prevDist <= 0.2 * this.data.canvas.getWidth() || currDist <= 0.2 * this.data.canvas.getWidth()) {
                    zoomRatio = 1
                }

                let leftShrink = this.data.avatarImgWidth * (1 - zoomRatio) / 2
                let topShrink = this.data.avatarImgHeight * (1 - zoomRatio) / 2

                this.data.avatarImgHeight *= zoomRatio
                this.data.avatarImgWidth *= zoomRatio

                this.data.avatarImgLeftOffset += (deltaF1.x + deltaF2.x) / 2 + leftShrink
                this.data.avatarImgTopOffset += (deltaF1.y + deltaF2.y) / 2 + topShrink
                
            }
        }

        // 先对触控种类做识别。
        switch (event.type) {
            case 'touchmove':
                processTouches(this.data.prevCanvasTouches, event.touches)
                this.data.prevCanvasTouches = event.touches
                this.redrawAvatarAndFrame()
                break
            case 'touchstart':
                for (let it of event.changedTouches) {
                    console.log(it)
                    this.data.prevCanvasTouches.push(it)
                }
                break
            case 'touchend':
                // 从历史记录中删除项目。
                for (let it of event.changedTouches) {
                    for (let i = 0; i < this.data.prevCanvasTouches.length; i++) {
                        if (this.data.prevCanvasTouches[i].identifier == it.identifier) {
                            this.data.prevCanvasTouches.splice(i, 1)
                            break
                        }       
                    }
                }
                break
        }

    }
})
