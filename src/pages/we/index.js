import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import HomeFoot from '../../components/homefoot/index';
import Avatar from '../../img/avatar.jpg';
import Tool from '../../tool/index';
import './index.scss';

export default class Index extends Component {
    state = {
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
                <HomeFoot current={1} />
            </View>
        )
    }
}
