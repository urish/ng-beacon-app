import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';
import { MomentModule } from 'angular2-moment';

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
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule
  ],
  providers: [NgBeaconService, BluetoothUtilsService, BleUartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
