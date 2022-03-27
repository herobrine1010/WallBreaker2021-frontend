/**
 * WeChat Canvas Plus
 * 
 * 2051565 龚天遥
 * 2022年3月21日 创建
 * 上海市嘉定区
 */

export class WxCanvasPlus {
    private canvasSelector = ''
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D    
    private canvasReady = false
    constructor(cssSelector: string, callable: ()=>void = ()=>{}) {
        wx.createSelectorQuery()
            .select(cssSelector)
            .fields({ node: true, size: true} )
            .exec((res) => {
                this.canvas = res[0].node
                this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
                this.canvas.width = res[0].width
                this.canvas.height = res[0].height
                this.context.scale(1, 1)

                this.canvasSelector = cssSelector
                this.canvasReady = true

                callable()
            })
    }

    /**
     * 获知 Canvas 是否准备完毕。
     */
    isReady(): boolean {
        return this.canvasReady
    }

    getContext(): CanvasRenderingContext2D {
        return this.context
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas
    }

    getHeight(): number {
        return this.canvas.height
    }

    getWidth(): number {
        return this.canvas.width
    }

    /**
     * 清空画布。
     */
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
