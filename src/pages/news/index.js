import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTag, AtButton } from 'taro-ui';
import HomeFoot from '../../components/homefoot/index';
import Tool from '../../tool/index';
import './index.scss';

export default class Index extends Component {
    state = {
        value: '',
        showTip: '复制链接',
        data: []
    }
    config = {
        navigationBarTitleText: '新闻'
    }

    constructor() {
        super(...arguments);
    }

    componentWillMount = () => {
        //如果是微信设置可分享
        if (Tool.getEnv() === 'weapp') {
            wx.showShareMenu({
                withShareTicket: true
            });
        }

        this.getNews();
    }

    getNews = () => {
        Tool.httpRequestGeN(`/news`, (data) => {
            this.setState({
                data: data.data
            })
        })
    }

    handleClick = (url) => {
        Tool.gloablCopy(url, 'url');
    }


    render() {
        let dom = this.state.data.map((ele, index) => {
            let obj = JSON.parse(ele);
            let tags = obj.d.split(',');
            let tagsView = tags.map(function (tagE, k) {
                return <AtTag type='primary' circle active={true} size='small' key={k}>{tagE}</AtTag>
            })
            return <View className="item" key={index}>
                <View className='at-row'>
                    <View className='at-col at-col-8' onClick={this.handleClick.bind(this, obj.l)}>{obj.t}</View>
                    <View className='at-col at-col-4'>
                        <AtTag type='secondary' circle active={true}>{obj.s}</AtTag>
                    </View>
                </View>

                <View className='at-row bottom'>
                    <View className='at-col at-col-12'>
                        <View className="tags">
                            {tagsView}
                        </View>
                    </View>
                </View>
                <View className="seg"></View>
            </View>
        })
        return (
            <View className='index' >
                {dom}
                < HomeFoot current={1} />
            </View>
        )
    }
}
