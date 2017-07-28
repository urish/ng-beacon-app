import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/zip';

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

  constructor() {
    this.writable$ = this.writableSubject.asObservable();
  }

  async connect() {
    const device = await navigator.bluetooth.requestDevice({ filters: [{ services: [BleUartService.UART_SERVICE] }] });
    this.gatt = await device.gatt.connect();
    const uartService = await this.gatt.getPrimaryService(BleUartService.UART_SERVICE);
    await this.connectRxTx(uartService);
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
        return Observable.from(this.rxCharacteristic.writeValue(chunk));
      })
      .map(() => setTimeout(() => this.writableSubject.next(true), 10))
      .publish();
    result.connect();
    return result;
  }

  private async connectRxTx(primaryService: BluetoothRemoteGATTService) {
    this.rxCharacteristic = await primaryService.getCharacteristic(BleUartService.UART_RX);
    const txChar = await primaryService.getCharacteristic(BleUartService.UART_TX);
    this.receive$ = Observable.fromEvent(txChar, 'characteristicvaluechanged')
      .map(value => String.fromCharCode.apply(null, new Uint8Array(txChar.value.buffer)))
      .takeUntil(Observable.fromEvent(this.gatt.device, 'gattserverdisconnected'))
      .finally(() => txChar.stopNotifications())
      .share();
    await txChar.startNotifications();

    const chars = this.receive$.concatMap(chunk => chunk.split(''));
    this.lines$ = chars.scan((acc, curr) => acc[acc.length - 1] === '\n' ? curr : acc + curr)
      .filter(item => item.indexOf('\n') >= 0);

    setTimeout(() => this.writableSubject.next(true), 0);
  }
}
