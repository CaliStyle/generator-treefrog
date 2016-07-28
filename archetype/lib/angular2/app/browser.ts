/// <reference path="../typings/index.d.ts"/>

import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import { provideRouter } from '@angular/router';
import { appRouterProviders } from './app.routes';
import {NotificationService} from "./services/notification.service";
import { BROWSER_WEBSOCKET_PROVIDERS } from './services/websocket.front.service';
import 'rxjs/Rx';
import {AppComponent} from './app';

bootstrap(AppComponent, [
  ...HTTP_PROVIDERS,
  appRouterProviders,
  ...[NotificationService],
  ...BROWSER_WEBSOCKET_PROVIDERS
])
  .catch(err => console.error(err));