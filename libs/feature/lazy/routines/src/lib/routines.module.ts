import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CardRoutineExerciseComponent } from './card-routine-exercise/card-routine-exercise.component';
import { ListRoutineComponent } from './list-routine/list-routine.component';
import { PrintRoutineComponent } from './print-routine/print-routine.component';
import { UpdateRoutineComponent } from './update-routine/update-routine.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzMenuModule,
    NzSelectModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ListRoutineComponent },
      { path: ':routineId/print', component: PrintRoutineComponent }
    ])
  ],
  declarations: [ListRoutineComponent, UpdateRoutineComponent, CardRoutineExerciseComponent, PrintRoutineComponent]
})
export class RoutinesModule {}
