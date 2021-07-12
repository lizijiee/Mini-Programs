<template>
	<view class="newIndex">
		<view class="topBar">
			<button custom-class="borders" @click="goConnect" plain type="info">{{!deviceId?"未连接智能笔":"已连接"}}
			</button>
			<view>{{currentPage+1}}</view>
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
		onLoad() {
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
		}
	}
</script>

<style>
	.topBar {
		height: 35px;
		display: flex;
		justify-content: space-between;
		line-height: 35px;
		align-items: center;
		padding: 0 20px 0 25px;
	}

	.borders {
		border: none !important;
		margin: 0;
	}
</style>
