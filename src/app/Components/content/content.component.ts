import { Component, Input, OnInit } from '@angular/core';
export interface TabItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() userLoggedIn : boolean;
  @Input() userName : String;

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userId") != null){
      this.userLoggedIn = true;
      this.userName = sessionStorage.getItem('userId');
  }
  }

  tabs: TabItem[] = [
    {
      label: 'FundRaiser Profile',
      route: '/profile',
    },
    {
      label: 'Current Projects',
      route: '/project',
    },
    {
      label: 'Archive Projects',
      route: '/archive',
    }
  ];

  OnTabSelectionChange()
  {
    console.log(event);
  }

}
