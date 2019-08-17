import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtModal, AtMessage } from 'taro-ui'
import HomeList from '../homelist/index';
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

export default class Index extends Taro.Component {
    constructor() {
        super(...arguments)
        this.state = {
            current: 0,
            isOpened: false,
            nowData: null,
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
        wx.setClipboardData({
            data: this.state.nowData.l,
            success: (res) => {
                Taro.atMessage({
                    'message': '复制成功',
                    'type': 'success',
                })
            }
        })
    }


    render() {
        return (
            <View>
                <AtModal
                    isOpened={this.state.isOpened}
                    title='内容'
                    cancelText='取消'
                    confirmText='复制'
                    onClose={this.handleClose}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content={this.state.title}
                />

                <AtTabs
                    current={this.state.current}
                    scroll
                    tabList={[
                        { title: '前端' },
                        { title: '后端' },
                        { title: '大数据' },
                        { title: '运维' },
                        { title: '爬虫' },
                        { title: '网络安全' },
                        { title: '人工智能' },
                        { title: 'API文档' },
                        { title: '3D' },
                        { title: '平台与工具' },
                        { title: '设计相关' },
                        { title: '其他' },
                    ]}
                    onClick={this.handleClick.bind(this)}>
                    <AtTabsPane current={this.state.current} index={0}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={fontData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={1}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={backendData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={2}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={bigdataData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={3}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={operationsData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={4}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={crawlerData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={5}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={securityData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={6}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={aiData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={7}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={apiData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={8}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={effectData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={9}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={platformData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={10}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={designData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={11}>
                        <View style='font-size:18px;text-align:center;height:100px;'>
                            <HomeList data={awesomeData} listClick={this.listClick} />
                        </View>
                    </AtTabsPane>
                </AtTabs>
            </View>
        )
    }
}