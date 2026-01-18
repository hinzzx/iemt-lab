// eslint-disable-next-line @typescript-eslint/no-require-imports
const os = require('os');

function getLocalIPv4() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({ name, address: iface.address });
      }
    }
  }

  return addresses;
}

const addresses = getLocalIPv4();

console.log('\n' + '═'.repeat(60));
console.log('  🌐 Network Access for Mobile Testing');
console.log('═'.repeat(60));
console.log('  Local:    http://localhost:3000');

if (addresses.length > 0) {
  addresses.forEach(({ name, address }) => {
    // Skip virtual adapters (VirtualBox, VMware, etc.)
    const isVirtual = name.toLowerCase().includes('virtual') || 
                      name.toLowerCase().includes('vmware') ||
                      address.startsWith('192.168.56.');
    
    if (!isVirtual) {
      console.log(`  Network:  http://${address}:3000  ← Use this on your phone`);
    } else {
      console.log(`  Virtual:  http://${address}:3000  (${name})`);
    }
  });
} else {
  console.log('  Network:  No network interfaces found');
}

console.log('═'.repeat(60));
console.log('  📱 Connect your phone to the same WiFi and open the Network URL');
console.log('═'.repeat(60) + '\n');
