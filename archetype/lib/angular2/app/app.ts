import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import {WebsocketService} from "./interfaces/websocket.service";

@Component({
  selector: 'app',
  providers: [Http],
  // encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['app.css'],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private websocketService: WebsocketService) {

  }

  ngOnInit() {
    this.websocketService.init();
  }

}
