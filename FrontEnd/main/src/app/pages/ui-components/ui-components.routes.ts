import { Routes } from '@angular/router';
import { AuthGuard } from './../authentication/auth.guard';
// ui
//import { AppFormsComponent } from './forms/forms.component';
import { AppEmployeeComponent } from 'src/app/components/employee/employee.component';
import { AppAffectationComponent } from 'src/app/components/affectation/affectation.component';
import { AppFonctionComponent } from 'src/app/components/fonction/fonction.component';
import { AppMissionComponent } from 'src/app/components/mission/mission.component';
import { AppPaiementComponent } from 'src/app/components/paiement/paiement.component';
import { AppVehiculeComponent } from 'src/app/components/vehicule/vehicule.component';
import { AppCongeComponent } from 'src/app/components/conge/conge.component';


export const UiComponentsRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'affectation',
        component: AppAffectationComponent,
      },
      {
        path: 'employee',
        component: AppEmployeeComponent,
      },
      {
        path: 'fonction',
        component: AppFonctionComponent,
      },
      {
        path: 'mission',
        component: AppMissionComponent,
      },
      {
        path: 'paiement',
        component: AppPaiementComponent,
      },
      {
        path: 'vehicule',
        component: AppVehiculeComponent,
      },
      {
        path: 'conge',
        component: AppCongeComponent,
      }
    ],
  },
];
