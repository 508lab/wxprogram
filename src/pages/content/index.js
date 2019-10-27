import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtModal, AtList, AtListItem, AtLoadMore, AtToast } from 'taro-ui'
import Tool from '../../tool/index';
import './index.scss';

export default class Index extends Component {
    state = {
        isOpened: false,
        from: 0,
        data: [],
        isOpenedLoading: false,
        nowData: null,
        status: 'more',
        type: '',
        tipMsg: '复制链接', //不同的平台提示信息不同
    }
    config = {
        navigationBarTitleText: '结果页'
    }

    constructor() {
        super(...arguments);
    }

    componentWillMount = () => {
        this.initView();
        //如果是微信设置可分享
        if (Tool.getEnv() === 'weapp') {
            wx.showShareMenu({
                withShareTicket: true
            });
        }

        if (Tool.getEnv() === 'h5') {
            this.setState({
                tipMsg: '跳转'
            })
        }
    }

    initView = () => {
        let type = this.$router.params.type;
        let q = this.$router.params.q;
        if (type) {
            this.setState({
                type: type
            })
            this.setData(type);
        } else if (q) {
            this.search(q);
        }
    }

    search = (q) => {
        this.setState({
            isOpenedLoading: true
        })
        Tool.httpRequestGeN(`/warehouse/search/${q}`, (data) => {
            this.setState({
                data: data.data,
                status: 'noMore',
                isOpenedLoading: false
            })
        })
    }

    listClick = (data) => {
        this.setState({
            isOpened: true,
            nowData: data,
            title: data.t
        })
    }

    setData = (type) => {
        this.setState({
            isOpenedLoading: true
        })
        if (type === '每周推荐') {
            Tool.httpRequestGeN(`/warehouse`, (data) => {
                this.setState({
                    data: data.data,
                    isOpenedLoading: false
                })
            })
        } else {
            Tool.httpRequestGeN(`/warehouse/${type}/${this.state.from}/20`, (data) => {
                this.setState({
                    data: data.data,
                    isOpenedLoading: false
                })
            })
        }
    }

    componentDidMount = () => {
        this.setState({
            isOpened: false
        })
    }

    handleCancel = () => {
        this.setState({
            isOpened: false
        })
    }

    handleConfirm = () => {
        Tool.gloablCopy(this.state.nowData.l, 'url');
        this.setState({
            isOpened: false
        })
    }


    loadingMore = () => {
        this.setState({
            from: this.state.from + 20
        }, () => {
            this.setState({
                status: 'loading'
            })
            Tool.httpRequestGeN(`/warehouse/${this.state.type}/${this.state.from}/20`, (data) => {
                if (data.data.length) {
                    this.setState({
                        data: this.state.data.concat(data.data),
                        status: 'more'
                    })
                } else {
                    this.setState({
                        status: 'noMore'
                    })
                }
            })
        })
    }

    render() {
        let viewData = this.state.data.map((e, i) => {
            let ele = JSON.parse(e);
            return <AtListItem title={ele.t} key={i} onClick={this.listClick.bind(this, ele)} />
        })
        return (
            <View className='index'>
                <AtModal
                    isOpened={this.state.isOpened}
                    title='内容'
                    cancelText='取消'
                    confirmText={this.state.tipMsg}
                    onClose={this.handleClose}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content={this.state.title}
                />
                <AtList>
                    {viewData}
                </AtList>
                <AtLoadMore
                    onClick={this.loadingMore.bind(this)}
                    status={this.state.status}
                />
                <AtToast isOpened={this.state.isOpenedLoading} text="加载中" status="loading"></AtToast>
            </View>
        )
    }
}
