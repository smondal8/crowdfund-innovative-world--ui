import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashBoardModule } from 'src/app/Models/Interfaces/DashBoardCardModel';
import { DashboardService } from 'src/app/Shared/Services/dashboard.service';
import { RestService } from 'src/app/Service/rest.service';
import { TokenService } from 'src/app/Service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  aboutme : string;
  city: any;
  phone: any;
  usertype: any;
  constructor(private _router: Router,
              private _activatedRoute:ActivatedRoute,
              private _dashboardservice : DashboardService,
              private restService: RestService,
              private tokenService: TokenService,
              private toastr: ToastrService) {
   }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.restService.fetchProfile(this.tokenService.getUser()).subscribe(
      result=> {
        this.aboutme = result.aboutMe;
        this.city = result.city;
        this.phone = result.phone;
        this.usertype = result.userType;
      },
      error=>{
        this.toastr.error("Something wrong !!");
      }
    )
  }

}
