import { Injectable } from '@angular/core';

import { BleUartService } from './ble-uart.service';
import { BluetoothUtilsService, GapAdType } from './bluetooth-utils.service';

const temperatureFirmware = require('text-loader!../firmware/temperature.min.js') as string;

export class BeaconParams {
  name: string;
}

@Injectable()
export class NgBeaconService {
  constructor(public uart: BleUartService, private bluetoothUtils: BluetoothUtilsService) {
  }

  connect() {
    return this.uart.connect();
  }

  disconnect() {
    this.uart.disconnect();
  }

  get deviceName() {
    return this.uart.gatt ? this.uart.gatt.device.name : null;
  }

  sendProgram(payload: string) {
    const code = `\nE.setBootCode(${JSON.stringify(payload)}, true)\nload()\n`;
    return this.uart.sendText(code);
  }

  uploadEddystone(params: BeaconParams, url: string) {
    const advertiseParams = {
      name: params.name,
      interval: 250
    };

    url = url.replace(/^https?:\/\//i, '');

    const advertiseData = this.bluetoothUtils.encodeAdvPacket([
      {
        type: GapAdType.CompleteListOf16BitServiceUuids,
        data: [0xaa, 0xfe], // Eddystone ID
      },
      {
        type: GapAdType.ServiceData,
        data: [
          0xaa, 0xfe, // Eddystone
          0x10, // frame type: URL
          0xf8, // Power
          0x03, // https://
          url
        ]
      }
    ]);

    const scanResponseData = this.bluetoothUtils.encodeAdvPacket([
      {
        type: GapAdType.CompleteLocalName,
        data: [params.name]
      },
      {
        type: GapAdType.IncompleteListOf128BitServiceUuids,
        data: this.bluetoothUtils.uuidToBytes(BleUartService.UART_SERVICE)
      }
    ]);

    // tslint:disable-next-line max-line-length
    this.sendProgram(`NRF.setAdvertising(${JSON.stringify(advertiseData)}, ${JSON.stringify(advertiseParams)});NRF.setScanResponse(${JSON.stringify(scanResponseData)});`);
  }

  uploadTemperature(params: BeaconParams) {
    const advertiseParams = {
      name: params.name,
      interval: 250
    };

    const advertiseData = this.bluetoothUtils.encodeAdvPacket([
      {
        type: GapAdType.CompleteListOf16BitServiceUuids,
        data: [0x1a, 0x18], // Environment sensing service id
      },
      {
        type: GapAdType.CompleteLocalName,
        data: [params.name]
      }
    ]);

    this.sendProgram(`NRF.setAdvertising(${JSON.stringify(advertiseData)},${JSON.stringify(advertiseParams)});\n${temperatureFirmware};`);
  }

  uploadIBeacon(params: BeaconParams) {
    const advertiseParams = {
      name: params.name,
      interval: 250
    };

    const major = 10000;
    const minor = 1;

    const advertiseData = this.bluetoothUtils.encodeAdvPacket([{
        type: GapAdType.manufacturerSpecificData,
        data: [
          0x4c, 0x00, // Apple ID
          0x02, // type: iBeacon
          0x15, // size of remaining data
          'ng-beacon rocks!', // UUID - must be 16 bytes
          major >> 8, major & 0xff,  // tslint:disable-line no-bitwise
          minor >> 8, minor & 0xff,  // tslint:disable-line no-bitwise
          -59, // RSSI: 1 meter distance, in dBm
        ],
    }]);

    const scanResponseData = this.bluetoothUtils.encodeAdvPacket([
      {
        type: GapAdType.CompleteLocalName,
        data: [params.name]
      },
      {
        type: GapAdType.IncompleteListOf128BitServiceUuids,
        data: this.bluetoothUtils.uuidToBytes(BleUartService.UART_SERVICE)
      }
    ]);

    // tslint:disable-next-line max-line-length
    this.sendProgram(`NRF.setAdvertising(${JSON.stringify(advertiseData)}, ${JSON.stringify(advertiseParams)});NRF.setScanResponse(${JSON.stringify(scanResponseData)});`);
  }
}
