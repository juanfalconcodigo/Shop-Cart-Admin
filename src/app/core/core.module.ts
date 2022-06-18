import { NgModule } from '@angular/core';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SocketModule } from './socket/socket.module';

@NgModule({
  imports: [
    UserModule,
    ProductModule,
    SocketModule
  ]
})
export class CoreModule { }
