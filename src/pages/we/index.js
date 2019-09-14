import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar, AtGrid, AtModal, AtMessage } from 'taro-ui'
import HomeFoot from '../../components/homefoot/index';
import EmailCom from '../../components/emailmodal';
import GitHubIcon from '../../img/GitHub.svg';
import EmailIcon from '../../img/email.svg';
import ShengIcon from '../../img/sheng.svg';
import MirrorIcon from '../../img/mirror.svg';
import Subscribe from '../../img/subscribe.svg';
import Tool from '../../tool/index';
import './index.scss';

export default class Index extends Component {
    state = {
        isOpened: false,
        modTip: '',
        emailShow: false
    }
    config = {
        navigationBarTitleText: '关于我们'
    }

    componentWillMount = () => {
        //如果是微信设置可分享
        if (Tool.getEnv() === 'weapp') {
            wx.showShareMenu({
                withShareTicket: true
            });
        }
    }

    onClick = (item, index) => {
        const name = item.value;
        if (name === 'GitHub') {
            Tool.gloablCopy('https://github.com/508lab', 'url');
        } else if (name === '声明') {
            this.setState({
                modTip: '本项目仅用于学习\n\r请勿用于商业用途，请勿滥用，后果自负。\n\r如有侵权请立即联系本人删除。'
            }, () => {
                this.showModal();
            })
        } else if (name === '联系我们') {
            Tool.gloablCopy('2833324528@qq.com', 'email');
        } else if (name === '内部仓库') {
            Tool.gloablCopy('http://uname.dongkji.com', 'url');
        } else if (name === "订阅") {
            this.setState({
                emailShow: true
            })
        }
    }

    showModal = () => {
        this.setState({
            isOpened: true
        })
    }

    handleConfirm = () => {
        this.setState({
            isOpened: false
        })
    }

    handleClose = () => {
        this.setState({
            isOpened: false
        })
    }

    /**
     * 关闭邮箱modal
     */
    emailModalC = () => {
        this.setState({
            emailShow: false
        })
    }

    emailModalOk = (email) => {
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (!mailReg.test(email)) {
            Taro.atMessage({
                'message': '请输入正确的邮箱格式',
                'type': "error",
            })
        } else {
            Tool.httpRequestPoN('/subscribe', { email: email }, (data) => {
                if (data.status === 200) {
                    Taro.atMessage({
                        'message': '订阅成功!',
                        'type': "success",
                    })
                } if (data.status === 500) {
                    Taro.atMessage({
                        'message': '该邮箱已订阅!',
                        'type': "error",
                    })
                }
            });
        }
        this.setState({
            emailShow: false
        })
    }

    render() {
        return (
            <View className="index">
                <View className="top"><AtAvatar image="https://avatars0.githubusercontent.com/u/49094696?s=200&v=4" size="large" circle={true}></AtAvatar></View>
                <View className='at-article__h1 desc'>
                    508工作室
                </View>
                <View className='at-article__p'>
                    If you wish to succeed, you should use persistence as your good friend, experience as your reference, prudence as your brother and hope as your sentry.
                </View>
                <AtGrid onClick={this.onClick} data={
                    [
                        {
                            image: Subscribe,
                            value: '订阅'
                        },
                        {
                            image: GitHubIcon,
                            value: 'GitHub'
                        },
                        {
                            image: MirrorIcon,
                            value: '内部仓库'
                        },
                        {
                            image: ShengIcon,
                            value: '声明'
                        },
                        {
                            image: EmailIcon,
                            value: '联系我们'
                        }
                    ]
                } />
                <HomeFoot current={1} />

                <AtModal
                    isOpened={this.state.isOpened}
                    title='声明'
                    confirmText='确认'
                    onClose={this.handleClose}
                    onConfirm={this.handleConfirm}
                    content={this.state.modTip}
                />
                <EmailCom isOpened={this.state.emailShow} handleClose={this.emailModalC}
                    handleConfirm={this.emailModalOk} />
                <AtMessage />
            </View>
        )
    }
}
