import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ListExerciseComponent } from './list-exercise/list-exercise.component';
import { CardExerciseComponent } from './card-exercise/card-exercise.component';

@NgModule({
  imports: [
    CommonModule,
    NzCardModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ListExerciseComponent }])
  ],
  declarations: [ListExerciseComponent, CardExerciseComponent]
})
export class ExercisesModule {}
