import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClSwiper } from "mp-colorui";


/**
 * 首页tab
 */
export default class Index extends Taro.Component {
    constructor() {
        super(...arguments)
    }

    render() {
        return (
            <View>
                <ClSwiper type='card' list={this.props.list} circular />
            </View>
        )
    }
}

Index.defaultProps = {
    list: []
}