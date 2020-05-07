import { Routes } from '@angular/router';
import { AuthGuard } from '@team-management/shared/auth';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@team-management/lazy/app-dashboard').then(m => m.AppDashboardModule)
      },
      {
        path: 'routines',
        loadChildren: () => import('@team-management/lazy/routines').then(m => m.RoutinesModule)
      },
      {
        path: 'exercises',
        loadChildren: () => import('@team-management/lazy/exercises').then(m => m.ExercisesModule)
      }
    ]
  }
];
