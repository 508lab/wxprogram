import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtModal } from 'taro-ui'
import HomeList from '../homelist/index';
import Tool from '../../tool/index';

/**
 * 首页tab
 */
export default class Index extends Taro.Component {
    constructor() {
        super(...arguments)
        this.state = {
            current: 0,
            isOpened: false,
            nowData: null,
            tipMsg: '复制', //不同的平台提示信息不同
            status: 'more',
            tabList: [

            ],
            data: [],
        }
    }
    handleClick(value) {
        this.setState({
            current: value,
            status: 'more'
        })
    }

    listClick = (data) => {
        this.setState({
            isOpened: true,
            nowData: data,
            title: data.t
        })
    }

    /**
     * 加载更多
     */
    loadingMore = (name) => {

    }


    componentWillMount = () => {
        if (Tool.getEnv() === 'h5') {
            this.setState({
                tipMsg: '跳转'
            })
        }
        this.setState({
            data: this.props.data
        }, () => {
            this.setState({
                tabList: this.state.data.map((e) => {
                    return { title: e.name };
                })
            })

        })
    }
    handleCancel = () => {
        this.setState({
            isOpened: false
        })
    }
    handleClose = () => {
        this.setState({
            isOpened: false
        })
    }
    handleConfirm = () => {
        this.setState({
            isOpened: false
        })
        Tool.gloablCopy(this.state.nowData.l, 'url');
    }


    render() {
        let viewData = this.state.data.map((e, i) => {
            return <AtTabsPane current={this.state.current} index={i} key={i}>
                <View style='font-size:18px;text-align:center;height:100px;margin-bottom: 60px;'>
                    <HomeList data={e.data} listClick={this.listClick} />
                </View>
            </AtTabsPane>
        })


        return (
            <View>
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

                <AtTabs
                    current={this.state.current}
                    scroll
                    tabList={this.state.tabList}
                    onClick={this.handleClick.bind(this)}>
                    {viewData}
                </AtTabs>
            </View>
        )
    }
}