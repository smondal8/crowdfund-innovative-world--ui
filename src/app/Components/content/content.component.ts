import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Service/token.service';
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
  role : String;
  tabs: TabItem[];

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.subject.subscribe(
      data=>{
        if(data){
          this.userLoggedIn = true;
          this.userName = data.userId;
          this.role = data.role;
          this.ngOnInit();
        }
      }
    )
    if(this.tokenService.getRole() === "Funder"){
      this.tabs = [
        {
          label: 'Funder Profile',
          route: '/profile',
        },
        {
          label: 'Projects',
          route: '/project',
        }
      ];
    }
    if(this.tokenService.getRole() === "FundRaiser"){
      this.tabs = [
        {
          label: 'Fund Raiser Profile',
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
    }
  }



  OnTabSelectionChange()
  {
    console.log(event);
  }

}
