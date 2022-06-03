import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  constructor() { }

  ngOnInit(): void {
  }
  changeValue(value: boolean) {
    let me = this;
    me.isCollapsed = value;
  }

}
