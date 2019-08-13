import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import HomeTab from '../../components/hometab';
import Warehouse from '../../data/warehouse';
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() {
    console.log(Warehouse);
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <HomeTab />
      </View>
    )
  }
}
