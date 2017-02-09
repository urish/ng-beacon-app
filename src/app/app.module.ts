import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';

import { NgBeaconService } from './ng-beacon.service';
import { BluetoothUtilsService } from './bluetooth-utils.service';
import { BleUartService } from './ble-uart.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WebBluetoothModule.forRoot(),
    MaterialModule.forRoot()
  ],
  providers: [NgBeaconService, BluetoothUtilsService, BleUartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
