import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNoticebar, AtModal, AtSearchBar } from 'taro-ui'
import HomeTab from '../../components/hometab';
import HomeFoot from '../../components/homefoot/index';
import MsWiper from '../../components/mswiper/index';
import Tool from '../../tool/index';
import './index.scss'



export default class Index extends Component {
  state = {
    value: '',
    tip: '',
    fileList: []
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

    Tool.httpRequestGeN(`/poetry/2833324528@qq.com`, (data) => {
      const obj = JSON.parse(data.data[0]);
      this.setTip(obj);
    })

    Tool.httpRequestGeN(`/banner`, (data) => {
      this.setState({
        fileList: data.data
      })
    })
  }

  setTip = (obj) => {
    if (Tool.getEnv() === 'weapp') {
      this.setState({
        tip: obj.c + '\t\t' + '   <<' + obj.a + '>>'
      })
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
        <AtNoticebar icon='volume-plus' single={false} close={false} >
          {this.state.tip}
        </AtNoticebar>
        <MsWiper list={this.state.fileList}/>
        <HomeTab />
        <HomeFoot current={0} />
      </View>
    )
  }
}
