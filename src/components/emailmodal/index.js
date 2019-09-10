import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput } from 'taro-ui'
/**
 * 首页底部组件
 */
export default class Index extends Taro.Component {

    constructor() {
        super(...arguments);
        this.setState({
            value: ''
        })
    }

    handleChange = (value) => {
        this.setState({
            value: value
        })
    }

    render() {
        return (
            <View>
                <AtModal isOpened={this.props.isOpened}>
                    <AtModalHeader>标题</AtModalHeader>
                    <AtModalContent>
                        <AtInput
                            name='email'
                            type='text'
                            placeholder='请填写常用邮箱'
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        />
                    </AtModalContent>
                    <AtModalAction> <Button onClick={this.props.handleClose}>取消</Button> <Button
                        onClick={this.props.handleConfirm.bind(this, this.state.value)}>确定</Button> </AtModalAction>
                </AtModal>
            </View>
        )
    }
}

Index.defaultProps = {
    isOpened: false
}