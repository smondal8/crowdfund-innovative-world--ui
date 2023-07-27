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

  constructor() { }

  ngOnInit(): void {
  }

  tabs: TabItem[] = [
    {
      label: 'DashBoard',
      route: '/dashboard',
    },
    {
      label: 'Project',
      route: '/project',
    },
    {
      label: 'Archive',
      route: '/archive',
    }
  ];

  OnTabSelectionChange()
  {
    console.log(event);
  }

}
