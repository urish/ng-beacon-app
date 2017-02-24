webpackJsonp([1,4],{

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GapAdType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BluetoothUtilsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GapAdType;
(function (GapAdType) {
    GapAdType[GapAdType["CompleteListOf16BitServiceUuids"] = 3] = "CompleteListOf16BitServiceUuids";
    GapAdType[GapAdType["IncompleteListOf128BitServiceUuids"] = 6] = "IncompleteListOf128BitServiceUuids";
    GapAdType[GapAdType["CompleteLocalName"] = 9] = "CompleteLocalName";
    GapAdType[GapAdType["ServiceData"] = 22] = "ServiceData";
    GapAdType[GapAdType["manufacturerSpecificData"] = 255] = "manufacturerSpecificData";
})(GapAdType || (GapAdType = {}));
;
var BluetoothUtilsService = (function () {
    function BluetoothUtilsService() {
    }
    BluetoothUtilsService.prototype.encodeAdvPacket = function (parts) {
        var result = [];
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            var encoded = [0, part.type];
            for (var _a = 0, _b = part.data; _a < _b.length; _a++) {
                var element = _b[_a];
                if (typeof element === 'string') {
                    encoded.push.apply(encoded, element.split('').map(function (ch) { return ch.charCodeAt(0); }));
                }
                if (typeof element === 'number') {
                    encoded.push(element);
                }
            }
            encoded[0] = encoded.length - 1;
            if (encoded.length + result.length <= 31) {
                result.push.apply(result, encoded);
            }
        }
        return result;
    };
    BluetoothUtilsService.prototype.uuidToBytes = function (uuid) {
        var hex = uuid.replace(/-/g, '');
        if (!/^[a-f0-9]{32}$/i.test(hex)) {
            throw new Error("Invalid UUID: " + uuid);
        }
        return uuid.match(/[0-9a-f]{2}/ig).map(function (code) { return parseInt(code, 16); }).reverse();
    };
    BluetoothUtilsService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], BluetoothUtilsService);
    return BluetoothUtilsService;
}());
//# sourceMappingURL=/home/uri/p/ng-beacon-app/src/bluetooth-utils.service.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_concatMap__ = __webpack_require__(784);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_concatMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_publish__ = __webpack_require__(786);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_publish___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_publish__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_scan__ = __webpack_require__(787);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_from__ = __webpack_require__(778);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_zip__ = __webpack_require__(783);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_zip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_zip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__manekinekko_angular_web_bluetooth__ = __webpack_require__(404);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BleUartService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var BleUartService = (function () {
    function BleUartService(ble) {
        this.ble = ble;
        this.writableSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.writable$ = this.writableSubject.asObservable();
    }
    BleUartService.prototype.connect = function () {
        var _this = this;
        return this.ble
            .discover$({ filters: [{ services: [BleUartService.UART_SERVICE] }] })
            .mergeMap(function (gatt) {
            _this.gatt = gatt;
            return _this.ble.getPrimaryService$(gatt, BleUartService.UART_SERVICE);
        })
            .mergeMap(function (primaryService) { return _this.connectRxTx(primaryService); });
    };
    BleUartService.prototype.disconnect = function () {
        this.gatt.disconnect();
    };
    BleUartService.prototype.sendText = function (text) {
        var _this = this;
        var bytes = text.split('').map(function (c) { return c.charCodeAt(0); });
        var chunks = [];
        while (bytes.length > 0) {
            chunks.push(new Uint8Array(bytes.splice(0, 20)));
        }
        var result = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].zip(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].from(chunks), this.writableSubject.filter(function (value) { return value; }))
            .mergeMap(function (_a) {
            var chunk = _a[0], writable = _a[1];
            _this.writableSubject.next(false);
            return _this.ble.writeValue$(_this.rxCharacteristic, chunk);
        })
            .map(function () { return setTimeout(function () { return _this.writableSubject.next(true); }, 10); })
            .publish();
        result.connect();
        return result;
    };
    BleUartService.prototype.connectRxTx = function (primaryService) {
        var _this = this;
        var txChar = this.ble.getCharacteristic$(primaryService, BleUartService.UART_TX).share();
        this.receive$ = txChar.mergeMap(function (characteristic) { return _this.ble.observeValue$(characteristic); })
            .map(function (value) { return String.fromCharCode.apply(null, new Uint8Array(value.buffer)); });
        var chars = this.receive$.concatMap(function (chunk) { return chunk.split(''); });
        this.lines$ = chars.scan(function (acc, curr) { return acc[acc.length - 1] === '\n' ? curr : acc + curr; })
            .filter(function (item) { return item.indexOf('\n') >= 0; });
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].zip(
        // RX
        this.ble
            .getCharacteristic$(primaryService, BleUartService.UART_RX)
            .map(function (characteristic) {
            _this.rxCharacteristic = characteristic;
        }), 
        // TX
        txChar).do(function (_a) {
            var rx = _a[0], tx = _a[1];
            _this.writableSubject.next(true);
        });
    };
    BleUartService.UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    BleUartService.UART_RX = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
    BleUartService.UART_TX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
    BleUartService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_11__manekinekko_angular_web_bluetooth__["b" /* BluetoothCore */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_11__manekinekko_angular_web_bluetooth__["b" /* BluetoothCore */]) === 'function' && _a) || Object])
    ], BleUartService);
    return BleUartService;
    var _a;
}());
//# sourceMappingURL=/home/uri/p/ng-beacon-app/src/ble-uart.service.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ble_uart_service__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__ = __webpack_require__(246);
/* unused harmony export BeaconParams */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgBeaconService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var temperatureFirmware = __webpack_require__(823);
var BeaconParams = (function () {
    function BeaconParams() {
    }
    return BeaconParams;
}());
var NgBeaconService = (function () {
    function NgBeaconService(uart, bluetoothUtils) {
        this.uart = uart;
        this.bluetoothUtils = bluetoothUtils;
    }
    NgBeaconService.prototype.connect = function () {
        return this.uart.connect();
    };
    NgBeaconService.prototype.disconnect = function () {
        this.uart.disconnect();
    };
    NgBeaconService.prototype.sendProgram = function (payload) {
        var code = "\nE.setBootCode(" + JSON.stringify(payload) + ", true)\nload()\n";
        return this.uart.sendText(code);
    };
    NgBeaconService.prototype.uploadEddystone = function (params, url) {
        var advertiseParams = {
            name: params.name,
            interval: 250
        };
        url = url.replace(/^https?:\/\//i, '');
        var advertiseData = this.bluetoothUtils.encodeAdvPacket([
            {
                type: __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["b" /* GapAdType */].CompleteListOf16BitServiceUuids,
                data: [0xaa, 0xfe],
            },
            {
                type: __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["b" /* GapAdType */].ServiceData,
                data: [
                    0xaa, 0xfe,
                    0x10,
                    0xf8,
                    0x03,
                    url
                ]
            }
        ]);
        var scanResponseData = this.bluetoothUtils.encodeAdvPacket([
            {
                type: __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["b" /* GapAdType */].CompleteLocalName,
                data: [params.name]
            },
            {
                type: __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["b" /* GapAdType */].IncompleteListOf128BitServiceUuids,
                data: this.bluetoothUtils.uuidToBytes(__WEBPACK_IMPORTED_MODULE_1__ble_uart_service__["a" /* BleUartService */].UART_SERVICE)
            }
        ]);
        this.sendProgram("NRF.setAdvertising(" + JSON.stringify(advertiseData) + ", " + JSON.stringify(advertiseParams) + ");NRF.setScanResponse(" + JSON.stringify(scanResponseData) + ");");
    };
    NgBeaconService.prototype.uploadTemperature = function (params) {
        var advertiseParams = {
            name: params.name,
            interval: 250
        };
        var advertiseData = this.bluetoothUtils.encodeAdvPacket([
            {
                type: __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["b" /* GapAdType */].CompleteListOf16BitServiceUuids,
                data: [0x1a, 0x18],
            },
            {
                type: __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["b" /* GapAdType */].CompleteLocalName,
                data: [params.name]
            }
        ]);
        // this.uart.sendText(`\nNRF.setAdvertising(${JSON.stringify(advertiseData)},${JSON.stringify(advertiseParams)});\n`);
        this.sendProgram("NRF.setAdvertising(" + JSON.stringify(advertiseData) + "," + JSON.stringify(advertiseParams) + ");\n" + temperatureFirmware + ";");
    };
    NgBeaconService.prototype.uploadIBeacon = function (params) {
        var advertiseParams = {
            name: params.name,
            interval: 250
        };
        var major = 10000;
        var minor = 1;
        var advertiseData = this.bluetoothUtils.encodeAdvPacket([{
                type: __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["b" /* GapAdType */].manufacturerSpecificData,
                data: [
                    0x4c, 0x00,
                    0x02,
                    0x15,
                    'ng-beacon rocks!',
                    major >> 8, major & 0xff,
                    minor >> 8, minor & 0xff,
                    -59,
                ],
            }]);
        var scanResponseData = this.bluetoothUtils.encodeAdvPacket([
            {
                type: __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["b" /* GapAdType */].CompleteLocalName,
                data: [params.name]
            },
            {
                type: __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["b" /* GapAdType */].IncompleteListOf128BitServiceUuids,
                data: this.bluetoothUtils.uuidToBytes(__WEBPACK_IMPORTED_MODULE_1__ble_uart_service__["a" /* BleUartService */].UART_SERVICE)
            }
        ]);
        this.sendProgram("NRF.setAdvertising(" + JSON.stringify(advertiseData) + ", " + JSON.stringify(advertiseParams) + ");NRF.setScanResponse(" + JSON.stringify(scanResponseData) + ");");
    };
    NgBeaconService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ble_uart_service__["a" /* BleUartService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ble_uart_service__["a" /* BleUartService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["a" /* BluetoothUtilsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["a" /* BluetoothUtilsService */]) === 'function' && _b) || Object])
    ], NgBeaconService);
    return NgBeaconService;
    var _a, _b;
}());
//# sourceMappingURL=/home/uri/p/ng-beacon-app/src/ng-beacon.service.js.map

