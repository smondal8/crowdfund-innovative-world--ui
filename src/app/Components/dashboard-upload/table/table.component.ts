import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FileClass } from 'src/app/Models/ViewModels/FileClass';
import { DashboardService } from 'src/app/Shared/Services/dashboard.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() Tabledata : FileClass[] = [];
  @Input() Template: string= '';
  browseTitle : string | any;
  filesaveSubscription$ : Subscription;
  displayedColumns : string[] = ['name', 'date', 'actions'];
  constructor(private _dashboardservice : DashboardService) { 
  }

  ngOnDestroy(): void {
    if(this.filesaveSubscription$)
    {
      this.filesaveSubscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.browseTitle = `Uploaded ${this.Template.toLowerCase()} template below`;
    
    this.filesaveSubscription$ = this._dashboardservice.filesaveSubject$.subscribe(()=>{
      this.OnSaveAction();
    });
  }

  OnDeleteButtonClick(_fileclass : FileClass)
  {
    this.Tabledata = this.Tabledata.filter(item =>{
      return item.id !== _fileclass.id
    });
  }

  OnSaveAction()
  {
    let uploadfiles = this.Tabledata.filter((item)=>{
      return !item.uploadsts;
    });
    const formdata : FormData = new FormData;
    uploadfiles.forEach(item => {
      item.uploadsts = true;
      formdata.append(`${this.Template} files`, item.file, item.name);
    });
    this._dashboardservice.SaveTemplateFiles(this.Template, formdata, this.Tabledata);
  }
}
