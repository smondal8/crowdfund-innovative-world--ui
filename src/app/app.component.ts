import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthService } from './Shared/Services/auth.service';
import { DataService } from './Shared/Services/data.service';
import { TokenService } from 'src/app/Service/token.service';

export interface TabItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CrowdFundUI';
  tabs: TabItem[] = []
  verifyUserDetails = false;
  userLoggedIn = false;
  constructor(private tokenService: TokenService, private router: Router, private authService: AuthService,private dataService: DataService,
    private cookie: CookieService, private toastr: ToastrService)
  {

  }

  // Commented for the time being, once backend authentication is ready
  ngOnInit() {
    this.tokenService.subject.subscribe(
      data=>{
        if(data){
          this.userLoggedIn = data;
        }        
      }
    )
    if(sessionStorage.getItem("userId") != null){
      this.userLoggedIn = true;
    }
    else{
      this.userLoggedIn = false;
    }

  }
  logout(userstate : any){
    this.userLoggedIn = userstate;
  }
}
