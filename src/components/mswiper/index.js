import Taro from '@tarojs/taro'
import { Swiper, SwiperItem } from '@tarojs/components'

/**
 * 首页tab
 */
export default class Index extends Taro.Component {
    constructor() {
        super(...arguments)
    }

    render() {
        let dom = this.props.list.map((e, index) => {
            return <SwiperItem key={e.key}>
                <image src={e.url} style={{ width: '100%', height: '150px'}}/>
            </SwiperItem>
        })
        return (
            <Swiper
                className='test-h'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay>
                {dom}
          </Swiper>
        )
    }
}

Index.defaultProps = {
    list: []
}