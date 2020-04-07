import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@team-management/utils/http';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

// TODO config service worker, reload error handler, and sentry error handler
// TODO i18n
@NgModule({
  declarations: [AppComponent, DefaultLayoutComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule,
    HttpModule.forRoot({ environment }),
    RouterModule.forRoot(routes, {
      enableTracing: environment.traceRoute,
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always'
    })
  ],
  /** config ng-zorro-antd i18n (language && date) **/
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
