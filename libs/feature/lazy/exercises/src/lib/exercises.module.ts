import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ListExerciseComponent } from './list-exercise/list-exercise.component';

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ListExerciseComponent }])
  ],
  declarations: [ListExerciseComponent]
})
export class ExercisesModule {}
