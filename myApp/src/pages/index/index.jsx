import { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import Header from "../components/header/index";
import Child from "./child";
import "./index.scss";

export default class Index extends Component {
  // 建议在页面初始化时把 getCurrentInstance() 的结果保存下来供后面使用，
  // 而不是频繁地调用此 API

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      introduce: "",
    };
    this.instance = getCurrentInstance();
  }

  componentWillMount() {}

  componentDidMount() {
    this.setState({
      title: this.instance.router.params.blogTitle,
      introduce: this.instance.router.params.introduce,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  gotoBlog = () => {
    Taro.navigateTo({ url: "/pages/blog/blog" });
  };
  render() {
    const { title, introduce } = this.state;
    return (
      <View className='index'>
        <Header />
        <Child></Child>
        <Text>Heyi,Hello world!</Text>
        <Button onClick={this.gotoBlog}>我要去Index页面</Button>
        <View>{title}</View>
        <View>{introduce}</View>
      </View>
    );
  }
}
