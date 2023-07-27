import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UnitService } from 'src/app/Shared/Services/unit.service';
import { DeleteComponent } from '../delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phasetemplate', 'date', 'actions'];
  tabledata: any;
  isUnitAvailable = true;
  constructor(private unitService: UnitService, public dialog: MatDialog) { }

  ngOnInit(): void {   
    this.getUnits();
  }

  deletealert(unit) {
    let dialogref = this.dialog.open(DeleteComponent, {
      width: '529px',
      height:'450px',
      data : {title : "Delete",
              subtitle : `Do you really want to delete the unit? the unit will be archived once deleted`,
              username : 'Pankaj Pandey',
              date : Date.now(),
              File : unit}
    });    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabledata.filter = filterValue.trim().toLowerCase();
  }

  getUnits() {
    this.unitService.getUnits().subscribe( res => {
      this.tabledata = new MatTableDataSource(res)
    });
  }

}
