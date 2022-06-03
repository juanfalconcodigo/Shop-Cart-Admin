import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input('isCollapsed') isCollapsed:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
