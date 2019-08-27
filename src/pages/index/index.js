import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNoticebar, AtModal, AtSearchBar, AtToast } from 'taro-ui'
import HomeTab from '../../components/hometab';
import HomeFoot from '../../components/homefoot/index';
import Tool from '../../tool/index';
import './index.scss'


/**
 * 数据
 */
import fontData from '../../data/front';
import aiData from '../../data/ai';
import apiData from '../../data/api';
import awesomeData from '../../data/awesome';
import backendData from '../../data/backend';
import bigdataData from '../../data/bigdata';
import crawlerData from '../../data/crawler';
import designData from '../../data/design';
import effectData from '../../data/effect';
import operationsData from '../../data/operations';
import platformData from '../../data/platform';
import securityData from '../../data/security';
import PlugData from '../../data/plug';
import OfficeData from '../../data/office';
import BossesData from '../../data/bosses';
import androidData from '../../data/android';

const ListData = [
  { data: fontData.reverse(), name: '前端' },
  { data: backendData.reverse(), name: '后端' },
  { data: androidData.reverse(), name: 'Android' },
  { data: bigdataData.reverse(), name: '大数据' },
  { data: operationsData.reverse(), name: '运维' },
  { data: apiData.reverse(), name: 'api文档' },
  { data: platformData.reverse(), name: '平台与工具' },
  { data: PlugData.reverse(), name: '插件库' },
  { data: securityData.reverse(), name: '网络安全' },
  { data: OfficeData.reverse(), name: '日常办公' },
  { data: BossesData.reverse(), name: '大佬们的博客' },
  { data: designData.reverse(), name: '设计相关' },
  { data: crawlerData.reverse(), name: '爬虫' },
  { data: effectData.reverse(), name: '一些好看的效果' },
  { data: aiData.reverse(), name: 'ai' },
  { data: awesomeData.reverse(), name: '其他' },
]


export default class Index extends Component {
  state = {
    isOpened: false,
    value: '',
    status: 'loading',
    lodIsOpened: true,  //是否展示toast加载中
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

  onChange(value) {
    this.setState({
      value: value
    });

  }

  render() {
    return (
      <View className='index'>
        <AtToast isOpened text="加载中" icon="{icon}" hasMask={true} lodIsOpened={this.state.lodIsOpened}
          status={this.state.status} duration={2300}
        ></AtToast>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
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
        <HomeTab data={ListData} />
        <HomeFoot current={0} />
      </View>
    )
  }
}
