import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from "taro-ui"
import './index.scss';
export default class Index extends Taro.Component {
    constructor() {
        super(...arguments)

    }

    render() {
        return (
            <View className="index">
                <AtCard
                    note="end"
                    title='中国首个开源 HTML5 跨屏前端框架'
                >
                    个人评价还是可以
                </AtCard>
            </View>
        )
    }
}