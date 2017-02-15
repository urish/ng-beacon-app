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

import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@Injectable()
export class BleUartService {
  static UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
  static UART_RX = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
  static UART_TX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

  receive$: Observable<string>;
  lines$: Observable<string>;
  writable$: Observable<boolean>;
  gatt: BluetoothRemoteGATTServer;

  private rxCharacteristic: BluetoothRemoteGATTCharacteristic;
  private writableSubject = new BehaviorSubject<boolean>(false);

  constructor(private ble: BluetoothCore) {
    this.writable$ = this.writableSubject.asObservable();
  }

  connect() {
    return this.ble
      .discover$({ filters: [{ services: [BleUartService.UART_SERVICE] }] })
      .mergeMap(gatt => {
        this.gatt = gatt;
        return this.ble.getPrimaryService$(gatt, BleUartService.UART_SERVICE);
      })
      .mergeMap(primaryService => this.connectRxTx(primaryService));
  }

  disconnect() {
    this.gatt.disconnect();
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
      .map(() => setTimeout(() => this.writableSubject.next(true), 10))
      .publish();
    result.connect();
    return result;
  }

  private connectRxTx(primaryService: BluetoothRemoteGATTService) {
    const txChar = this.ble.getCharacteristic$(primaryService, BleUartService.UART_TX).share();
 
    this.receive$ = txChar.mergeMap(characteristic => this.ble.observeValue$(characteristic))
      .map(value => String.fromCharCode.apply(null, new Uint8Array(value.buffer)) as string);

    let chars = this.receive$.concatMap(chunk => chunk.split(''));
    this.lines$ = chars.scan((acc, curr) => acc[acc.length - 1] === '\n' ? curr : acc + curr)
      .filter(item => item.indexOf('\n') >= 0)

    return Observable.zip(
      // RX
      this.ble
        .getCharacteristic$(primaryService, BleUartService.UART_RX)
        .map((characteristic: BluetoothRemoteGATTCharacteristic) => {
          this.rxCharacteristic = characteristic;
        }),

      // TX
      txChar
    ).do(([rx, tx]) => {
      this.writableSubject.next(true);
    });
  }
}
