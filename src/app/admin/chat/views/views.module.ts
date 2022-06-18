import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewAdminComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    NzAvatarModule,
    NzIconModule,
    ReactiveFormsModule
  ]
})
export class ChatViewsModule { }
