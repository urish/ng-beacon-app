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

  sendProgram(payload: string, reset = false) {
    let code = `\nE.setBootCode(${JSON.stringify(payload)}, true)\nload()\n`;
    if (reset) {
      code += "\nreset()\n";
    }
    return this.uart.sendText(code);
  }

  uploadEddystone(params: BeaconParams) {
    const advertiseParams = {
      name: params.name,
      interval: 250
    }

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
          'ngbeacon.io'
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

    this.sendProgram(`NRF.setAdvertising(${JSON.stringify(advertiseData)}, ${JSON.stringify(advertiseParams)});NRF.setScanResponse(${JSON.stringify(scanResponseData)});`);
  }

  uploadTemperature(params: BeaconParams) {
    const advertiseParams = {
      name: params.name,
      interval: 250
    }

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

    this.sendProgram(`NRF.setAdvertising(${JSON.stringify(advertiseData)}, ${JSON.stringify(advertiseParams)});${temperatureFirmware};tempSensor();`, true);
  }

  uploadIBeacon(params: BeaconParams) {
    const advertiseParams = {
      name: params.name,
      interval: 250
    }

    const major = 10000;
    const minor = 1;

    const advertiseData = this.bluetoothUtils.encodeAdvPacket([{
        type: GapAdType.manufacturerSpecificData,
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
        type: GapAdType.CompleteLocalName,
        data: [params.name]
      },
      {
        type: GapAdType.IncompleteListOf128BitServiceUuids,
        data: this.bluetoothUtils.uuidToBytes(BleUartService.UART_SERVICE)
      }
    ]);

    this.sendProgram(`NRF.setAdvertising(${JSON.stringify(advertiseData)}, ${JSON.stringify(advertiseParams)});NRF.setScanResponse(${JSON.stringify(scanResponseData)});`);
  }
}