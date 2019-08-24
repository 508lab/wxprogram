import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtModal } from 'taro-ui'
import HomeList from '../homelist/index';
import Tool from '../../tool/index';

/**
 * 数据
 */
import fontData from '../../data/front';
import aiData from '../../data/ai';
import apiData from '../../data/api';
import awesomeData from '../../data/awesome';
import backendData from '../../data/backend';
import bigdataData from '../../data/bigdata';
import crawlerData from '../../data/crawler';
import designData from '../../data/design';
import effectData from '../../data/effect';
import operationsData from '../../data/operations';
import platformData from '../../data/platform';
import securityData from '../../data/security';
import PlugData from '../../data/plug';
import OfficeData from '../../data/office';
import BossesData from '../../data/bosses';

const ListData = [
    { data: fontData.reverse(), name: '前端' },
    { data: backendData.reverse(), name: '后端' },
    { data: bigdataData.reverse(), name: '大数据' },
    { data: operationsData.reverse(), name: '运维' },
    { data: apiData.reverse(), name: 'api文档' },
    { data: platformData.reverse(), name: '平台与工具' },
    { data: PlugData.reverse(), name: '插件库' },
    { data: securityData.reverse(), name: '网络安全' },
    { data: OfficeData.reverse(), name: '日常办公' },
    { data: BossesData.reverse(), name: '大佬们的博客' },
    { data: designData.reverse(), name: '设计相关' },
    { data: crawlerData.reverse(), name: '爬虫' },
    { data: effectData.reverse(), name: '一些好看的效果' },
    { data: aiData.reverse(), name: 'ai' },
    { data: awesomeData.reverse(), name: '其他' },
]


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
            tabList: [

            ]
        }
    }
    handleClick(value) {
        this.setState({
            current: value
        })
    }

    listClick = (data) => {
        this.setState({
            isOpened: true,
            nowData: data,
            title: data.t
        })
    }

    componentWillMount = () => {
        if (Tool.getEnv() === 'h5') {
            this.setState({
                tipMsg: '跳转'
            })
        }
        this.setState({
            tabList: ListData.map((e) => {
                return { title: e.name };
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
        let viewData = ListData.map((e, i) => {
            return <AtTabsPane current={this.state.current} index={i} key={i}>
                <View style='font-size:18px;text-align:center;height:100px;'>
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