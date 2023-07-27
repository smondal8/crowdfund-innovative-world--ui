import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { datastructure, devicephasemodel, tabledata } from 'src/app/Models/Interfaces/ProjectModel';
import { DevicePhase } from 'src/app/Models/ViewModels/ProjectClass';
import { ProjectService } from 'src/app/Shared/Services/project.service';
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

  constructor(private _projectservice: ProjectService, private activatedRoute: ActivatedRoute,
    public dialog: MatDialog, private toastr: ToastrService) {
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(routedata => {
      this.activePhase = this._projectservice.GetActiveProjectphase();
      return this._projectservice.GetProjectTableData("1", "1", "1", this.activePhase.id).pipe(map(tabledata => ({ routedata, tabledata })))
    })).subscribe(({ routedata, tabledata }) => {
      this.isvalidated = this.activePhase.validate.toLowerCase() !== "completed" ? false : true;
      this.rows = tabledata.row;
      this.columns = tabledata.columns;
      this.columnSchema = this.columns;
      this.displayedColumns = this.columns.map(x => x.name);
      this.imageurl = this.activePhase.imageUrl;
      this.createdatasource(this.columns, tabledata);
    });

    this.getProjectPhases();
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
    this._projectservice.GetProjectPhases("1", "1", "1").subscribe((data: devicephasemodel[]) => {
      this.devicephaseList = data;
    });
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

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.reason) {
        this._projectservice.SetProjectTableData("1", "1", "1", this.activePhase.id, "InProgress", [], "").subscribe((sts) => {
          if (sts) {
            this.toastr.info(`'${this.activePhase.name} is invalidated and moved to archive! \n This phase is now active and can restart the process.'`)
            this._projectservice.phasevalidationsubject.next("InProgress");
            this.isvalidated = false;
          }
        });
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
      if (result && result.reason) {
        this._projectservice.SetProjectTableData("1", "1", "1", this.activePhase.id, "Skipped", [], "").subscribe((sts) => {
          if (sts) {
            this.toastr.info(`'${this.activePhase.name} is skipped and moved to archive! \n This phase is now active and can restart the process.'`)
            this._projectservice.phasevalidationsubject.next("Skipped");
            this.isvalidated = false;
          }
        });
      }
    });
  }


  OnSubmitButtonClick() {
    this._projectservice.SetProjectTableData("1", "1", "1", this.activePhase.id, "Completed", this.datasource.data, this.imageurl).subscribe((sts) => {
      if (sts) {
        this.toastr.success(`'${this.activePhase.name}' is completed successfully!`)
        this._projectservice.phasevalidationsubject.next("Completed");
      }
    })
  }

  OnSaveButtonClick() {
    this._projectservice.SetProjectTableData("1", "1", "1", this.activePhase.id, "InProgress", this.datasource.data, this.imageurl).subscribe((sts) => {
      if (sts) {
        this.toastr.success(`'${this.activePhase.name}' is saved successfully!`)       
      }
    })
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
