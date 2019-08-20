import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import './index.scss';
/**
 * 首页列表组件
 */
export default class Index extends Taro.Component {
    state = {
        datasource: [],

    }
    constructor() {
        super(...arguments)
        this.setState({
            datasource: this.props.data
        })
    }

    render() {
        let viewData = this.state.datasource.map((e, i) => {
            return <AtListItem title={e.t} key={i} onClick={this.props.listClick.bind(this, e)} />
        })

        return (
            <View class="indexview">
                <AtList>
                    {viewData}
                </AtList>
            </View>
        )
    }
}