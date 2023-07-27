import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileClass } from 'src/app/Models/ViewModels/FileClass';
import { DashboardService } from 'src/app/Shared/Services/dashboard.service';
import * as Config from '../../../app.config'

@Component({
  selector: 'app-dashboard-upload',
  templateUrl: './dashboard-upload.component.html',
  styleUrls: ['./dashboard-upload.component.scss']
})
export class DashboardUploadComponent implements OnInit, OnDestroy{
  mode : string= '';
  Title : string  = '';
  FileConfig = Config.FileConfig;
  tabledisplaysts: boolean = true;
  templatefilesubscription$ : Subscription;
  tabledata : FileClass[] = []
  constructor(private _dashboardservice : DashboardService,
              private router : Router,
              private _activatedRoute:ActivatedRoute) {
  }

  ngOnDestroy(): void {
    if(this.templatefilesubscription$)
    {
      this.templatefilesubscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(data =>{
      if(data.has('mode'))
      {
        this.mode = data.get('mode');
        this.Title = `Upload ${this.mode.toLowerCase()} template`
        this.templatefilesubscription$ = this._dashboardservice.GetTemplateFiles(this.mode).subscribe(
          data => {
            this.tabledata = data;
            this.tabledisplaysts = this.tabledata.length > 0 ? true : false;
          }
        )
      }
    })
  }

  OnBackNavigation()
  {
    this.router.navigate([''],{relativeTo: this._activatedRoute});
  }


  OnSaveButtonClick()
  {
    this._dashboardservice.filesaveSubject$.next();
  }

  OnFileAdd(_files : FileClass[]){
    this.tabledata = [..._files, ...this.tabledata];
    this.tabledisplaysts = this.tabledata.length > 0 ? true : false;
  }

}
