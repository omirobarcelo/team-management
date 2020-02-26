import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { ExerciseComponent } from './exercise/exercise.component';

@NgModule({
  imports: [CommonModule, NzListModule],
  declarations: [ExerciseComponent],
  exports: [ExerciseComponent]
})
export class ExercisesModule {}
