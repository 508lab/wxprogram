import Taro from '@tarojs/taro';
let _Tool = null;
const APIURL = 'https://api.dongkji.com/api/v1/api';
// const APIURL = 'http://127.0.0.1:8080/v1/api';



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
        Taro.request({
            url: APIURL + urlPath,
            method: 'GET',
            success(data) {
                callback(data.data)
            },
        })
    }

    httpRequestPoN(urlPath, data, callback) {
        Taro.request({
            url: APIURL + urlPath,
            method: 'POST',
            header: {
                "content-type": "application/json",
            },
            data: JSON.stringify(data),
            success(data) {
                callback(data.data)
            },
            fail(err) {
                console.log(err);
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