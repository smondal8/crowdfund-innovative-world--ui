import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { datastructure, devicephasemodel, tabledata } from 'src/app/Models/Interfaces/ProjectModel';
import { DevicePhase } from 'src/app/Models/ViewModels/ProjectClass';

import { map, switchMap } from 'rxjs';
import { ImageConfig } from '../../../app.config';
import { FileClass } from 'src/app/Models/ViewModels/FileClass';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { WarningInvalidateSkipDialogComponent } from '../device-commission/warning-invalidate-skip-dialog/warning-invalidate-skip-dialog.component';

@Component({
  selector: 'app-commisiontable',
  templateUrl: './commisiontable.component.html',
  styleUrls: ['./commisiontable.component.scss']
})
export class CommisiontableComponent implements OnInit, AfterViewInit {
  rows: string[];
  columns: datastructure[];
  valid: any = {}
  columnSchema: any;
  datasource: MatTableDataSource<any> = new MatTableDataSource([]);
  displayedColumns: string[];
  isvalidated: boolean;
  activePhase: DevicePhase;
  imageurl: any;
  imageconfig = ImageConfig;
  date: Date = new Date();
  devicephaseList: devicephasemodel[];

  constructor( private activatedRoute: ActivatedRoute,
    public dialog: MatDialog, private toastr: ToastrService) {
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }

  createdatasource(columns_i: datastructure[], tabledata: tabledata) {
    let datasourcearray = [];
    for (let rownumber of this.rows) {
      let obj = {}
      for (let data of columns_i) {
        if (data.type !== "header") {
          obj[data.name] = "";
        }
      }
      datasourcearray.push(obj);
    }
    this.datasource.data = (tabledata.data && tabledata.data.length > 0) ? tabledata.data : datasourcearray;
  }



  GetRowElement(number) {
    return this.rows[number];
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  getProjectPhases() {
  }

  isInvalidateActive(activePhase) {
    let isActive;
    if (this.devicephaseList) {
      const activeindex = this.devicephaseList.findIndex(x => x.id === activePhase.id);
      const nextPhase = this.devicephaseList[activeindex + 1];
      if (!nextPhase || (nextPhase && (nextPhase.validate === 'InProgress' || nextPhase.validate === 'Skipped'))) {
        if(activePhase.validate === 'InProgress') {
          isActive = true;
        } else {
          isActive = false;
        }        
      } else {
        isActive = true;
      }

    }
    return isActive;
  }

  OnInvalidate() {
    const dialogRef = this.dialog.open(WarningInvalidateSkipDialogComponent, {
      width: '545px',
      height: '480px',

      data: {
        title: 'Warning!',
        subtitle: `Invalidating devices phase will remove from present process and will be archived.`,
        phasename: 'Engineering 1',
        username: 'Pankaj Pandey',
        ok: 'Invalidate',
        date: Date.now()
      }
    });

      
  }

  onSkip() {
    const dialogRef = this.dialog.open(WarningInvalidateSkipDialogComponent, {
      width: '545px',
      height: '480px',
      data: {
        title: 'Warning!',
        subtitle: `Skip device phase will remove from present process and will be archived.`,
        phasename: 'Engineering 1',
        username: 'Pankaj Pandey',
        ok: 'Skip',
        date: Date.now()
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  OnSubmitButtonClick() {

  }

  OnSaveButtonClick() {

  }

  OnFileAdd(_file: FileClass[], row?: any, columnName?: any) {
    let _reader = new FileReader();
    _reader.readAsDataURL(_file[0].file);
    _reader.onload = (_event) => {
      if (row && columnName) {
        row[columnName] = _reader.result;
      } else {
        this.imageurl = _reader.result;
      }

    }
  }
}
