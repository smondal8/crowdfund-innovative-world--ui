import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DeleteComponent } from '../delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DevicesComponent implements OnInit {

  detailsViewColumns: string[] = ['cabinet', 'frame', 'place', 'device', 'version', 'phasetemplate', 'actions'];  

  isUnitAvailable = true;
  constructor(public dialog: MatDialog, private router : Router, private activaterouter : ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  delete(unit) {
    let dialogref = this.dialog.open(DeleteComponent, {
      width: '529px',
      height:'450px',
      data : {title : "Delete",
              subtitle : `Do you really want to delete the device? the device will be archived once deleted`,
              username : 'Pankaj Pandey',
              date : Date.now(),
              File : unit}
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  onDeviceSelect(data) {    
    this.router.navigate(['project', 1]),{ relativeTo: this.activaterouter };
  }

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  columnsToDisplay = ['action', 'Unit', 'numberOfDevice'];
  expandedElement: PeriodicElement | null;

}

export interface PeriodicElement {
  Unit: string;
  numberOfDevice: number;  
  details: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Unit: 'Unit 1',
    numberOfDevice: 2,   
    details:  [{cabinet: 'C1', frame: 'F2', place: 'P2', device: 'Bruan 1', version: '1.1',  phasetemplate: 'Phase 1',  actions: 'delete'},
    {cabinet: 'C2', frame: 'F3', place: 'P3', name: 'mnp', device: 'Bruan 2', version: '2.1',  phasetemplate: 'Phase 2', actions: 'delete'},
    ]
  }, {
    Unit: 'Unit 2',   
    numberOfDevice: 2, 
    details: [{cabinet: 'C1', frame: 'F2', place: 'P2', device: 'Bruan 1', version: '1.1',  phasetemplate: 'Phase 1',  actions: 'delete'},
    {cabinet: 'C2', frame: 'F3', place: 'P3', name: 'mnp', device: 'Bruan 2', version: '2.1',  phasetemplate: 'Phase 2', actions: 'delete'},
    ]
  },
  {
    Unit: 'Unit 3',   
    numberOfDevice: 2, 
    details: [{cabinet: 'C1', frame: 'F2', place: 'P2', device: 'Bruan 1', version: '1.1',  phasetemplate: 'Phase 1', actions: 'delete'},
    {cabinet: 'C2', frame: 'F3', place: 'P3', name: 'mnp', device: 'Bruan 2', version: '2.1',  phasetemplate: 'Phase 2', actions: 'delete'},
    ]
  }
];
