import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/zip';

import {
  BluetoothCore,
  BluetoothRemoteGATTServer,
  BluetoothRemoteGATTService,
  BluetoothRemoteGATTCharacteristic,
  DataView
} from '@manekinekko/angular-web-bluetooth';

@Injectable()
export class NgBeaconService {
  static UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
  static UART_RX = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
  static UART_TX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

  receive$: Observable<string>;
  lines$: Observable<string>;
  writable$: Observable<boolean>;

  private rxCharacteristic: BluetoothRemoteGATTCharacteristic;
  private writableSubject = new BehaviorSubject<boolean>(false);

  constructor(private ble: BluetoothCore) {
    this.writable$ = this.writableSubject.asObservable();
  }

  connect() {
    return this.ble
      .discover$({ filters: [{services: [NgBeaconService.UART_SERVICE]}] })
      .mergeMap((gatt: BluetoothRemoteGATTServer) => {
        return this.ble.getPrimaryService$(gatt, NgBeaconService.UART_SERVICE);
      })
      .mergeMap((primaryService: BluetoothRemoteGATTService) => {
        return this.connectRxTx(primaryService);
      });
  }

  sendText(text: string) {
    const bytes = text.split('').map(c => c.charCodeAt(0));
    const chunks = [];
    while (bytes.length > 0) {
      chunks.push(new Uint8Array(bytes.splice(0, 20)));
    }
    const result = Observable.zip(Observable.from(chunks), this.writableSubject.filter(value => value))
      .mergeMap(([chunk, writable]) => {
        this.writableSubject.next(false);
        return this.ble.writeValue$(this.rxCharacteristic, chunk)
      })
      .map(() => this.writableSubject.next(true))
      .publish();
    result.connect();
    return result;
  }

  sendProgram(code: string) {
    console.log('writing program', code);
    return this.sendText(`\nE.setBootCode(${JSON.stringify(code)}, true)\nload()\n`);
  }

  private connectRxTx(primaryService: BluetoothRemoteGATTService) {
    return Observable.zip(
      // RX
      this.ble
        .getCharacteristic$(primaryService, NgBeaconService.UART_RX)
        .map((characteristic: BluetoothRemoteGATTCharacteristic) => { 
            this.rxCharacteristic = characteristic;
          }),

      // TX
      this.ble.getCharacteristic$(primaryService, NgBeaconService.UART_TX)
        .map((characteristic: BluetoothRemoteGATTCharacteristic) => {
          this.receive$ = this.ble
            .streamValues$()
            .map(value => String.fromCharCode.apply(null, new Uint8Array(value.buffer)) as string);
          var chars = this.receive$.concatMap(chunk => chunk.split(''));
          this.lines$ = chars.scan((acc, curr) => acc[acc.length-1] === '\n' ? curr : acc + curr)
            .filter(item => item.indexOf('\n') >= 0);
        })
    ).do(() => {
      this.writableSubject.next(true);
    });
  }
}
