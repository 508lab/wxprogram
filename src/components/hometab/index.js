import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'


const ListData = [
    { name: '前端' },
    { name: '后端' },
    { name: 'Android' },
    { name: '大数据' },
    { name: '运维' },
    { name: 'api文档' },
    { name: '平台与工具' },
    { name: '插件库' },
    { name: '网络安全' },
    { name: '日常办公' },
    { name: '大佬们的博客' },
    { name: '设计相关' },
    { name: '爬虫' },
    { name: '一些好看的效果' },
    { name: 'ai' },
    { name: '其他' },
]

/**
 * 首页tab
 */
export default class Index extends Taro.Component {
    constructor() {
        super(...arguments)
        this.state = {
        }
    }
    handleClick = (value) => {
        Taro.navigateTo({
            url: '../content/index?type=' + value
        })
    }

    render() {
        let ViewData = ListData.map((e, i) => {
            return <AtButton type="primary" key={i} onClick={this.handleClick.bind(this, e.name)}>{e.name}</AtButton>
        })
        return (
            <View>
                {ViewData}
            </View>
        )
    }
}

Index.defaultProps = {
    data: []
}