// 此文件为消除魔术字符串 同时为了后续方便修改 将程序解耦
const service = {
  //  获取笔名
  getPenName: Symbol('penName'),
  // 已找到的设备列表
  foundDevices: Symbol('foundDevices'),
  // 设置笔名
  setPenName: Symbol('setPenName'),
  // 获取mac地址
  getMacAddress: Symbol('getMacAddress'),
  // 获取蓝牙版本
  getBlueToothVersion: Symbol('getBlueToothVersion'),
  // 获取电量
  getPenBattery: Symbol('getPenBattery'),
  // 获取笔的RTC时间
  getRTCtime: Symbol('getRTCtime'),
  // 设置笔的RTC时间
  setRTCtime: Symbol('setRTCtime'),
  // 获取笔的自动关机时间
  getPenAutoShutDownTime: Symbol('getPenAutoShutDownTime'),
  // 设置笔的自动关机时间
  setPenAutoOff: Symbol('setPenAutoOff'),
  // 恢复出厂设置
  RestoreFactorySettings: Symbol('RestoreFactorySettings'),
  // 获取已使用内存
  getUsedMemory: Symbol('getUsedMemory'),
  // 获取是否开启点笔开机
  getPenClickMode: Symbol('getPenClickMode'),
  // 设置点笔开始是否成功
  setPenClickMode: Symbol('setPenClickMode'),
  //获取笔的蜂鸣器开关
  getBeep: Symbol('getBeep')
}
export {
  service
}