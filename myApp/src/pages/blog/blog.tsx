import Taro from '@tarojs/taro';
import { View, Text, Button } from "@tarojs/components";


function Blog() {
    const gotoIndex=()=>{
        Taro.navigateTo({url:'/pages/blog/blog'})
    }
    return (
        <View >
            <Text>Blog 组件</Text>
            <Button onClick={gotoIndex}>我要去Index页面</Button>
        </View>
    );
}

export default Blog;

