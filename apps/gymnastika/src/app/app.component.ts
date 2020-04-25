import { Component, ViewEncapsulation } from '@angular/core';
import { LoadingService } from '@team-management/shared/app-services';

@Component({
  selector: 'snk-root',
  template: `
    <nz-progress
      *ngIf="loadingService.appLoading"
      class="progress"
      [nzPercent]="99.9"
      [nzStrokeColor]="{ '0%': '#000000', '100%': '#722ed1' }"
      nzStatus="active"
      [nzShowInfo]="false"
      nzStrokeLinecap="square"
    ></nz-progress>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .ant-progress {
        position: fixed;
        width: 102%;
        left: -1%;
        top: -10px;
        z-index: 999;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(public loadingService: LoadingService) {}
}
