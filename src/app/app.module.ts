import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';

import {QrScannerServiceService} from "./services/qr-scanner-service.service"; 

export function initQrScannerService(qrScannerServiceService: QrScannerServiceService) {
  return () => qrScannerServiceService.init();
}
 
export function qrScannerService() {
  return {
    provide: APP_INITIALIZER,
    useFactory: initQrScannerService,
    deps: [QrScannerServiceService],
    multi: true,
  };
}


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, qrScannerService()],
  bootstrap: [AppComponent],
})
export class AppModule {}
