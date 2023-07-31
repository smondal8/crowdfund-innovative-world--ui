import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userLoggedIn : boolean;
  @Output() logoutEmitter = new EventEmitter<any>();
  @Input() userName : String;
  @Input() fullname : string;
  @Input() role : string;
  constructor(
  private router: Router,private tokenService: TokenService
  ){ }

  ngOnInit(): void {
    this.tokenService.subject.subscribe(
      data=>{
        if(data){
          this.userLoggedIn = true;
          this.userName = data.userId;
          this.fullname = data.userName;
          this.role = data.role;
        }
      }
    )
    if(sessionStorage.getItem("userId") != null){
        this.userLoggedIn = true;
        //this.userName = sessionStorage.getItem('userId');
        this.fullname = sessionStorage.getItem('userName');
        this.role = sessionStorage.getItem('role');

    }
  }

  signOut(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.logoutEmitter.emit(false);
  }

}
