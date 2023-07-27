import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashBoardModule } from 'src/app/Models/Interfaces/DashBoardCardModel';
import { DashboardService } from 'src/app/Shared/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  carddata : DashBoardModule;
  dashboardsubscription$ : Subscription;
  constructor(private _router: Router,
              private _activatedRoute:ActivatedRoute,
              private _dashboardservice : DashboardService) {
   }

  ngOnDestroy(): void {
    if(this.dashboardsubscription$)
    {
      this.dashboardsubscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.dashboardsubscription$ = this._dashboardservice.GetTemplateData().
                                  subscribe((data : DashBoardModule)=>{
                                  this.carddata = data;
    });
  }

  Update(templatename: string)
  {
    this._router.navigate(['upload'], 
    {relativeTo: this._activatedRoute, queryParams:{mode : templatename}});
  }

  Edit(templatename: string){
    this._router.navigate(['edit'],
     {relativeTo: this._activatedRoute, queryParams:{mode: templatename}});
  }

}
