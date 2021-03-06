import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from 'src/app/core/security/security.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('src/app/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/admin/admin.module').then((m) => m.AdminModule),
    canActivate:[SecurityGuard]
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
