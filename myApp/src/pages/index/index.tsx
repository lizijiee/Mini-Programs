import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Header from '../components/header/index'
import './index.scss'


export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <Header />
        <Text>Heyi,Hello world!</Text>
      </View>
    )
  }
}
