import Taro from '@tarojs/taro';
let _Tool = null;
const APIURL = 'https://api.dongkji.com/api/v1/api';
// const APIURL = 'http://localhost:8080/v1/api';

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


    /**
     * get请求 不含token
     * @param {*} urlPath 路径
     * @param {*} callback 回调
     */
    httpRequestGeN(urlPath, callback) {
        wx.request({
            url: APIURL + urlPath,
            method: 'GET',
            success(data) {
                if (data.data.status == 200) {
                    callback(data.data)
                } else {
                    wx.showToast({
                        title: '服务器!',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail() {
                wx.showToast({
                    title: '网络异常!',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    }

}

function getInstance() {
    if (!_Tool) {
        _Tool = new Tool();
    }
    return _Tool;
}

export default getInstance();