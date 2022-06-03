import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCreateComponent } from './view-create/view-create.component';
import { ViewListComponent } from './view-list/view-list.component';

const routes: Routes = [
  {
    path:'create',
    component:ViewCreateComponent
  },
  {
    path:'list',
    component:ViewListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
