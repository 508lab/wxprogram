import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNoticebar, AtModal, AtSearchBar } from 'taro-ui'
import HomeTab from '../../components/hometab';
import HomeFoot from '../../components/homefoot/index';
import Tool from '../../tool/index';
import './index.scss'


export default class Index extends Component {
  state = {
    value: '',
  }
  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments);
  }

  componentWillMount = () => {
    //如果是微信设置可分享
    if (Tool.getEnv() === 'weapp') {
      wx.showShareMenu({
        withShareTicket: true
      });
    }
  }

  onChange(value) {
    this.setState({
      value: value
    });
  }

  onActionClick = () => {
    if (this.state.value) {
      Taro.navigateTo({
        url: '../content/index?q=' + this.state.value
      })
    }
  }

  render() {
    return (
      <View className='index'>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick}
        />
        <AtNoticebar icon='volume-plus' single={true} marquee={true} speed={50} close={true} >
          目前组织中需要维护许多项目,有兴趣的同学可以联系本人(任何人都可以)
        </AtNoticebar>
        <HomeTab />
        <HomeFoot current={0} />
      </View>
    )
  }
}
