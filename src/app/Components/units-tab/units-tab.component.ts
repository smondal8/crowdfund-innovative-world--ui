import { Component, OnInit } from '@angular/core';
import { TabItem } from '../content/content.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ArchiveService } from 'src/app/Shared/Services/archive.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-units-tab',
  templateUrl: './units-tab.component.html',
  styleUrls: ['./units-tab.component.scss']
})
export class UnitsTabComponent implements OnInit {
  //displayedColumns: string[] = ['Archivedlists','Unitno#','Unitname','Phasename','Phaseversion','Devicetype','Deviceversion','Location','Cabinet','Frame', 'Place','date', 'Reason'];
  displayedColumns:string[]=['Archivedlists','Unitname','Phasetemplate','date','Reason']
  tabledata: any;
  isUnitAvailable = true;
  
  title = "Archived - All";
  
  constructor(private archiveService: ArchiveService) { 
    }

    ngOnInit(): void {
      this.getArchives();
    }
  
    // applyFilter(event: Event) {
    //   const filterValue = (event.target as HTMLInputElement).value;
    //   this.tabledata.filter = filterValue.trim().toLowerCase();
    // }
  
    getArchives() {
      this.archiveService.getArchives().subscribe( res => {
        this.tabledata = new MatTableDataSource(res)
      });
    }


}
