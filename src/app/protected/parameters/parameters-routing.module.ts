import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { ParametersComponent } from './parameters/parameters.component';

const routes: Routes = [
  { path: '', component: ParametersComponent }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ParametersRoutingModule { }
