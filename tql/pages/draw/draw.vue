<template>
	<view class="newIndex">
		<view class="topBar">
			<image src="@/static/images/return.png" class="go-back" @click="openHome"></image>
			<text class="title">07月09日 11:04 笔记</text>
			<view class="borders" @click="goConnect" plain type="info">
				<image src="@/static/images/bluetoothSuccess.png" v-if="deviceId" class="bluetooth"></image>
				<image src="@/static/images/bluetooth.png" v-if="!deviceId" class="bluetooth"></image>
			</view>
			<!-- <view>{{currentPage+1}}</view> -->
			<image src="@/static/images/menu.png" class="menu" @click="handleShowShare"></image>
		</view>
		<canvas type="2d" id="myCanvas" canvas-id="myCanvas"
			:style="'width:' + canvasWidth + 'px;height:' + canvasHeight+ 'px'">
		</canvas>
	</view>

</template>

<script>
	import {
		myCanvas
	} from '@/pages/canvasWrite.js';
	const penDataHandle = require("@/tqlsdk/penDataHandle.js");
	const app = getApp();
	const tqlSDK = app.globalData.tqlSDK;
	const event = require("@/tqlsdk/event.js");


	export default {
		data() {
			return {
				fullPage: 0,
				canvasHeight: 0,
				canvasWidth: 0,
				imgs: [
					"/static/OK_BGI_0.jpg",
					"/static/OK_42.png",
					"/static/OK_43.png",
					"/static/OK_44.png",
					// "/static/OK_BGI_1.jpg",
					// "/static/OK_BGI_2.jpg",
					// "/static/OK_BGI_3.jpg",
				],
				canvasInfo: null,
				title: 'Hello',
				showConnectPen: false,
				currentPage: 0,
				//显示已连接弹窗
				blueToothOn: false,
				//蓝牙开启
				connnetFlag: false,
				deviceMac: null,
				deviceId: null,
				deviceName: null,
			}
		},
		onLoad(options) {
			console.log('options', options);
			if (options.id) {
				// 发起图片加载列表请求;
			}
			// 页面重加载时将所有的监听事件移除一遍在监听 防止相同事件多次重复监听
			uni.getSystemInfo({
				success: result => {
					this.canvasHeight = result.windowHeight - 104;
					this.canvasWidth = result.windowWidth;
					this.fullPage = result.windowHeight;
					setTimeout(() => {
						let canvas = new myCanvas('#myCanvas', result.windowWidth, result
							.windowHeight - 104, this
							.imgs); // 初始化canvas
						this.canvasInfo = canvas
					}, 100)

				}
			});

			event.on('blueToothConnect', this, (data) => {
				this.deviceMac = app.globalData.deviceMac;
				this.deviceName = app.globalData.deviceName;
				this.deviceId = app.globalData.deviceId;
				this.connnetFlag = true;
			});

			// 监听获取数据
			event.on('AddressDataChanged', this, data => {
				console.log('datadatadatadata', data)
				if (data) {
					this.canvasInfo.usbData(data)
				}
			});

			// 监听笔的笔锋开关
			event.on('strokeSwitch', this, data => {
				this.canvasInfo.changeStroke(data);
			});

			// 监听笔的返回值
			event.on('penData', this, data => {
				console.log('penData', data)
				switch (data.cmd) {
					// 获取离线数据量
					case "getOfflineDataNum":
						// console.log(data.data)
						this.offlineDataNum = data.data;
						uni.showModal({
							title: '离线数据量',
							content: this.offlineDataNum
						})
						break;
						// 离线数据进程

					case "offLineProgress":
						break;
						// 停止获取离线数据

					case "offLineProgressStop":
						break;
						// 确认离线数据全部接收完毕

					case "offLineDataConfirm":
						break;
						// 删除离线数据

					case "offLineDataDelete":
						Toast.success('删除成功');
						break;

					default:
						break;
				}
			}); // 监听离线数据获取量

			// 监听切页数据
			event.on('changePage', this, data => {
				this.currentPage = data;
			});

			// 监听离线数据接收完毕
			event.on('offlineDataFinish', this, data => {
				if (data) {
					this.myCanvas.offlineFlag = false;
					this.showOfflineDialog = false;
				}
			});

			// 监听笔关机断开连接事件
			event.on('unConnect', this, data => {
				Dialog.showToast({
					title: '提示',
					content: '蓝牙断开',
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
							this.connnetFlag = false,
								this.deviceId = null,
								this.deviceMac = null,
								this.deviceName = null
							//  已连接deviceId
							tqlSDK.connectDeviceId = null
							// 已连接serviceid
							tqlSDK.connectServiceId = null
							// 已连接characteristicId
							tqlSDK.connectCharacteristicId = null
						}
					}
				})
			});
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			setTimeout(() => {
				this.initBluetooth();
				this.canvasInfo.changePage(0);
			}, 100);
		},
		methods: {
			//连接笔或者查看已连接
			goConnect() {
				if (!this.blueToothOn) {
					uni.showLoading({
						title: "请先开启蓝牙"
					})
					return;
				}

				// if (this.showOfflineDialog) {
				// 	return;
				// }

				if (this.blueToothOn && !this.connnetFlag) {
					uni.showToast({
						icon: 'loading',
						title: "跳转页面",
						duration: 1000
					})
					uni.navigateTo({
						url: '../search/search'
					});
					setTimeout(() => {
						uni.hideToast();
					}, 1000)
					return;
				}
				this.showConnectPen = true;
				this.deviceId = null;
			},

			// 初始化蓝牙
			initBluetooth() {
				tqlSDK.initBlueTooth(() => {
					uni.showToast({
						icon: 'success',
						title: '蓝牙开启成功!'
					});
					this.blueToothOn = true
				}, () => {
					uni.showToast({
						title: '请打开蓝牙!',
						icon: 'none',
						duration: 1000
					});

					tqlSDK.listenBlueState(() => {
						tqlSDK.initBlueTooth(() => {
							uni.showToast({
								icon: '提示',
								title: '蓝牙开启成功!'
							});
							this.blueToothOn = true;
						});
					});
				});
			},
			// 显示分享
			handleShowShare() {
				this.shareState = true;
				const _this = this;
				uni.showActionSheet({
					itemList: ['保存图片', '保存PDF'], // 按钮顺序不能改变
					success: function(res) {
						if (res.tapIndex === 0) {
							uni.showLoading({
								title: '保存中...'
							});
							setTimeout(function() {
								uni.hideLoading();
							}, 6000);
							console.log('_this.canvasInfo', _this.canvasInfo)
							// _this.canvasInfo.draw(false, (() => {
							uni.canvasToTempFilePath({
								canvas: _this.canvasInfo,
								canvasId: 'myCanvas',
								success(res) {
									uni.compressImage({
										src: res.tempFilePath,
										quality: 100,
										success: res => {
											console.log('res.tempFilePath', res)
											uni.saveImageToPhotosAlbum({
												filePath: res.tempFilePath,
												success: function(res) {
													console.log('保存成功', res)
													uni.hideLoading();
													uni.showToast({
														icon: 'none',
														position: 'bottom',
														title: "图片已下载至【图库】，请打开【图库】查看", // res.tempFilePath
													});
												},
												fail: function() {
													uni.showToast({
														title: "保存失败，请稍后重试",
														icon: "none"
													});
												}
											});
										}
									})
								}
							})
							// }));
							console.log(_this.canvasInfo)
							// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			openHome() {
				uni.switchTab({
					url: '../index/index'
				});
			}
		}
	}
</script>

<style>
	.topBar {
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 20rpx 10rpx 15rpx;
		border-bottom: 1rpx solid #e3e1e1;
	}

	.go-back {
		width: 30rpx;
		height: 30rpx;
	}

	.title {
		font-size: 30rpx;
		padding: 5rpx 25rpx;
		width: 65%;
		border-radius: 10rpx;
		background-color: #d5d4d4;
	}

	.bluetooth {
		width: 20rpx;
		height: 20rpx;
		position: absolute;
		left: -5rpx;
		top: 0rpx;
	}

	.borders {
		width: 45rpx;
		height: 45rpx;
		background-image: url('@/static/images/pen.png');
		background-size: cover;
		position: relative;
	}

	.menu {
		width: 40rpx;
		height: 40rpx;
	}
</style>
