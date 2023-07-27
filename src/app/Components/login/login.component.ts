import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { TokenService } from 'src/app/Shared/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLoggedIn = false ;
  verifyUserDetails = false;
  redirectURL = window.location.origin + '/dashboard';

  constructor(private router: Router, private authService: AuthService, private cookie: CookieService,
    private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("user") != null){
        this.router.navigate(['/dashboard']);
    }
    else{
        this.userLoggedIn = false;
    }
  }

  redirectToSiteCompanion() {
    this.tokenService.signOut();
    window.location.href = this.redirectURL;
  }

  onSubmit(form: any): void {
     console.log('you submitted value:', form);
    }

}
