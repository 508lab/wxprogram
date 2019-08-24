import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNoticebar, AtModal } from 'taro-ui'
import HomeTab from '../../components/hometab';
import HomeFoot from '../../components/homefoot/index';
import Tool from '../../tool/index';
import './index.scss'

export default class Index extends Component {
  state = {
    isOpened: false
  }
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount = () => {
    //如果是微信设置可分享
    if (Tool.getEnv() === 'weapp') {
      wx.showShareMenu({
        withShareTicket: true
      });
    }
  }

  componentDidMount = () => {
    this.setState({
      isOpened: false
    })
  }

  handleCancel = () => {
    this.setState({
      isOpened: false
    })
  }

  handleConfirm = () => {
    this.setState({
      isOpened: false
    })
  }


  render() {
    return (
      <View className='index'>
        <AtNoticebar icon='volume-plus' single={true} marquee={true} speed={50} close={true} >
          目前组织中需要维护许多项目,有兴趣的同学可以联系本人(任何人都可以)
        </AtNoticebar>
        <AtModal
          isOpened={this.state.isOpened}
          title='508工作室'
          cancelText='取消'
          confirmText='确认'
          onClose={this.handleClose}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content='此项目仅用于学习,主页：https://508lab.github.io'
        />
        <HomeTab />
        <HomeFoot current={0} />
      </View>
    )
  }
}
