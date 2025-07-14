import { BleManager } from 'react-native-ble-plx';

class BleService {
  private manager = new BleManager();

  startScan(onDiscover: (coord: [number, number]) => void) {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.warn('BLE scan error:', error);
        return;
      }
      // TODO: Replace dummy coords parsing with actual data
      const lat = 37.78825 + Math.random() * 0.001;
      const lon = -122.4324 + Math.random() * 0.001;
      onDiscover([lon, lat]);
    });
  }
}

export default new BleService();
