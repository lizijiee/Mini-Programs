/*Obfuscated by JShaman.com*/const event=require('./event');const penDataHandle=require('./penDataHandle');const utils=require('./utils');class AllSDK{constructor(_0x1d37a8){this['gofflineDataProgress']=0x0;this['offlineDataNum']=0x0;this['gefflineCounter']=0x0;this['connectDeviceId']=null;this['connectServiceId']=null;this['connectCharacteristicId']=null;this['finishFlag']=![];this['allDevices']={};this['allDevices']['foundDevices']=[];this['blueToothOn']=![];this['saveDataFlag']=![];switch(_0x1d37a8){case 0x0:this['platForm']=wx;this['fs']=wx['getFileSystemManager']();this['fileName']=wx['env']['USER_DATA_PATH']+'/tqlData-'+Date['now']()+'.txt';this['fs']['writeFile']({'filePath':this['fileName'],'encoding':'utf-8','success':()=>{console['log']('writeFileSuccess');},'fail':()=>{console['log']('writeFileFail');}});break;case 0x1:this['platForm']=dd;break;case 0x2:this['platForm']=tt;break;case 0x3:this['platForm']=uni;break;default:break;}this['platFormFlag']=_0x1d37a8;this['readLocalTxtFlag']=![];this['getOfflineDataFlag']=![];}['listenBlueState'](_0xa2d077){this['platForm']['onBluetoothAdapterStateChange'](_0x2bcddc=>{if(_0x2bcddc['available']){if(this['platForm']['offBluetoothAdapterStateChange']){this['platForm']['offBluetoothAdapterStateChange']();}if(_0xa2d077){_0xa2d077();}}});}['initBlueTooth'](_0x4697cc,_0x25f2f9){this['platForm']['openBluetoothAdapter']({'success':()=>{if(_0x4697cc){_0x4697cc();}},'fail':()=>{if(_0x25f2f9){_0x25f2f9();}}});}['getLocalBlueToothState'](){}['listenBlueConnection'](){if(this['platForm']['offBLEConnectionStateChange']){this['platForm']['offBLEConnectionStateChange']();}this['platForm']['onBLEConnectionStateChange'](_0x6a19fa=>{if(this['connectDeviceId']===_0x6a19fa['deviceId']&&!_0x6a19fa['connected']){event['emit']('unConnect',!![]);}});}['searchBlueTooth'](_0x33b077,_0x1618db){this['platForm']['startBluetoothDevicesDiscovery']({'allowDuplicatesKey':!![],'success':_0x225994=>{if(_0x33b077){_0x33b077();}},'fail':_0x4551ab=>{if(_0x1618db){_0x1618db();}},'complete':_0x1e0d1b=>{console['log'](_0x1e0d1b);}});}['stopBlueToothSearch'](_0x36e6b4,_0x37575a){this['platForm']['stopBluetoothDevicesDiscovery']({'success':()=>{if(_0x36e6b4){this['showBlueToothList']();_0x36e6b4();}},'fail':()=>{if(_0x37575a){_0x37575a();}}});}['showBlueToothList'](){let _0x35a341=!![];this['platForm']['onBluetoothDeviceFound'](_0x544b85=>{if(_0x544b85){_0x544b85['devices']['forEach'](_0xb97eaa=>{let _0x291fdd=null;if(this['platFormFlag']===0x1){if(!_0xb97eaa['advertisData']){return;}let _0x21008f=hexToArray(_0xb97eaa['advertisData']);_0x291fdd=ab2hex(_0x21008f);}else{_0x291fdd=ab2hex(_0xb97eaa['advertisData']);}if(_0x291fdd['length']<0xa){return;}if(_0x291fdd['slice'](0x0,0x4)['join'](':')['toUpperCase']()!=='31:32:33:34'){return;}_0xb97eaa['macAddress']=_0x291fdd['slice'](0x4,0xa)['reverse']()['join'](':')['toUpperCase']();if(this['allDevices']['foundDevices']['length']!==0x0){_0x35a341=this['allDevices']['foundDevices']['every']((_0x20328a,_0xbcdb8b)=>{return _0x20328a['deviceId']!==_0xb97eaa['deviceId'];});}if(_0x35a341){this['allDevices']['foundDevices']['push'](_0xb97eaa);}});}event['emit']('foundDevices',this['allDevices']);});}['closeBlueTooth'](_0x500d85,_0x39619a){this['platForm']['closeBluetoothAdapter']({'success':()=>{if(_0x500d85){_0x500d85();}},'fail':()=>{if(_0x39619a){_0x39619a();}}});}['createBlueToothConnection'](_0x108110,_0x1cf489,_0xa54958){switch(this['platFormFlag']){case 0x3:case 0x0:this['platForm']['createBLEConnection']({'deviceId':_0x108110,'success':()=>{this['stopBlueToothSearch'](()=>{console['log']('stopBlueToothDiscovery');});this['listenBlueConnection']();if(_0x1cf489){_0x1cf489();}},'fail':()=>{if(_0xa54958){_0xa54958();}}});break;case 0x1:case 0x2:this['platForm']['connectBLEDevice']({'deviceId':_0x108110,'success':()=>{this['stopBlueToothSearch'](()=>{console['log']('stopBlueToothDiscovery');});if(_0x1cf489){_0x1cf489();}},'fail':()=>{if(_0xa54958){_0xa54958();}}});break;default:break;}}['unConnectBlueTooth'](_0x5dc200,_0x396e9b,_0x2e5d53){switch(this['platFormFlag']){case 0x3:case 0x0:this['platForm']['closeBLEConnection']({'deviceId':_0x5dc200,'success':()=>{if(_0x396e9b){_0x396e9b();}},'fail':()=>{if(_0x2e5d53){_0x2e5d53();}}});break;case 0x1:case 0x2:this['platForm']['disconnectBLEDevice']({'deviceId':_0x5dc200,'success':()=>{if(_0x396e9b){_0x396e9b();}},'fail':()=>{if(_0x2e5d53){_0x2e5d53();}}});break;default:break;}}['getBlueToothService'](_0x2846db,_0x2c0c47,_0x480507){this['platForm']['getBLEDeviceServices']({'deviceId':_0x2846db,'success':async _0x5655ef=>{switch(this['platFormFlag']){case 0x0:case 0x3:let _0x29e4fc=_0x5655ef['services']['length'];for(let _0x204626=0x0;_0x204626<_0x29e4fc;_0x204626++){this['getBlueToothCharaceristics'](_0x2846db,_0x5655ef['services'][_0x204626]['uuid']);await sleep(0x64);}break;case 0x1:case 0x2:let _0x58dfd9=_0x5655ef['services']['length'];for(let _0x4f7be3=0x0;_0x4f7be3<_0x58dfd9;_0x4f7be3++){this['getBlueToothCharaceristics'](_0x2846db,_0x5655ef['services'][_0x4f7be3]['serviceId']);await sleep(0x64);}break;default:break;}if(_0x2c0c47){_0x2c0c47();}},'fail':()=>{if(_0x480507){_0x480507();}}});}['getBlueToothCharaceristics'](_0xb9fb38,_0x105ff2){this['platForm']['getBLEDeviceCharacteristics']({'deviceId':_0xb9fb38,'serviceId':_0x105ff2,'success':_0x46d29b=>{switch(this['platFormFlag']){case 0x0:case 0x3:_0x46d29b['characteristics']['forEach'](_0x46c807=>{if(_0x46c807['properties']['notify']||_0x46c807['properties']['indicate']){this['platForm']['notifyBLECharacteristicValueChange']({'state':!![],'deviceId':_0xb9fb38,'serviceId':_0x105ff2,'characteristicId':_0x46c807['uuid'],'success':()=>{console['log']('notifyBLECharacteristicValueChange\x20success------:\x20'+_0x46d29b['errMsg']);}});}if(_0x46c807['properties']['write']&&_0x46c807['uuid']['toUpperCase']()=='0000F102-0000-1000-8000-00805F9B34FB'){this['connectDeviceId']=_0xb9fb38;this['connectServiceId']=_0x105ff2;this['connectCharacteristicId']=_0x46c807['uuid'];}});break;case 0x1:case 0x2:_0x46d29b['characteristics']['forEach'](_0x3bf30d=>{if(_0x3bf30d['properties']['notify']||_0x3bf30d['properties']['indicate']){this['platForm']['notifyBLECharacteristicValueChange']({'state':!![],'deviceId':_0xb9fb38,'serviceId':_0x105ff2,'characteristicId':_0x3bf30d['characteristicId'],'success':_0x109594=>{console['log']('notifyBLECharacteristicValueChange\x20success------:\x20'+_0x109594);}});}if(_0x3bf30d['properties']['write']&&_0x3bf30d['characteristicId']['toUpperCase']()==='0000F102-0000-1000-8000-00805F9B34FB'){console['log']('向蓝牙写数据');this['connectDeviceId']=_0xb9fb38;this['connectServiceId']=_0x105ff2;this['connectCharacteristicId']=_0x3bf30d['characteristicId'];}});break;default:break;}setTimeout(()=>{this['getPenModal']();this['setRTCTime'](new Date()['getTime']());},0x3e8);},'fail':()=>{}});this['listenValueChange']();}['listenValueChange'](){if(this['platForm']['offBLECharacteristicValueChange']){this['platForm']['offBLECharacteristicValueChange']();}this['platForm']['onBLECharacteristicValueChange'](_0x3e5ecd=>{switch(_0x3e5ecd['characteristicId']['toUpperCase']()){case'0000FFF1-0000-1000-8000-00805F9B34FB':if(this['getOfflineDataFlag']||this['readLocalTxtFlag']){return;}if(this['platFormFlag']===0x0||this['platFormFlag']===0x3){let _0x199473=ab2hex(_0x3e5ecd['value']);let _0x59bf79=_0x199473['length']/0xa;for(let _0x43a6e1=0x0;_0x43a6e1<_0x59bf79;_0x43a6e1++){penDataHandle['splitData'](hex2Bytes(_0x199473['slice'](_0x43a6e1*0xa,(_0x43a6e1+0x1)*0xa)));if(this['saveDataFlag']&&this['platFormFlag']===0x0){this['fs']['appendFileSync'](this['fileName'],_0x199473['slice'](_0x43a6e1*0xa,(_0x43a6e1+0x1)*0xa)['join']('\x20')+'\x0a','utf-8');}}}else{let _0x1f9db2=hexToArray(_0x3e5ecd['value']);let _0x1368cc=ab2hex(_0x1f9db2);let _0x21947b=_0x1368cc['length']/0xa;for(let _0x4c0e3f=0x0;_0x4c0e3f<_0x21947b;_0x4c0e3f++){penDataHandle['splitData'](hex2Bytes(_0x1368cc['slice'](_0x4c0e3f*0xa,(_0x4c0e3f+0x1)*0xa)));}}break;case'0000F202-0000-1000-8000-00805F9B34FB':if(this['platFormFlag']===0x0||this['platFormFlag']===0x3){let _0xcc4d29=ab2hex(_0x3e5ecd['value']);let _0x37a17e=_0xcc4d29['length']/0xa;for(let _0x374507=0x0;_0x374507<_0x37a17e;_0x374507++){let _0x1df75b=_0xcc4d29['slice'](_0x374507*0xa,(_0x374507+0x1)*0xa);this['gofflineDataProgress']+=0x1;if(!(this['gofflineDataProgress']%0xfa)){event['emit']('offlineGross',this['gofflineDataProgress']);}if(this['offlineDataNum']===this['gofflineDataProgress']){setTimeout(()=>{this['gofflineDataProgress']=0x0;this['getOfflineDataFlag']=![];event['emit']('offlineDataFinish',!![]);},0x7d0);}let _0x3ee7fb=hex2Bytes(_0x1df75b);penDataHandle['splitData'](_0x3ee7fb,![]);}}else{let _0x23d0d2=hexToArray(_0x3e5ecd['value']);let _0x40ad3c=ab2hex(_0x23d0d2);let _0x5a417f=_0x40ad3c['length']/0xa;for(let _0x126b3a=0x0;_0x126b3a<_0x5a417f;_0x126b3a++){let _0x12e05c=_0x40ad3c['slice'](_0x126b3a*0xa,(_0x126b3a+0x1)*0xa);let _0x7fe1a6=hex2Bytes(_0x12e05c);penDataHandle['splitData'](_0x7fe1a6,![]);}}break;case'0000F101-0000-1000-8000-00805F9B34FB':if(this['platFormFlag']===0x0||this['platFormFlag']===0x3){let _0xae6619=ab2hex(_0x3e5ecd['value']);let _0x47a85d=hex2Bytes(_0xae6619);getDataInfo(_0x47a85d,this);}else{let _0x307e58=hexToArray(_0x3e5ecd['value']);let _0x2edfb2=ab2hex(_0x307e58);let _0x458b19=hex2Bytes(_0x2edfb2);getDataInfo(_0x458b19,this);}break;default:break;}});}['dealData'](_0x295425,_0x2b5fcc,_0x21adfa,_0x42bfe1){let _0x3b6075=new ArrayBuffer(_0x295425);let _0x2d7837=new DataView(_0x3b6075);for(let _0x121434=0x0;_0x121434<_0x295425;_0x121434++){_0x2d7837['setUint8'](_0x121434,_0x2b5fcc[_0x121434]);}switch(this['platFormFlag']){case 0x0:case 0x3:this['platForm']['writeBLECharacteristicValue']({'characteristicId':this['connectCharacteristicId'],'serviceId':this['connectServiceId'],'deviceId':this['connectDeviceId'],'value':_0x3b6075,'success':_0x239ee5=>{console['log'](_0x239ee5);if(_0x21adfa){_0x21adfa();}},'fail':_0x38ebe3=>{console['log'](_0x38ebe3);if(_0x42bfe1){_0x42bfe1();}}});break;case 0x1:case 0x2:let _0x116bee=buf2hex(_0x3b6075);this['platForm']['writeBLECharacteristicValue']({'characteristicId':this['connectCharacteristicId'],'serviceId':this['connectServiceId'],'deviceId':this['connectDeviceId'],'value':_0x116bee,'success':()=>{if(_0x21adfa){_0x21adfa();}},'fail':()=>{if(_0x42bfe1){_0x42bfe1();}}});break;default:break;}}['setPenName'](_0x1850ca,_0x5f0eff,_0x4bbb99){let _0x19ed53=strToUtf8(_0x1850ca);let _0x1cc2fb=_0x19ed53['length'];let _0x5068cf=new ArrayBuffer(_0x1cc2fb+0x2);let _0xe10674=new DataView(_0x5068cf);_0xe10674['setUint8'](0x0,0xa2);_0xe10674['setUint8'](0x1,_0x1cc2fb);for(let _0x27f229=0x0;_0x27f229<_0x1cc2fb;_0x27f229++){_0xe10674['setUint8'](_0x27f229+0x2,_0x19ed53[_0x27f229]);}if(this['platFormFlag']===0x0||this['platFormFlag']===0x3){this['platForm']['writeBLECharacteristicValue']({'characteristicId':this['connectCharacteristicId'],'serviceId':this['connectServiceId'],'deviceId':this['connectDeviceId'],'value':_0x5068cf,'success':()=>{if(_0x5f0eff){_0x5f0eff();}},'fail':()=>{if(_0x4bbb99){_0x4bbb99();}}});}else{let _0x4b373e=buf2hex(_0x5068cf);this['platForm']['writeBLECharacteristicValue']({'characteristicId':this['connectCharacteristicId'],'serviceId':this['connectServiceId'],'deviceId':this['connectDeviceId'],'value':_0x4b373e,'success':()=>{if(_0x5f0eff){_0x5f0eff();}},'fail':()=>{if(_0x4bbb99){_0x4bbb99();}}});}}['getPenName'](_0x33ebe0,_0x3c27b8){this['dealData'](0x3,[0xa0,0x1,0xff],_0x33ebe0,_0x3c27b8);}['getMACAddress'](_0x1ab55b,_0x285d8a){this['dealData'](0x3,[0xa4,0x1,0xff],_0x1ab55b,_0x285d8a);}['getPenFirmWare'](_0x458594,_0x12c177){this['dealData'](0x3,[0xa6,0x1,0xff],_0x458594,_0x12c177);}['getPenBattery'](_0x12ba50,_0x161bec){this['dealData'](0x3,[0xa8,0x1,0xff],_0x12ba50,_0x161bec);}['setRTCTime'](_0x46bd6a,_0x55f74a,_0x109959){let _0x62e9b4=(_0x46bd6a-0x125e5770400)/0x3e8;console['log'](_0x62e9b4,'timestamp');this['dealData'](0x6,[0xac,0x4,_0x62e9b4&0xff,_0x62e9b4>>0x8&0xff,_0x62e9b4>>0x10&0xff,_0x62e9b4>>0x18&0xff],_0x55f74a,_0x109959);}['getRTCTime'](_0x232c7a,_0x255632){this['dealData'](0x3,[0xaa,0x1,0xff],_0x232c7a,_0x255632);}['setPenAutoOff'](_0x58160f,_0x3a2c40,_0x19214f){if(_0x58160f>0x78||_0x58160f<0x0){return console['error']('自动关机时间的范围为0~120');}this['dealData'](0x4,[0xb2,0x2,_0x58160f%0x100,_0x58160f/0x100],_0x3a2c40,_0x19214f);}['getPenAutoOff'](_0x2b0cfe,_0x3cc5ea){this['dealData'](0x3,[0xb0,0x1,0xff],_0x2b0cfe,_0x3cc5ea);}['getPenMemory'](_0x2e9ecb,_0x3896aa){this['dealData'](0x3,[0xb6,0x1,0xff],_0x2e9ecb,_0x3896aa);}['getPenClickMode'](_0x100ce0,_0x17b29e){this['dealData'](0x3,[0xb8,0x1,0xff],_0x100ce0,_0x17b29e);}['setPenClickMode'](_0x4d0fbe,_0x55749d,_0xade3c9){this['dealData'](0x3,[0xba,0x1,_0x4d0fbe?0x1:0x0],_0x55749d,_0xade3c9);}['setPenBeep'](_0x42ef0c,_0x57fdb5,_0x1f3599){this['dealData'](0x3,[0xbe,0x1,_0x42ef0c?0x1:0x0],_0x57fdb5,_0x1f3599);}['getPenBeep'](_0x28bd0e,_0x23e46f){this['dealData'](0x3,[0xbc,0x1,0xff],_0x28bd0e,_0x23e46f);}['restoreFactory'](_0xe6b657,_0x388dab){this['dealData'](0x3,[0xb4,0x1,0xff,_0xe6b657,_0x388dab]);}['setPenSensor'](_0x169fa0,_0x3a8cb7,_0x211c6d){this['dealData'](0x3,[0xd2,0x1,_0x169fa0],_0x3a8cb7,_0x211c6d);}['getPenSensor'](_0x3bead9,_0x29a9e1){this['dealData'](0x3,[0xd0,0x1,0xff],_0x3bead9,_0x29a9e1);}['setPenLedColor'](_0x4bc918,_0x108bf3,_0x504948){this['dealData'](0x3,[0xd6,0x1,_0x4bc918],_0x108bf3,_0x504948);}['getPenLedColor'](_0x34cdc3,_0x1956b3){this['dealData'](0x3,[0xd4,0x1,0xff],_0x34cdc3,_0x1956b3);}['getPenSensorRegulate'](_0x54e732,_0x38c912){this['dealData'](0x3,[0xd8,0x1,0xff],_0x54e732,_0x38c912);}['getMCUVersion'](_0x49fa6f,_0x29b4f8){this['dealData'](0x3,[0xda,0x1,0xff],_0x49fa6f,_0x29b4f8);}['getPenModal'](_0x4ec41b,_0x1e64fd){this['dealData'](0x3,[0xe4,0x1,0xff],_0x4ec41b,_0x1e64fd);}['getPenPointType'](_0x5e2742,_0x5afa5c){this['dealData'](0x3,[0xe6,0x1,0xff],_0x5e2742,_0x5afa5c);}['setLedConfig'](_0xa2e61d,_0x1a4f74,_0x105832){this['dealData'](0x3,[0xee,0x1,_0xa2e61d?0x1:0x0],_0x1a4f74,_0x105832);}['getLedConfig'](_0x34d747,_0x161eac){this['dealData'](0x3,[0xec,0x1,0xff],_0x34d747,_0x161eac);}['getPenOfflineDataSize'](_0x2d64b3,_0x1d6fc2){this['dealData'](0x3,[0xc0,0x1,0xff],_0x2d64b3,_0x1d6fc2);}['startGetOfflineData'](_0x38c41a,_0x1dbecc){this['dealData'](0x3,[0xc2,0x1,0x0],_0x38c41a,_0x1dbecc);}['stopGetOfflineData'](_0x4cc622,_0xf9b3b3){this['dealData'](0x3,[0xc2,0x1,0x1],_0x4cc622,_0xf9b3b3);}['pauseGetOfflineData'](_0x10c054,_0x5d4530){this['dealData'](0x3,[0xcb,0x1,0x0],_0x10c054,_0x5d4530);}['continueGetOfflineData'](_0xbae317,_0x40c373){this['dealData'](0x3,[0xcb,0x1,0x1],_0xbae317,_0x40c373);}['deleteOfflineData'](_0x271f8c,_0x161819){this['dealData'](0x3,[0xc8,0x1,0xff],_0x271f8c,_0x161819);}['confirmOfflineDataDone'](_0x3e3d04,_0x5b39f2){this['dealData'](0x3,[0xc6,0x1,this['finishFlag']?0x0:0x1],_0x3e3d04,_0x5b39f2);}['getCustomerId'](_0x317340,_0x54f450){this['dealData'](0x3,[0xdc,0x1,0xff],_0x317340,_0x54f450);}['getOIDValue'](_0x2371f3,_0x150ab3){this['dealData'](0x3,[0xe0,0x1,0xff],_0x2371f3,_0x150ab3);}['otaUpdate'](_0x55bc10,_0x213810){this['dealData'](0x3,[0xf4,0x1,0xff],_0x55bc10,_0x213810);}}const ab2hex=_0x73da79=>{return Array['prototype']['map']['call'](new Uint8Array(_0x73da79),_0x161b38=>('00'+_0x161b38['toString'](0x10))['slice'](-0x2));};const hex2Bytes=_0x21e9e1=>{return _0x21e9e1['map'](_0x5d6ea8=>{return parseInt(_0x5d6ea8,0x10);});};const getDataInfo=(_0x289a54,_0x538ed2)=>{const _0x500217={};let _0x4c70af=0x0;let _0x175181=_0x289a54['slice'](0x2,_0x4c70af+0x2);switch(_0x289a54[0x0]){case 0xa1:_0x4c70af=_0x289a54[0x1]&0xff;_0x175181=byteToString(_0x289a54['slice'](0x2,_0x4c70af+0x2));emitData({'data':_0x175181,'cmd':'getPenName'});break;case 0xa3:if(_0x289a54[0x2]===0x0){emitData({'cmd':'setPenName','data':!![]});}else{emitData({'cmd':'setPenName','data':![]});}break;case 0xa5:let _0x56113b=_0x289a54['slice'](0x2,_0x289a54['length'])['map'](_0x405972=>{return MAC(_0x405972);})['join'](':');emitData({'cmd':'getMacAddress','data':_0x56113b});break;case 0xa7:let _0xf52e41=byteToString(_0x289a54['slice'](0x2,_0x289a54['length']));emitData({'cmd':'getBlueToothVersion','data':_0xf52e41});break;case 0xa9:let _0x2e5842=_0x289a54[0x2]&0xff;let _0x37ddaa=_0x289a54[0x3]===0x1;emitData({'cmd':'getPenBattery','data':{'penBattery':_0x2e5842+'%','penIsCharging':_0x37ddaa}});break;case 0xab:const _0x2dea03=0x125e5770400;let _0x5926b6=new Date()['getTime']();let _0x5b4f97=_0x289a54[0x2]&0xff|_0x289a54[0x3]<<0x8&0xff00|_0x289a54[0x4]<<0x10&0xff0000|_0x289a54[0x5]<<0x18&0xff000000;let _0x51409e=(_0x5926b6-_0x2dea03)/0x3e8;let _0x4e1763=_0x51409e-_0x5b4f97;console['log'](_0x4e1763,'时间差');penDataHandle['changeOffset'](_0x4e1763);emitData({'cmd':'getRTCtime','data':_0x5b4f97*0x3e8+_0x2dea03});break;case 0xad:emitData({'cmd':'setRTCtime','data':_0x289a54[0x2]===0x0});break;case 0xb1:_0x175181=_0x289a54['slice'](0x2,0x4);let _0x4d335e=_0x175181[0x0]&0xff|_0x175181[0x1]<<0x8&0xff00;emitData({'cmd':'getPenAutoShutDownTime','data':_0x4d335e});break;case 0xb3:emitData({'cmd':'setPenAutoOff','data':_0x289a54[0x2]===0x0});break;case 0xb5:emitData({'cmd':'RestoreFactorySettings','data':_0x289a54[0x2]===0x0});break;case 0xb7:emitData({'cmd':'getUsedMemory','data':_0x289a54[0x2]&0xff+'%'});break;case 0xb9:emitData({'cmd':'getPenClickMode','data':_0x289a54[0x2]===0x1});break;case 0xbb:emitData({'cmd':'setPenClickMode','data':_0x289a54[0x2]===0x0});break;case 0xbd:emitData({'cmd':'getPenBeep','data':_0x289a54[0x2]===0x1});break;case 0xbf:emitData({'cmd':'setPenBeep','data':_0x289a54[0x2]===0x0});break;case 0xd1:emitData({'cmd':'getPenSensor','data':_0x289a54[0x2]&0xff});break;case 0xd3:emitData({'cmd':'setPenSensor','data':_0x289a54[0x2]===0x0});break;case 0xd5:emitData({'cmd':'getLEDColor','data':_0x289a54[0x2]&0xff});break;case 0xd9:var _0x17a34d='20g:'+((_0x289a54[0x3]<<0x8&0xff00)+(_0x289a54[0x2]&0xff))+'300g:'+((_0x289a54[0x5]<<0x8&0xff00)+(_0x289a54[0x4]&0xff));emitData({'cmd':'getSensitivityCorrection','data':_0x17a34d});break;case 0xdb:_0x4c70af=_0x289a54[0x1]&0xff;_0x175181=_0x289a54['slice'](0x2,_0x4c70af+0x2);var _0x237873=_0x289a54[0x2]&0xff;var _0x480feb='';if(_0x237873){_0x480feb='MCUF_'+'R'+(_0x289a54[0x4]&0xff*0xa)+(_0x289a54[0x5]&0xff)+(_0x500217[0x6]&0xff);}else{_0x480feb='MCUF_'+'B'+(_0x289a54[0x4]&0xff)+(_0x289a54[0x5]&0xff)+(_0x289a54[0x6]&0xff);}emitData({'cmd':'getMCUVersion','data':_0x480feb});break;case 0xe1:let _0x5afdac=0x0;let _0x48b64f=_0x289a54[0x2]>>0x7&0x1;if(_0x48b64f==0x1){let _0x449ffb=_0x289a54[0x8]<<0x28;let _0x3ac549=_0x289a54[0x9]<<0x20;_0x5afdac=(_0x449ffb&0x3f0000000000)+(_0x3ac549&0xff00000000)+(_0x289a54[0xa]<<0x18&0xff000000)+(_0x289a54[0xb]<<0x10&0xf0000)+(_0x289a54[0xc]<<0x8&0xff00)+(_0x289a54[0xd]&0xff);}else if(_0x48b64f==0x0){_0x5afdac=(_0x289a54[0xa]&0xff)<<0x18|_0x289a54[0xb]<<0x10|_0x289a54[0xc]<<0x8|_0x289a54[0xd];}else{}if(_0x5afdac==0x0){return;}if((_0x289a54[0x2]&0x10)!=0x0){return;}emitData({'cmd':'getOID4CodeValue','data':_0x5afdac});break;case 0xf0:let _0x4e61a7=_0x289a54['slice'](0x2,_0x289a54['length']);emitData({'cmd':'penColor','data':_0x4e61a7});break;case 0xe5:switch(_0x289a54[0x2]){case 0x0:utils['changeDistanceAndAngle'](3.3641,0x11);break;case 0x1:utils['changeDistanceAndAngle'](2.9431,0xb4);break;case 0x2:utils['changeDistanceAndAngle'](2.9431,0xb4);break;case 0x3:utils['changeDistanceAndAngle'](4.3841,0x11);break;case 0x8:event['emit']('130',!![]);utils['changeDistanceAndAngle'](2.8,0xb4);break;case 0x9:event['emit']('130',!![]);utils['changeDistanceAndAngle'](2.8,0xb4);break;case 0x10:event['emit']('130',!![]);utils['changeDistanceAndAngle'](2.5,0xb4);break;default:break;}break;case 0xeb:var _0x2dc8b9='';switch(_0x289a54[0x2]){case 0x0:_0x2dc8b9='OID3';break;case 0x1:_0x2dc8b9='OID4';break;default:break;}emitData({'cmd':'getCodePointType','data':_0x2dc8b9});break;case 0xc1:let _0x6dc776=_0x289a54['slice'](0x2,_0x289a54['length']);console['log'](_0x289a54,'lpdata');let _0x585450=parseInt((_0x6dc776[0x3]<<0x18&0xff000000|_0x6dc776[0x2]<<0x10&0xff0000|_0x6dc776[0x1]<<0x8&0xff00|_0x6dc776[0x0]&0xff)/0xa);_0x538ed2['offlineDataNum']=_0x585450;emitData({'cmd':'getOfflineDataNum','data':_0x585450});break;case 0xc3:if(_0x289a54[0x2]===0x0){emitData({'cmd':'startGetOffline','data':!![]});}else{emitData({'cmd':'startGetOffline','data':![]});}break;case 0xc4:_0x538ed2['gofflineDataProgress']=0x0;console['log'](_0x538ed2);emitData({'cmd':'offLineProgressStop','data':_0x289a54[0x2]===0x0});break;case 0xcc:emitData({'cmd':'offLineProgressPause','data':_0x289a54[0x2]===0x0});break;case 0xcd:emitData({'cmd':'offLineProgressContinue','data':_0x289a54[0x2]===0x0});break;case 0xc5:_0x538ed2['finishFlag']=_0x289a54[0x2]===0x0;setTimeout(()=>{emitData({'cmd':'offLineProgressFinish','data':_0x289a54[0x2]===0x0?'100%':![]});_0x538ed2['gofflineDataProgress']=0x0;},0x3e8);break;case 0xc7:emitData({'cmd':'offLineDataConfirm','data':_0x289a54[0x2]===0x0});break;case 0xc9:emitData({'cmd':'offLineDataDelete','data':_0x289a54[0x2]===0x0});break;case 0xdd:let _0x1156bc=_0x289a54[0x2]&0xff|_0x500217[0x3]<<0x8&0xff00;let _0x4c7e0f=_0x289a54[0x4]&0xff|_0x500217[0x5]<<0x8&0xff00;emitData({'cmd':'customerId','data':_0x1156bc+'-'+_0x4c7e0f});break;case 0xf5:break;}};const byteToString=_0x31a319=>{if(typeof _0x31a319==='string'){return _0x31a319;}var _0x1df4ae='',_0xb05675=_0x31a319;for(var _0xce0c5b=0x0;_0xce0c5b<_0xb05675['length'];_0xce0c5b++){var _0x2e4e76=_0xb05675[_0xce0c5b]['toString'](0x2),_0x2d8a95=_0x2e4e76['match'](/^1+?(?=0)/);if(_0x2d8a95&&_0x2e4e76['length']==0x8){var _0x38c492=_0x2d8a95[0x0]['length'];var _0x5ac410=_0xb05675[_0xce0c5b]['toString'](0x2)['slice'](0x7-_0x38c492);for(var _0x22f65b=0x1;_0x22f65b<_0x38c492;_0x22f65b++){_0x5ac410+=_0xb05675[_0x22f65b+_0xce0c5b]['toString'](0x2)['slice'](0x2);}_0x1df4ae+=String['fromCharCode'](parseInt(_0x5ac410,0x2));_0xce0c5b+=_0x38c492-0x1;}else{_0x1df4ae+=String['fromCharCode'](_0xb05675[_0xce0c5b]);}}return _0x1df4ae;};const emitData=_0xe61d36=>{event['emit']('penData',_0xe61d36);};const strToUtf8=_0x43aea6=>{const _0x212e20=[];for(let _0x5a4e38=0x0;_0x5a4e38<_0x43aea6['length'];_0x5a4e38++){let _0x2231a6=_0x43aea6['charCodeAt'](_0x5a4e38);if(_0x2231a6<0x80)_0x212e20['push'](_0x2231a6);else if(_0x2231a6<0x800){_0x212e20['push'](0xc0|_0x2231a6>>0x6,0x80|_0x2231a6&0x3f);}else if(_0x2231a6<0xd800||_0x2231a6>=0xe000){_0x212e20['push'](0xe0|_0x2231a6>>0xc,0x80|_0x2231a6>>0x6&0x3f,0x80|_0x2231a6&0x3f);}else{_0x5a4e38++;_0x2231a6=0x10000+((_0x2231a6&0x3ff)<<0xa|_0x43aea6['charCodeAt'](_0x5a4e38)&0x3ff);_0x212e20['push'](0xf0|_0x2231a6>>0x12,0x80|_0x2231a6>>0xc&0x3f,0x80|_0x2231a6>>0x6&0x3f,0x80|_0x2231a6&0x3f);}}for(let _0x4d33ce=0x0;_0x4d33ce<_0x212e20['length'];_0x4d33ce++){var _0x5bcbf1=_0x212e20[_0x4d33ce];if(_0x5bcbf1>0x7f){_0x212e20[_0x4d33ce]=_0x5bcbf1-0x100;}}return _0x212e20;};const MAC=_0x124dc1=>{let _0x1eb232=changeData(Math['floor'](_0x124dc1/0x10));let _0x45dcb5=changeData(_0x124dc1%0x10);return _0x1eb232+_0x45dcb5;};function changeData(_0x48b6b2){let _0x15902c=null;if(_0x48b6b2>=0xa){switch(_0x48b6b2){case 0xa:_0x15902c='A';break;case 0xb:_0x15902c='B';break;case 0xc:_0x15902c='C';break;case 0xd:_0x15902c='D';break;case 0xe:_0x15902c='E';break;case 0xf:_0x15902c='F';break;default:break;}}else{_0x15902c=_0x48b6b2+'';}return _0x15902c;}class Queue{constructor(){this['dataStore']=[];}['enqueue'](_0x5d4183){this['dataStore']['push'](_0x5d4183);}['dequeue'](){return this['dataStore']['shift']();}['front'](){return this['dataStore'][0x0];}['back'](){return this['dataStore'][this['dataStore']['length']-0x1];}['getLength'](){return this['dataStore']['length'];}['empty'](){return this['dataStore']['length']===0x0;}['toString'](){let _0x68f536='';this['dataStore']['forEach'](_0x25d711=>{_0x68f536+=_0x25d711+'\x0a';});return _0x68f536;}}function hexToArray(_0x3ad59a){return new Uint8Array(_0x3ad59a['match'](/[\da-f]{2}/gi)['map'](function(_0x31723f){return parseInt(_0x31723f,0x10);}))['buffer'];}const buf2hex=_0x447fa3=>{return Array['prototype']['map']['call'](new Uint8Array(_0x447fa3),_0x57eb24=>('00'+_0x57eb24['toString'](0x10))['slice'](-0x2))['join']('');};function sleep(_0x39c447){return new Promise(_0x3a11de=>setTimeout(_0x3a11de,_0x39c447));}export{AllSDK};