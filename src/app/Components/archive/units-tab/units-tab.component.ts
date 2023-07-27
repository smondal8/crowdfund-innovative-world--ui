import { Component, OnInit } from '@angular/core';
import { TabItem } from '../../content/content.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ArchiveService } from 'src/app/Shared/Services/archive.service';
import { MatTableDataSource } from '@angular/material/table';
import { ArchiveTabComponent } from '../archive-tab/archive-tab.component';

@Component({
  selector: 'app-units-tab',
  templateUrl: './units-tab.component.html',
  styleUrls: ['./units-tab.component.scss']
})
export class UnitsTabComponent implements OnInit {

  displayedColumns:string[]=['Archivedlists','Unitname','Phasetemplate','date','Reason']
  tabledata: any;
  isUnitAvailable = true;
  
  title = "Units";
  
  constructor(private archiveService: ArchiveService,
    private archivetab:ArchiveTabComponent) { 
    }

    ngOnInit(): void {
      this.getArchives();
  
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.tabledata.filter = filterValue.trim().toLowerCase();
    }
  
    getArchives() {
      this.archiveService.getArchives().subscribe( res => {
        this.tabledata = new MatTableDataSource(res)
      });
    }


}
