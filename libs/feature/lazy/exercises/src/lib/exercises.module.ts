import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListExerciseComponent } from './list-exercise/list-exercise.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: ListExerciseComponent }])],
  declarations: [ListExerciseComponent]
})
export class ExercisesModule {}
