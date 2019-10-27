import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTag, AtLoadMore, AtToast, AtSearchBar } from 'taro-ui';
import HomeFoot from '../../components/homefoot/index';
import Tool from '../../tool/index';
import './index.scss';
const size = 5;

export default class Index extends Component {
    state = {
        searchQ: '',
        value: '',
        showTip: '复制链接',
        data: [],
        status: 'more',
        scrollid: null,
        isOpenedLoading: false,
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
        this.setState({
            isOpenedLoading: true,
        })
        Tool.httpRequestGeN(`/news`, (data) => {
            this.setState({
                data: data.data,
                scrollid: data.scrollid,
                isOpenedLoading: false
            })
        })
    }

    handleClick = (url) => {
        Tool.gloablCopy(url, 'url');
    }


    loadingMore = () => {
        this.setState({
            isOpenedLoading: true,
        })
        Tool.httpRequestGeN(`/news/scroll/${this.state.scrollid}`, (data) => {
            let oldData = this.state.data;
            this.setState({
                data: oldData.concat(data.data),
                scrollid: data.scrollid,
                isOpenedLoading: false
            });
            if (data.data.lenght !== size) {
                this.setState({
                    status: 'noMore'
                })
            }
        })
    }

    searchClick = (value) => {
        this.setState({
            searchQ: value
        });
    }

    onActionClick = () => {
        this.setState({
            isOpenedLoading: true
        })
        if (this.state.searchQ) {
            Tool.httpRequestGeN(`/news/search/${this.state.searchQ}`, (data) => {
                this.setState({
                    data: data.data,
                    isOpenedLoading: false
                })
            })
        }
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
                <AtSearchBar
                    value={this.state.searchQ}
                    onChange={this.searchClick.bind(this)}
                    onActionClick={this.onActionClick}
                />
                {dom}
                <AtLoadMore
                    onClick={this.loadingMore.bind(this)}
                    status={this.state.status}
                />
                < HomeFoot current={1} />
                <AtToast isOpened={this.state.isOpenedLoading} text="加载中" status="loading"></AtToast>
            </View>
        )
    }
}
