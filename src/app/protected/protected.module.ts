import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { ParametersRoutingModule } from './parameters/parameters-routing.module';
import { PlanningRoutingModule } from './planning/planning-routing.module';
import { ProfilRoutingModule } from './profil/profil-routing.module';
import { WorkdayRoutingModule } from './workday/workday-routing.module';


@NgModule({
  declarations: [
    ProtectedComponent
  ],
  imports: [
    SharedModule,
    ProtectedRoutingModule,
    DashboardRoutingModule,
    ParametersRoutingModule,
    PlanningRoutingModule,
    ProfilRoutingModule,
    WorkdayRoutingModule
  ]
})
export class ProtectedModule { }
