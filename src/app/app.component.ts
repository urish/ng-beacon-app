import { Component } from '@angular/core';

import { NgBeaconService } from './ng-beacon.service';
import { BluetoothUtilsService } from './bluetooth-utils.service';

const temperatureFirmware = require('text-loader!../firmware/temperature.min.js') as string;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  connecting = false;
  connected = false;
  beaconInfo = '';
  beaconName = 'ng-beacon';

  constructor(private ngBeacon: NgBeaconService, private bluetoothUtils: BluetoothUtilsService) {}

  connect() {
    this.connecting = true;
    this.ngBeacon.connect()
      .subscribe(() => {
        this.connecting = false;
        this.connected = true;
        this.ngBeacon.receive$.subscribe(value => console.log('recv', value));
        this.ngBeacon.lines$.subscribe(line => {
          if (line.indexOf('VERSION') >= 0) {
            this.beaconInfo += line;
          }
          if (line.indexOf('SERIAL') >= 0) {
            this.beaconInfo += line;
          }
        });
        this.ngBeacon.sendText('\nprocess.env\n');
      });
  }

  uploadEddystone() {
    const advertiseParams = {
      name: this.beaconName,
      interval: 250
    }

    const advertiseData = this.bluetoothUtils.encodeAdvPacket([
      {
        type: 0x3, // Service list
        data: [0xaa, 0xfe], // Eddystone ID
      },
      {
        type: 0x16, // Service Data
        data: [
          0xaa, 0xfe, // Eddystone
          0x10, // frame type: URL
          0xf8, // Power
          0x03, // https://
          'ibeacon.io'
        ]
      }
    ]);

    const scanResponseData = this.bluetoothUtils.encodeAdvPacket([
      {
        type: 9, // complete local name,
        data: [this.beaconName]
      },
      {
        type: 0x6, // 128-bit uuid list,
        // this is the UUID of Nordic UART service:
        data: [0x9e, 0xca, 0xdc, 0x24, 0x0e, 0xe5, 0xa9, 0xe0, 0x93, 0xf3, 0xa3, 0xb5, 0x01, 0x00, 0x40, 0x6e]
      }
    ]);

    this.ngBeacon.sendProgram(`NRF.setAdvertising(${JSON.stringify(advertiseData)}, ${JSON.stringify(advertiseParams)});
NRF.setScanResponse(${JSON.stringify(scanResponseData)});`);
  }

  uploadTemperature() {
    const advertiseParams = {
      name: this.beaconName,
      interval: 250
    }

    const advertiseData = this.bluetoothUtils.encodeAdvPacket([
      {
        type: 0x3, // Service list
        data: [0x1a, 0x18], // Environment sensing service id
      },
      {
        type: 9, // complete local name
        data: [this.beaconName]
      }
    ]);

    this.ngBeacon.sendProgram(`NRF.setAdvertising(${JSON.stringify(advertiseData)}, ${JSON.stringify(advertiseParams)});${temperatureFirmware};tempSensor();`)
  }

  uploadIBeacon() {
    const advertiseParams = {
      name: this.beaconName,
      interval: 250
    }

    const major = 10000;
    const minor = 1;

    const advertiseData = this.bluetoothUtils.encodeAdvPacket([{
        type: 0xff, // Manufacturer data
        data: [
          0x4c, 0x00, // Apple ID
          0x02, // type: iBeacon
          0x15, // size of remaining data
          'ng-beacon rocks!', // UUID - must be 16 bytes
          major >> 8, major & 0xff,
          minor >> 8, minor & 0xff,
          -59, // RSSI: 1 meter distance, in dBm
        ], 
    }]);

    const scanResponseData = this.bluetoothUtils.encodeAdvPacket([
      {
        type: 9, // complete local name,
        data: [this.beaconName]
      },
      {
        type: 0x6, // 128-bit uuid list,
        // this is the UUID of Nordic UART service:
        data: [0x9e, 0xca, 0xdc, 0x24, 0x0e, 0xe5, 0xa9, 0xe0, 0x93, 0xf3, 0xa3, 0xb5, 0x01, 0x00, 0x40, 0x6e]
      }
    ]);

    this.ngBeacon.sendProgram(`NRF.setAdvertising(${JSON.stringify(advertiseData)}, ${JSON.stringify(advertiseParams)});NRF.setScanResponse(${JSON.stringify(scanResponseData)});`);
  }
}
