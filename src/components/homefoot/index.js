import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
/**
 * 首页底部组件
 */
export default class Index extends Taro.Component {

    constructor() {
        super(...arguments);
    }

    handleClick(value) {
        let url = '';
        if (value === 0) {
            url = '../index/index';
        } else if (value === 1) {
            url = '../we/index';
        }
        Taro.redirectTo({
            url: url
        });
    }

    render() {
        return (
            <View>
                <AtTabBar
                    fixed
                    tabList={[
                        { title: '首页', iconType: 'home' },
                        { title: '我们', iconType: 'user' }
                    ]}
                    onClick={this.handleClick.bind(this)}
                    current={this.props.current}
                />
            </View>
        )
    }
}