/***/ }),

/***/ 461:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 461;


/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(617);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/uri/p/ng-beacon-app/src/main.js.map

/***/ }),

/***/ 616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_beacon_service__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__ = __webpack_require__(246);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(ngBeacon, bluetoothUtils) {
        this.ngBeacon = ngBeacon;
        this.bluetoothUtils = bluetoothUtils;
        this.connecting = false;
        this.connected = false;
        this.beaconVersion = '';
        this.beaconSerialNum = '';
        this.beaconName = 'ng-beacon';
        this.beaconUrl = 'ngbeacon.io';
        this.debugLog = '';
    }
    AppComponent.prototype.connect = function () {
        var _this = this;
        this.connecting = true;
        this.beaconVersion = '';
        this.beaconSerialNum = '';
        this.ngBeacon.connect()
            .finally(function () {
            _this.connecting = false;
        })
            .subscribe(function () {
            _this.connected = true;
            _this.ngBeacon.uart.receive$.subscribe(function (value) { return _this.debugLog += value; });
            _this.ngBeacon.uart.lines$.subscribe(function (line) {
                if (!_this.beaconVersion && line.indexOf('"VERSION"') >= 0) {
                    _this.beaconVersion = line.split('"')[3];
                }
                if (!_this.beaconSerialNum && line.indexOf('"SERIAL"') >= 0) {
                    _this.beaconSerialNum = line.split('"')[3];
                }
            });
            _this.ngBeacon.uart.sendText('\nprocess.env\n');
        });
    };
    AppComponent.prototype.disconnect = function () {
        this.ngBeacon.disconnect();
        this.clearLog();
        this.connected = false;
    };
    AppComponent.prototype.clearLog = function () {
        this.debugLog = '';
    };
    AppComponent.prototype.reset = function () {
        this.ngBeacon.uart.sendText("\nreset()\n");
    };
    AppComponent.prototype.uploadEddystone = function () {
        this.ngBeacon.uploadEddystone({ name: this.beaconName }, this.beaconUrl);
    };
    AppComponent.prototype.uploadTemperature = function () {
        this.ngBeacon.uploadTemperature({ name: this.beaconName });
    };
    AppComponent.prototype.uploadIBeacon = function () {
        this.ngBeacon.uploadIBeacon({ name: this.beaconName });
    };
    AppComponent.prototype.readTemperature = function () {
        this.ngBeacon.uart.sendText("ngbeacon.temperature()\n ngbeacon.humidity()\n");
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(772),
            styles: [__webpack_require__(770)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_beacon_service__["a" /* NgBeaconService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ng_beacon_service__["a" /* NgBeaconService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["a" /* BluetoothUtilsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__bluetooth_utils_service__["a" /* BluetoothUtilsService */]) === 'function' && _b) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/uri/p/ng-beacon-app/src/app.component.js.map

