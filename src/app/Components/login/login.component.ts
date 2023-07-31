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
import { RegisterUserComponentComponent } from '../register/register-user-component/register-user-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() userLoggedIn = false ;
  verifyUserDetails = false;
  redirectURL = window.location.origin + '/profile';
  selected : any;
  public loginFormGroup: FormGroup;



  constructor(private router: Router, private authService: AuthService, private cookie: CookieService,
    private toastr: ToastrService, private tokenService: TokenService, private formBuilder: FormBuilder,private restService: RestService,public dialog: MatDialog) { }

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
        this.tokenService.passValue(result);
        this.router.navigate(['/profile']);
      },
      error=>{
        this.toastr.error("Wrong userid or passowrd");
      }
    )
  }

  registerUser():void{
    let dialogref = this.dialog.open(RegisterUserComponentComponent, {
      width: '500px',
      height: '700px',
      data: {
        title: "Register new user",
        info: `User can register themselves as Fundraiser or Funder`
      }
    })
    dialogref.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
   }

}
