import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ListRoutineComponent } from './list-routine/list-routine.component';
import { UpdateRoutineComponent } from './update-routine/update-routine.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzSelectModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ListRoutineComponent }])
  ],
  declarations: [ListRoutineComponent, UpdateRoutineComponent]
})
export class RoutinesModule {}
