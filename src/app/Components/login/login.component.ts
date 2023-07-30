import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { TokenService } from 'src/app/Service/token.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup,FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { RestService } from 'src/app/Service/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() userLoggedIn = false ;
  verifyUserDetails = false;
  redirectURL = window.location.origin + '/dashboard';
  selected : any;
  public loginFormGroup: FormGroup;



  constructor(private router: Router, private authService: AuthService, private cookie: CookieService,
    private toastr: ToastrService, private tokenService: TokenService, private formBuilder: FormBuilder,private restService: RestService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userId") != null){
        this.userLoggedIn = true;
        this.router.navigate(['']);
    }
    else{
        this.userLoggedIn = false;
    }
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      // role: ['', Validators.compose([Validators.required])]
    })
  }

  redirectToSiteCompanion() {
    this.tokenService.signOut();
    window.location.href = this.redirectURL;
  }

  login(event:any){
    const loginData = Object.assign({},this.loginFormGroup.value);
    console.log(loginData);
    this.restService.authenticate(loginData).subscribe(
      result=> {
        this.tokenService.saveUser(result);
        this.tokenService.passValue(true);
        this.router.navigate(['/dashboard']);
      },
      error=>{
        this.toastr.error("Wrong userid or passowrd");
      }
    )
  }

}
