import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { CookieService } from 'ngx-cookie-service';
  import { DataService } from '../Shared/Services/data.service';
  import { ToastrService } from 'ngx-toastr';
  import { Roles } from '../Constants/app.constants'
  import {Observable, of} from 'rxjs';
  import {concatMap, map, switchMap, tap} from 'rxjs/operators';
  import { CONSTANTS } from '../Constants/app.constants';
import { AuthService } from '../Shared/Services/auth.service';

  @Injectable()
  export class AuthGuard implements CanActivate {

    constructor(
      public router: Router,
      private cookie: CookieService,
      private dataService: DataService,
      private authService: AuthService,
      private toasterService: ToastrService
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
      // Check to see if a user has a valid token
      //if (this.authService.isAuthenticated()) {
        if(sessionStorage.getItem("userId") != null){
            return true;
        }
        // If not, they redirect them to the login page
        else{
            //this.router.navigate(['/login']);
            return false;
        }
      }
  }
