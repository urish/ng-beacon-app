import { Component } from '@angular/core';

import { NgBeaconService } from './ng-beacon.service';
import { BluetoothUtilsService } from './bluetooth-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  connecting = false;
  connected = false;
  beaconVersion = '';
  batteryVoltage = 0;
  beaconUptime = 0;
  beaconName = 'ng-beacon';
  beaconUrl = 'ngbeacon.io';
  debugLog = '';

  constructor(private ngBeacon: NgBeaconService, private bluetoothUtils: BluetoothUtilsService) {}

  connect() {
    this.connecting = true;
    this.beaconVersion = '';
    this.ngBeacon.connect()
      .finally(() => {
        this.connecting = false;
      })
      .subscribe(() => {
        this.connected = true;
        this.ngBeacon.uart.receive$.subscribe(value => this.debugLog += value);
        this.ngBeacon.uart.lines$.subscribe(line => {
          if (line.startsWith('["~$",')) {
            const [_, battery, uptime, version] = JSON.parse(line);
            this.beaconVersion = version;
            this.batteryVoltage = battery;
            this.beaconUptime = uptime;
          }
        });
        this.ngBeacon.uart.sendText(`\nprint(JSON.stringify(['~$',NRF.getBattery(),getTime()|0,process.env.VERSION]))\n`);
      });
  }

  disconnect() {
    this.ngBeacon.disconnect();
    this.clearLog();
    this.connected = false;
  }

  clearLog() {
    this.debugLog = '';
  }

  reset() {
    this.ngBeacon.uart.sendText('\nreset()\n');
  }

  get deviceName() {
    return this.ngBeacon.deviceName;
  }

  uploadEddystone() {
    this.ngBeacon.uploadEddystone({name: this.beaconName}, this.beaconUrl);
  }

  uploadTemperature() {
    this.ngBeacon.uploadTemperature({name: this.beaconName});
  }

  uploadIBeacon() {
    this.ngBeacon.uploadIBeacon({name: this.beaconName});
  }

  readTemperature() {
    this.ngBeacon.uart.sendText(`ngbeacon.temperature()\n ngbeacon.humidity()\n`);
  }
}
