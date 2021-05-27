import { Component } from 'react'
import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components'
import Header from '../components/header/index'
import Child from './child';
import './index.scss'


export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  gotoBlog = function () {
    Taro.switchTab({ url: '/pages/blog/blog' })
  }
  render() {
    return (
      <View className='index'>
        <Header />
        <Text>Heyi,Hello world!</Text>
        <Child></Child>
        <Button onClick={this.gotoBlog}>跳转到blog页</Button>

      </View>
    )
  }
}
