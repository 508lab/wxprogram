import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import HomeList from '../homelist/index';

export default class Index extends Taro.Component {
    constructor() {
        super(...arguments)
        this.state = {
            current: 0,
        }
    }
    handleClick(value) {
        this.setState({
            current: value
        })
    }
    render() {
        return (
            <AtTabs
                current={this.state.current}
                scroll
                tabList={[
                    { title: '推荐' },
                    { title: '后端' },
                    { title: '前端' },
                    { title: '大数据' },
                    { title: '运维' },
                    { title: '爬虫' },
                    { title: '网络安全' },
                    { title: '人工智能' },
                    { title: 'API文档' },
                    { title: '3D' },
                    { title: '其他' },
                ]}
                onClick={this.handleClick.bind(this)}>
                <AtTabsPane current={this.state.current} index={0}>
                    <View style='font-size:18px;text-align:center;height:100px;'>
                        <HomeList />
                    </View>
                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={1}>
                    <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={2}>
                    <View style='font-size:18px;text-align:center;height:100px;'>标签页三的内容</View>
                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={3}>
                    <View style='font-size:18px;text-align:center;height:100px;'>标签页四的内容</View>
                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={4}>
                    <View style='font-size:18px;text-align:center;height:100px;'>标签页五的内容</View>
                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={5}>
                    <View style='font-size:18px;text-align:center;height:100px;'>标签页六的内容</View>
                </AtTabsPane>
            </AtTabs>
        )
    }
}