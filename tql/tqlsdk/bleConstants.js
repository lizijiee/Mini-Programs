const BleConstants = { '\x50\x45\x4e\x5f\x54\x31\x30\x31': 0x0, '\x50\x45\x4e\x5f\x54\x31\x31\x31': 0x1, '\x50\x45\x4e\x5f\x54\x31\x31\x32': 0x2, '\x50\x45\x4e\x5f\x54\x31\x30\x31\x41': 0x3,'\x50\x45\x4e\x5f\x54\x32\x30\x31': 0x10 };
const AngularCorrection = { '\x50\x45\x4e\x4c\x45\x4e\x5f\x44\x49\x53\x54\x41\x4e\x43\x45\x5f\x31\x30\x31': 3.3641, '\x41\x4e\x47\x4c\x45\x4f\x46\x46\x53\x45\x54\x5f\x31\x30\x31': 0x11,
 '\x50\x45\x4e\x4c\x45\x4e\x5f\x44\x49\x53\x54\x41\x4e\x43\x45\x5f\x31\x30\x31\x41': 3.3641, '\x41\x4e\x47\x4c\x45\x4f\x46\x46\x53\x45\x54\x5f\x31\x30\x31\x41': 0x11,
  '\x50\x45\x4e\x4c\x45\x4e\x5f\x44\x49\x53\x54\x41\x4e\x43\x45\x5f\x31\x31\x31': 2.9431, '\x41\x4e\x47\x4c\x45\x4f\x46\x46\x53\x45\x54\x5f\x31\x31\x31': 0xB4, 
  '\x50\x45\x4e\x4c\x45\x4e\x5f\x44\x49\x53\x54\x41\x4e\x43\x45\x5f\x31\x31\x32': 2.9431, '\x41\x4e\x47\x4c\x45\x4f\x46\x46\x53\x45\x54\x5f\x31\x31\x32': 0xB4,
  '\x50\x45\x4e\x4c\x45\x4e\x5f\x44\x49\x53\x54\x41\x4e\x43\x45\x5f\x32\x30\x31': 2.5, '\x41\x4e\x47\x4c\x45\x4f\x46\x46\x53\x45\x54\x5f\x32\x30\x31': 0xB4  }; 
module['exports'] = { '\x42\x6c\x65\x43\x6f\x6e\x73\x74\x61\x6e\x74\x73': BleConstants, '\x41\x6e\x67\x75\x6c\x61\x72\x43\x6f\x72\x72\x65\x63\x74\x69\x6f\x6e': AngularCorrection };