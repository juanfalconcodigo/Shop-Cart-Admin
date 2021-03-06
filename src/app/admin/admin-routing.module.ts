import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'product',
        loadChildren: () => import('src/app/admin/product/product.module').then((m) => m.ProductModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('src/app/admin/chat/chat.module').then((m) => m.ChatModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
