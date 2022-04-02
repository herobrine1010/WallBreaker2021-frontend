// pages/avatar-frame/cute-style-button.ts

import {CutePalmAsset} from './palm-base64'

Component({
    /**
     * Component properties
     */
    properties: {
        bgcolor: {
            type: String,
            value: '#517BBC'
        },
        cuteBtnHeight: {
            type: String,
            value: '120rpx'
        },
        cuteBtnWidth: {
            type: String,
            value: '480rpx'
        },
        cuteBtnFontSize: {
            type: String,
            value: '26px'
        }
    },

    /**
     * Component initial data
     */
    data: {
        palmBase64: CutePalmAsset.palm
    },

    /**
     * Component methods
     */
    methods: {

    }
})
