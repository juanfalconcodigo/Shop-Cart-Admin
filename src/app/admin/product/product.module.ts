import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductViewsModule } from './views/views.module';



@NgModule({
  imports: [
    CommonModule,
    AdminProductViewsModule
  ]
})
export class ProductModule { }
