import { Component } from 'react';
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components';

export default class Blog extends Component {

  // gotoIndex = function (params: type) {
  gotoIndex = function () {
    Taro.redirectTo({ url: '/pages/index/index' })
  }
  render() {
    return (
      <View>
        <Text>
          Blog组件
        </Text>
        <Button onClick={this.gotoIndex}>跳转到首页</Button>
      </View>
    )
  }
}
