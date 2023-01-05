import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModule } from './modules/ngx-bootstrap.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxBootstrapModule
  ],
  exports: [
    CommonModule,
    NgxBootstrapModule
  ]
})
export class SharedModule { }
