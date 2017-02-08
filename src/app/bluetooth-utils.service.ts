import { Injectable } from '@angular/core';

export interface IBLEPacketPart {
  type: number;
  data: any[];
}

@Injectable()
export class BluetoothUtilsService {
  encodeAdvPacket(parts: IBLEPacketPart[]) {
    let result = [];
    for (let part of parts) {
      let encoded = [0, part.type];
      for (let element of part.data) {
        if (typeof element === 'string') {
          encoded.push(...element.split('').map(ch => ch.charCodeAt(0)));
        }
        if (typeof element === 'number') {
          encoded.push(element);
        }
      }
      encoded[0] = encoded.length - 1;
      if (encoded.length + result.length <= 31) {
        result.push(...encoded);
      }
    }
    return result;
  }
}