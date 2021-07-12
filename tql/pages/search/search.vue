<template>
	<!--pages/search/search.wxml-->
	<view class="fullPage">
		<view class="title">
			<view class="mainTitle">连接智能笔MAC编号</view>
			<view class="secondTitle">查看笔尾MAC编号，连接智能笔</view>
		</view>
		<scroll-view scroll-y="true" class="fullList" :refresher-enabled="true" @refresherrefresh="refreshList"
			:refresher-triggered="refreshFlag">
			<view v-for="(item, index) in blueToothData.foundDevices" :key="index" class="onDevice">
				<view>
					<view class="penName">{{item.name}}</view>
					<view class="penAddress">{{item.macAddress}}</view>
				</view>
				<button size="mini" @click="connectBlueTooth" plain color="#8492A6" :data-deviceId="item.deviceId"
					:data-deviceName="item.name" :data-mac="item.macAddress">连接</button>
			</view>
		</scroll-view>
		<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
	// pages/search/search.js
	const app = getApp();
	const tqlSDK = getApp().globalData.tqlSDK;
	const event = require("../../tqlsdk/event.js");
	export default {
		data() {
			return {
				blueToothData: {
					foundDevices: []
				},
				refreshFlag: false
			};
		},

		components: {

		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.searchBlueTooth();
			event.on('foundDevices', this, data => {
				this.blueToothData = data;
			});
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			var data = uni.getMenuButtonBoundingClientRect();
			//单位px
			console.log('菜单按键宽度：', data.width)
			console.log('菜单按键高度：', data.height)
			console.log('菜单按键上边界坐标：', data.top)
			console.log('菜单按键右边界坐标：', data.right)
			console.log('菜单按键下边界坐标：', data.bottom)
			console.log('菜单按键左边界坐标：', data.left)
		},
		methods: {
			// 搜索附近的蓝牙
			searchBlueTooth() {
				tqlSDK.searchBlueTooth(this.blueToothList);
			},

			// 查找到的设备列表
			blueToothList() {
				tqlSDK.showBlueToothList(this);
			},

			// 连接蓝牙
			connectBlueTooth(e) {
				uni.showLoading({
					message: '正在连接',
					// forbidClick: true,
					duration: 0
				});
				let deviceId = e.currentTarget.dataset.deviceid;
				let penName = e.currentTarget.dataset.devicename;
				let mac = e.currentTarget.dataset.mac;
				console.log('tqlSDKtqlSDKtqlSDKtqlSDK', tqlSDK)
				tqlSDK.createBlueToothConnection(deviceId, () => {
					app.globalData.deviceId = deviceId;
					app.globalData.deviceName = penName;
					app.globalData.deviceMac = mac;
					event.emit('blueToothConnect', true);
					this.getBlueToothService(deviceId);
				}, () => {
					uni.hideLoading();
				});
			},

			// 获取蓝牙设备服务
			getBlueToothService(deviceId) {
				tqlSDK.getBlueToothService(deviceId, () => {
					// console.log(2)
					uni.hideToast();
					uni.showToast({
						title: "连接成功",
						success: () => {
							console.log('返回上一级页面~~~~~~')
							uni.navigateBack({
								delta: 0
							});
						}
					});
				});
			},

			//刷新列表
			refreshList() {
				setTimeout(() => {
					this.refreshFlag = false;
					tqlSDK.allDevices.foundDevices = [];
					this.searchBlueTooth();
				}, 1500);
			}

		}
	};
</script>
<style>
	/* pages/search/search.wxss */
	.title {
		font-size: 20px;
		background-color: #fff;
		height: 222rpx;
		border-bottom: 1px solid #e6e6e6;
		padding-left: 32rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-top-right-radius: 8rpx;

	}

	.mainTitle {
		color: #151515;
		font-size: 48rpx;
		font-weight: 500;
		margin-bottom: 10rpx;
	}

	.secondTitle {
		font-size: 32rpx;
		color: #505050;
		margin-top: 10rpx;
	}

	.fullPage {
		height: 100vh;
		background-color: #f3f3f3;
		padding: 20rpx;
		overflow: hidden;
		box-sizing: border-box;
	}

	.onDevice {
		background-color: #fff;
		border-bottom: 1px solid #f3f3f3;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 32rpx;
		height: 155rpx;
	}

	.penName {
		color: #151515;
		font-size: 32rpx;
		font-weight: 500;
		margin-bottom: 10rpx;
	}

	.penAddress {
		color: #8492a6;
		margin-top: 10rpx;
		font-size: 28rpx;
	}

	.fullList {
		height: 80vh;
	}

	/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiUzQ2lucHV0JTIwY3NzJTIwTUF6bXNVJTNFIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZCQUE2QjtBQUM3QjtFQUNFLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIsY0FBYztFQUNkLGdDQUFnQztFQUNoQyxtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsNkJBQTZCOztBQUUvQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixnQ0FBZ0M7RUFDaEMsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsWUFBWTtBQUNkIiwiZmlsZSI6InRvLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHBhZ2VzL3NlYXJjaC9zZWFyY2gud3hzcyAqL1xyXG4udGl0bGUge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGhlaWdodDogMjIycnB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTZlNmU2O1xyXG4gIHBhZGRpbmctbGVmdDogMzJycHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA4cnB4O1xyXG4gXHJcbn1cclxuXHJcbi5tYWluVGl0bGUge1xyXG4gIGNvbG9yOiAjMTUxNTE1O1xyXG4gIGZvbnQtc2l6ZTogNDhycHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHJweDtcclxufVxyXG5cclxuLnNlY29uZFRpdGxlIHtcclxuICBmb250LXNpemU6IDMycnB4O1xyXG4gIGNvbG9yOiAjNTA1MDUwO1xyXG4gIG1hcmdpbi10b3A6IDEwcnB4O1xyXG59XHJcblxyXG4uZnVsbFBhZ2Uge1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzZjNmMztcclxuICBwYWRkaW5nOiAyMHJweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbi5vbkRldmljZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YzZjNmMztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDAgMzJycHg7XHJcbiAgaGVpZ2h0OiAxNTVycHg7XHJcbn1cclxuXHJcbi5wZW5OYW1lIHtcclxuICBjb2xvcjogIzE1MTUxNTtcclxuICBmb250LXNpemU6IDMycnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBycHg7XHJcbn1cclxuLnBlbkFkZHJlc3N7XHJcbiAgY29sb3I6ICM4NDkyYTY7XHJcbiAgbWFyZ2luLXRvcDogMTBycHg7XHJcbiAgZm9udC1zaXplOiAyOHJweDtcclxufVxyXG5cclxuLmZ1bGxMaXN0IHtcclxuICBoZWlnaHQ6IDgwdmg7XHJcbn0iXX0= */
</style>