/***/ }),

/***/ 617:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__manekinekko_angular_web_bluetooth__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ng_beacon_service__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bluetooth_utils_service__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ble_uart_service__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(616);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__manekinekko_angular_web_bluetooth__["a" /* WebBluetoothModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_material__["MaterialModule"].forRoot()
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_6__ng_beacon_service__["a" /* NgBeaconService */], __WEBPACK_IMPORTED_MODULE_7__bluetooth_utils_service__["a" /* BluetoothUtilsService */], __WEBPACK_IMPORTED_MODULE_8__ble_uart_service__["a" /* BleUartService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/home/uri/p/ng-beacon-app/src/app.module.js.map

/***/ }),

/***/ 618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/home/uri/p/ng-beacon-app/src/environment.js.map

/***/ }),

/***/ 770:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(769)();
// imports


// module
exports.push([module.i, ".flex-fill {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\nmd-toolbar a,\nmd-toolbar a:visited {\n    color: white;\n}\n\nmd-card {\n    margin-top: 10px;\n}", "", {"version":3,"sources":["/./src/app/app.component.css"],"names":[],"mappings":"AAAA;IACI,oBAAQ;QAAR,YAAQ;YAAR,QAAQ;CACX;;AAED;;IAEI,aAAa;CAChB;;AAED;IACI,iBAAiB;CACpB","file":"app.component.css","sourcesContent":[".flex-fill {\n    flex: 1;\n}\n\nmd-toolbar a,\nmd-toolbar a:visited {\n    color: white;\n}\n\nmd-card {\n    margin-top: 10px;\n}"],"sourceRoot":"webpack://"}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 772:
/***/ (function(module, exports) {

module.exports = "<md-toolbar color=\"primary\">\n  ng-beacon Configuration Utility\n  <div class=\"flex-fill\"></div>\n  <a href=\"https://github.com/urish/ng-beacon-app\" title=\"View on Github\" target=\"_blank\">\n    <md-icon>code</md-icon>\n  </a>\n</md-toolbar>\n\n<md-card *ngIf=\"!connected\">\n  <md-card-title>Connect</md-card-title>\n  <button md-raised-button (click)=\"connect()\" [disabled]=\"connecting\">\n    <md-icon>bluetooth_searching</md-icon> Connect to ng-beacon\n  </button>\n</md-card>\n\n<div *ngIf=\"connected\">\n  <md-card>\n    <md-card-title><md-icon>done</md-icon> Connected</md-card-title>\n  \n    <md-card-content>\n      <p>Version: {{beaconVersion}}</p>\n      <p>Serial: {{beaconSerialNum}}</p>\n    </md-card-content>\n\n    <button md-button (click)=\"readTemperature()\">Read Temperature</button>\n    <button md-raised-button (click)=\"disconnect()\">Disconnect</button>\n  </md-card>\n\n  <md-card>\n    <md-card-title>Configure Beacon</md-card-title>\n\n    <md-card-content>\n      <div>\n        <md-input-container>\n          <input md-input placeholder=\"Beacon name\" [(ngModel)]=\"beaconName\" maxlength=\"10\" />\n        </md-input-container>\n        <md-input-container>\n          <input md-input placeholder=\"Physical Web URL\" [(ngModel)]=\"beaconUrl\" maxlength=\"20\" />\n        </md-input-container>\n      </div>\n\n      <button md-button (click)=\"reset()\">Reset</button>\n      <button md-button (click)=\"uploadEddystone()\">Eddystone Beacon</button>\n      <button md-button (click)=\"uploadTemperature()\">Temperature Sensor</button>\n      <button md-button (click)=\"uploadIBeacon()\">iBeacon</button>\n    </md-card-content>\n  </md-card>\n\n  <md-card>\n    <md-card-title>Debug Log</md-card-title>\n    <md-card-content>\n      <pre>{{debugLog}}</pre>\n    </md-card-content>\n    <md-card-actions>\n      <button md-button (click)=\"clearLog()\"><md-icon>delete</md-icon></button>\n    </md-card-actions>\n  </md-card>\n</div>\n"

/***/ }),

/***/ 823:
/***/ (function(module, exports) {

module.exports = "function onInit(){function a(){var a=new Int16Array([100*ngbeacon.temperature()]),b=new Uint16Array([100*ngbeacon.humidity()]);NRF.updateServices({6170:{10862:{value:a.buffer,notify:!0},10863:{value:b.buffer,notify:!0}}})}NRF.setServices({6170:{10862:{readable:!0,notify:!0,value:[0,0]},10863:{readable:!0,notify:!0,value:[0,0]}}});var b;NRF.on(\"connect\",function(){a();b=setInterval(a,250)});NRF.on(\"disconnect\",function(){clearInterval(b)})};"

/***/ }),

/***/ 825:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(462);


/***/ })

},[825]);
//# sourceMappingURL=main.bundle.js.map