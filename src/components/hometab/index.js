import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'


const ListData = [
    { value: '每周推荐' },
    { value: '前端' },
    { value: '后端' },
    { value: 'Android' },
    { value: '大数据' },
    { value: '运维' },
    { value: 'api文档' },
    { value: '平台与工具' },
    { value: '插件库' },
    { value: '网络安全' },
    { value: '日常办公' },
    { value: '大佬们的博客' },
    { value: '设计相关' },
    { value: '爬虫' },
    { value: '一些好看的效果' },
    { value: 'ai' },
    { value: '其他' },
]

/**
 * 首页tab
 */
export default class Index extends Taro.Component {
    constructor() {
        super(...arguments)
        this.state = {
            data: ListData
        }
    }
    handleClick = (item) => {
        Taro.navigateTo({
            url: '../content/index?type=' + item.value
        })
    }
    render() {
        return (
            <View>
                <AtGrid mode='rect' data={this.state.data} onClick={this.handleClick} />
            </View>
        )
    }
}

Index.defaultProps = {
    data: []
}