import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from 'src/environments/environment';
import { UserInfoService } from 'src/app/core/helper/user-info.service';
import { SocketClient } from '../core/helper/socket.helper';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  socketClient = SocketClient.instance;

  constructor(private notification: NzNotificationService, private _userInfoService: UserInfoService) { }

  ngOnInit(): void {
    let me = this;
    me.socketClient.socket.on('LOAD-DATA', (data) => {
      console.log('[ADDED PRODUCT]', data)
      me.createNotification('success');
    });
    me._userInfoService.getUserInfo().subscribe((resp) => {
      console.log('[CONFIG-USER]', resp)
      if (!resp.name) {
        return;
      }
      me.socketClient.socket.emit('JOIN-ROOM', { username: resp.name, room: environment.ROOM });
    });

  }
  changeValue(value: boolean) {
    let me = this;
    me.isCollapsed = value;
  }

  createNotification(type: string): void {
    let me = this;
    me.notification.create(
      type,
      'Notificación :',
      'Se registro un nuevo producto en la plataforma.'
    );
  }

}
