import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ListRoutineComponent } from './list-routine/list-routine.component';

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ListRoutineComponent }])
  ],
  declarations: [ListRoutineComponent]
})
export class RoutinesModule {}
