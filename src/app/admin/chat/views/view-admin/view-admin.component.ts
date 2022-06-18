import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SocketClient } from 'src/app/core/helper/socket.helper';
import { UserInfoService, UserInfo } from 'src/app/core/helper/user-info.service';
import { Subscription } from 'rxjs';
import { IMessage, SocketService } from 'src/app/core/socket/socket.service';

interface IUser {
  id: string;
  username: string;
  room: string
}

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.scss']
})
export class ViewAdminComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  messages: IMessage[] = [];
  messageFormControl!: FormControl;
  socketClient = SocketClient.instance;
  /* [ngClass]="{'active':user.active,'not-active':!user.active}" */
  userInfo: UserInfo | null = null;
  $usersSocketSubscription: Subscription | null = null;
  $messagesSocketSubscription: Subscription | null = null;

  @ViewChild('list') list!: ElementRef<HTMLUListElement>;

  constructor(private _userInfoService: UserInfoService, private _socketService: SocketService) { }


  ngOnInit(): void {
    let me = this;
    me.messageFormControl = new FormControl('', [Validators.required]);
    me.socketClient.socket.on('USERS-ROOM', (data) => {
      me.users = [...data.users];
      console.log('[USERS-ROOM]', data);
    });
    me.socketClient.socket.on('LOAD-CHAT-ADMIN-MESSAGES', (data) => {
      me.messages = [...me.messages, data];
      console.log('[LOAD-CHAT-ADMIN-MESSAGES]', data);
      setTimeout(() => {
        me.list.nativeElement.scrollTop = me.list.nativeElement.scrollHeight;
      }, 10);
    });
    /*  me._userInfoService.getUserInfo().subscribe(data=>{
       me.userInfo=data;
     }) */
    me.$usersSocketSubscription = me._socketService.getUsersSocketRoom('ADMIN').subscribe({
      next: (resp) => {
        console.log('[RESPONSE getUsersSocketRoom]', resp);
        me.users = resp.users;
      },
      error: (error) => {
        console.log('[ERROR]', error);
      },
      complete: () => {
        console.log('[COMPLETE getUsersSocketRoom]');
      }
    });

    me.$messagesSocketSubscription = me._socketService.getMessagesSocketRoom().subscribe({
      next: (resp) => {
        console.log('[RESPONSE getMessagesSocketRoom]', resp);
        me.messages = resp.messages;
      },
      error: (error) => {
        console.log('[ERROR]', error);
      },
      complete: () => {
        console.log('[COMPLETE getMessagesSocketRoom]');
      }
    })
  }

  ngOnDestroy(): void {
    let me = this;
    me.$usersSocketSubscription && me.$usersSocketSubscription.unsubscribe();
    me.$messagesSocketSubscription && me.$messagesSocketSubscription.unsubscribe();
  }

  sendMessage() {
    let me = this;
    if (me.messageFormControl.invalid) {
      return;
    }
    const message = me.messageFormControl.value;
    me.socketClient.socket.emit('CHAT-ADMIN-MESSAGES', { message })
    me.messageFormControl.setValue('');
  }

}
