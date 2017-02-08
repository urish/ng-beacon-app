import { Component } from '@angular/core';

import { NgBeaconService } from './ng-beacon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  connecting = false;
  connected = false;
  beaconInfo = '';

  constructor(private ngBeacon: NgBeaconService) {}

  connect() {
    this.connecting = true;
    this.ngBeacon.connect()
      .subscribe(() => {
        this.connecting = false;
        this.connected = true;
        this.ngBeacon.receive$.subscribe(value => console.log('recv', value));
        this.ngBeacon.lines$.subscribe(line => {
          if (line.indexOf('VERSION') >= 0) {
            this.beaconInfo += line;
          }
          if (line.indexOf('SERIAL') >= 0) {
            this.beaconInfo += line;
          }
        });
        this.ngBeacon.sendText('\nprocess.env\n');
      });
  }
}
