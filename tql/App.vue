<script>
	import { AllSDK } from "./tqlsdk/SDK.js";
	export default {
	  onLaunch() {
	    // 展示本地存储能力
		
	    this.globalData.tqlSDK = new AllSDK(3);
	  },
	
	  globalData: {
	    tqlSDK: null,
	    deviceId: null,
	    deviceName: null,
	    deviceMac: null
	  },
	  methods: {}
	};
</script>

<style>
	/*每个页面公共css */
</style>
