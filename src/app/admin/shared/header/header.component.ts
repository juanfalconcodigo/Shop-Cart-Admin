import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('isCollapsed') isCollapsed: boolean = false;
  @Output('emitCollapsed') emitCollapse: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  changeCollapse(value: boolean) {
    let me = this;
    me.emitCollapse.emit(value);
  }

}
