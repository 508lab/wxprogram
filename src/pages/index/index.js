import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar, AtModal } from 'taro-ui'
import HomeTab from '../../components/hometab';

import './index.scss'

export default class Index extends Component {
  state = {
    current: 0,
    isOpened: false
  }
  config = {
    navigationBarTitleText: '首页'
  }

  handleClick(value) {
    this.setState({
      current: value
    })
    if (value === 1) {
      this.setState({
        isOpened: true
      })
    }
  }
  componentWillMount = () => {
    //设置可分享
    wx.showShareMenu({
      withShareTicket: true
    });
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
        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '我们', iconType: 'user' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}
