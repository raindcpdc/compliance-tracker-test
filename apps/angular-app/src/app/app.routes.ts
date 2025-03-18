import { Routes } from '@angular/router';

import { DefaultLayoutComponent } from '~shared/components/layouts/default-layout/default-layout.component';
import { DashboardComponent } from 'features/dashboard/dashboard.component';
import { LoginComponent } from 'features/login/login.component';
import { TrainingListComponent } from 'features/trainings/training-list/training-list.component';
import { MyTrainingsComponent } from 'features/trainings/my-trainings/my-trainings.component';
import { RequirementsComponent } from './features/requirements/requirement-list/requirement-list.component';
import { MyRequirementsComponent } from './features/requirements/my-requirements/my-requirements.component';

// TODO:
// find more efficient way to use layout component once user is loggedin here in routing
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: 'manage-requirements', component: RequirementsComponent },
      { path: 'my-requirements', component: MyRequirementsComponent },
      {
        path: 'manage-trainings',
        component: TrainingListComponent,
      },
      // User
      {
        path: 'my-trainings',
        component: MyTrainingsComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
