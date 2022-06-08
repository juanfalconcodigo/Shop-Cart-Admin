import { NgModule } from '@angular/core';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@NgModule({
  imports: [
    UserModule,
    ProductModule
  ]
})
export class CoreModule { }
