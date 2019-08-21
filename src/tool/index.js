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

    /**
     * 复制
     * @param {*} url 
     */
    gloablCopy(msg, type) {
        const ENV = this.getEnv();
        if (ENV === 'weapp') {
            this.wxCopyData(msg);
        } else if (ENV === 'h5') {
            if (type === 'url') {
                window.location.href = msg;
            } else if (type === 'email') {
                alert(msg);
            }
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