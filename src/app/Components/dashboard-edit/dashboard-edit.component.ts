import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FileClass } from 'src/app/Models/ViewModels/FileClass';
import { DashboardService } from 'src/app/Shared/Services/dashboard.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.scss']
})


export class DashboardEditComponent implements OnInit {
  @Input() tabledata: FileClass[] = [];
  templatefilesubscription$ : Subscription;
  mode: string = '';

  displayedColumns: string[] = ['phasetemplate', 'date', 'actions'];


  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _dashboardservice: DashboardService,
    public dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(data => {
      if (data.has('mode')) {
        this.mode = data.get('mode');
      }
    })

    this.templatefilesubscription$ = this._dashboardservice.GetTemplateFiles(this.mode).subscribe(
      data => {
        console.log(data);
        this.tabledata = data;
      }
    )
  }

  OnBackClick() {
    this._router.navigate([''], { relativeTo: this._activatedRoute });
  }

  deletealert(file : FileClass) {
    let dialogref = this.dialog.open(DeleteComponent, {
      width: '529px',
      height:'450px',
      data : {title : "Delete",
              subtitle : `Do you really want to delete the ${this.mode} template?`,
              username : 'Prabhuram',
              date : Date.now(),
              File : file}
    });
  }

  savefile() {
    this.toastr.success('Saved successfully');
  }

}
