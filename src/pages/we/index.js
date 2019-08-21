import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar, AtGrid, AtModal } from 'taro-ui'
import HomeFoot from '../../components/homefoot/index';
import Avatar from '../../img/avatar.jpg';
import GitHubIcon from '../../img/GitHub.svg';
import EmailIcon from '../../img/email.svg';
import ShengIcon from '../../img/sheng.svg';
import WebiIcon from '../../img/webicon.svg';
import Tool from '../../tool/index';
import './index.scss';

export default class Index extends Component {
    state = {
        isOpened: false,
        modTip: ''
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
        if (index === 0) {
            Tool.gloablCopy('https://github.com/508lab', 'url');
        } else if (index === 1) {
            Tool.gloablCopy('https://508lab.github.io', 'url');
        } else if (index === 2) {
            this.setState({
                modTip: '本项目仅用于学习\n\r请勿用于商业用途，请勿滥用，后果自负\n\r如有侵权请立即联系本人删除。'
            }, () => {
                this.showModal();
            })
        } else {
            Tool.gloablCopy('2833324528@qq.com', 'email');
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

    render() {
        return (
            <View className="index">
                <View className="top"><AtAvatar image={Avatar} size="large" circle={true}></AtAvatar></View>
                <View className='at-article__h1 desc'>
                    508工作室
                </View>
                <View className='at-article__h3 desc'>指导老师：张婷娟 张惠春 王梅艳</View>
                <View className='at-article__p'>
                    If you wish to succeed, you should use persistence as your good friend, experience as your reference, prudence as your brother and hope as your sentry.
                </View>
                <AtGrid onClick={this.onClick} data={
                    [
                        {
                            image: GitHubIcon,
                            value: 'GitHub'
                        },
                        {
                            image: WebiIcon,
                            value: '网站'
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
            </View>
        )
    }
}
