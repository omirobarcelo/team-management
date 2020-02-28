import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListRoutineComponent } from './list-routine/list-routine.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', pathMatch: 'full', component: ListRoutineComponent }])],
  declarations: [ListRoutineComponent]
})
export class RoutinesModule {}
