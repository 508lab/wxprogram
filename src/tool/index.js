import Taro from '@tarojs/taro';
let _Tool = null;

class Tool {

    /**
     * 获取当前环境
     */
    getEnv() {
        return process.env.TARO_ENV;
    }

    wxCopyData(msg) {
        wx.setClipboardData({
            data: msg,
            success: (res) => {
                Taro.atMessage({
                    'message': '复制成功',
                    'type': 'success',
                })
            }
        })
    }

    modalHandler(data) {
        const ENV = this.getEnv();
        if (ENV === 'weapp') {
            this.wxCopyData(data.l);
        }else if (ENV === 'H5') {
            window.location.href = data.l;
        }
    }

}

function getInstance() {
    if (!_Tool) {
        _Tool = new Tool();
    }
    return _Tool;
}

export default getInstance();