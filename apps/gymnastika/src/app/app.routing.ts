import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'exercises',
        loadChildren: () =>
          import('@team-management/lazy/exercises').then(m => m.ExercisesModule)
      }
    ]
  }
];
