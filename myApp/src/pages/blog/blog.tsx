import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Button, Image } from "@tarojs/components";
import { xiedajiao, liuying } from '../../tools';


interface imageProps {
    alt?: string,
    src?: string,
    srcset?: string,
    sizes?: string,
    width?: string,
    height?: string
}

function Blog(props: imageProps) {
    const [blogTitle, setBlogTitle] = useState('title');
    const [introduce, setIntroduce] = useState('xxxxxx');
    const [articleList, setArtcleList] = useState([]);
    const id = 1;
    const list = [{
        id: 1, name: '小明',
    }, {
        id: 2, name: '小红'
    }, {
        id: 3, name: '小芳',
    }, {
        id: 4, name: '小绿'
    }]
    let { src, width = '10px', height = '10px' } = props;
    console.log(src, width, height)
    useEffect(() => {
        xiedajiao();
        liuying();
        handler()
    }, [])
    const gotoIndex = () => {
        Taro.navigateTo({ url: `/pages/index/index?blogTitle=${blogTitle}&&introduce=${introduce}` })
    }
    // 测试获取数据
    const handler = () => {
        Taro.request({
            url: 'https://apiblog.jspang.com/default/getArticleList'
        }).then(res => {
            setArtcleList(res.data.list)
            console.log()
        })
    }
    return (
        <View >
            <Text>Blog 组件</Text>
            <Image src={require('../../static/img.png')} width={width} height={height}></Image>
            {
                list.map((item, i) => {
                    return (
                        <View key={item.id}>
                            {item.id}:{item.name}
                        </View>
                    )
                })
            }
            {
                articleList.map((item, index) => {
                    return (
                        <View key={item.id}>
                            {item.title}
                        </View>
                    )
                })
            }
            <View>
                {/* 男主角是：{id === 1 ? '李子杰' : "刘能"} */}
                男主角是：{id === 1 && '李子杰' || "刘能"}
            </View>
            <Button onClick={gotoIndex}>我要去Index页面</Button>
        </View>
    );
}

export default Blog;

