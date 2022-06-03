import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewCreateComponent } from './view-create/view-create.component';
import { ViewListComponent } from './view-list/view-list.component';


@NgModule({
  declarations: [
    ViewCreateComponent,
    ViewListComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule
  ]
})
export class AdminProductViewsModule { }
