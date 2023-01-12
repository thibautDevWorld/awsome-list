import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProtectedComponent } from './protected.component';


const routes: Routes = [
  {
    path: 'app',
    component: ProtectedComponent,
    children: [
      { path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { path: 'parameters',
        loadChildren: () => import('./parameters/parameters.module').then(m => m.ParametersModule)
      },
      { path: 'planning', 
        loadChildren: () => import('./planning/planning.module').then(m => m.PlanningModule)  
      },
      { path: 'profil',
        loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule)
      },
      { path: 'workday',
        loadChildren: () => import('./workday/workday.module').then(m => m.WorkdayModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
