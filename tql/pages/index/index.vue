<template>
	<view class="wrapper">
		<image class="crete-note" src="@/static/images/add.png" @click="createControl" />
		<view class="note-wrapper" @click="detailControl">
			<view class="note-title">
				<text class="text">05年14日 14:59 笔记</text>
				<text class="time">2021-05-14</text>
			</view>
			<view class="note-image">
				<image src="@/static/OK_42.png" mode=""></image>
			</view>
		</view>
		<view class="note-wrapper" @click="detailControl">

			<view class="note-title">
				<text class="text">05年14日 14:59 笔记</text>
				<text class="time">2021-05-14</text>
			</view>
			<view class="note-image">
				<image src="@/static/OK_42.png" mode=""></image>
			</view>
		</view>
		<view class="note-wrapper" @click="detailControl">

			<view class="note-title">
				<text class="text">05年14日 14:59 笔记</text>
				<text class="time">2021-05-14</text>
			</view>
			<view class="note-image">
				<image src="@/static/OK_42.png" mode=""></image>
			</view>
		</view>
		<view class="note-wrapper" @click="detailControl">
			<view class="note-title">
				<text class="text">05年14日 14:59 笔记</text>
				<text class="time">2021-05-14</text>
			</view>
			<view class="note-image">
				<image src="@/static/OK_42.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'component',
			}
		},
		onShow() {},
		onLoad() {},
		methods: {
			createControl() {
				uni.redirectTo({
					url: '../draw/draw'
				});
			},
			detailControl() {
				uni.redirectTo({
					url: '../draw/draw'
				});
				// 重新获取图片列表，设为初始值
				// 图片组件内对imgs增加初始值赋值
			}
		}
	}
</script>

<style>
	page {
		background-color: #F3F3F8;
	}

	.wrapper {
		margin-top: 25rpx;
		position: relative;
		/* background-color: #F3F3F8; */
	}

	.crete-note {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		right: 50rpx;
		bottom: 20rpx;
		z-index: 9;
		border-right: 50%;
	}

	.note-wrapper {
		background-color: white;
		margin-bottom: 25rpx;
		padding-bottom: 25rpx;
	}

	.note-title {
		display: flex;
		justify-content: space-between;
		padding: 40rpx 40rpx 10rpx 40rpx;
	}

	.note-title .text {
		font-size: 35rpx;
		font-weight: bold;
	}

	.note-title .time {
		color: #EEF1F2;
	}

	.note-image {
		overflow: hidden;
		width: 100%;
		height: 200rpx;
		text-align: center;
	}

	.note-image image {
		margin: 0 auto;
	}
</style>
