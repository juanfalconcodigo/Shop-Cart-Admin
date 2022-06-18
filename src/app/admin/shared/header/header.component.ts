import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { SocketClient } from 'src/app/core/helper/socket.helper';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('isCollapsed') isCollapsed: boolean = false;
  @Output('emitCollapsed') emitCollapse: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('alertMessage')  alertMessage:ElementRef<HTMLElement>|null=null;
  socketClient = SocketClient.instance;

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
    let me=this;
    me.socketClient.socket.on('NEW-MESSAGE', (data) => {
      console.log('[NEW-MESSAGE]', data);
      me.renderer.addClass(me.alertMessage?.nativeElement,'active-message');
      /* me.createNotification('success'); */
    });
  }

  changeCollapse(value: boolean) {
    let me = this;
    me.emitCollapse.emit(value);
  }

}
