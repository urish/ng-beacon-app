import { Injectable } from '@angular/core';

export enum GapAdType {
  CompleteListOf16BitServiceUuids = 0x3,
  IncompleteListOf128BitServiceUuids = 0x6,
  CompleteLocalName = 0x9,
  ServiceData = 0x16,
  manufacturerSpecificData = 0xff
};


export interface IBLEPacketPart {
  type: GapAdType;
  data: any[];
}

@Injectable()
export class BluetoothUtilsService {
  encodeAdvPacket(parts: IBLEPacketPart[]) {
    const result = [];
    for (const part of parts) {
      const encoded = [0, part.type];
      for (const element of part.data) {
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

  uuidToBytes(uuid: string) {
    const hex = uuid.replace(/-/g, '');
    if (!/^[a-f0-9]{32}$/i.test(hex)) {
      throw new Error(`Invalid UUID: ${uuid}`);
    }
    return uuid.match(/[0-9a-f]{2}/ig).map(code => parseInt(code, 16)).reverse();
  }
}
