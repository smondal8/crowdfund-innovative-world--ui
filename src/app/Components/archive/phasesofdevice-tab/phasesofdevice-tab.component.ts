import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ArchiveService } from 'src/app/Shared/Services/archive.service';

@Component({
  selector: 'app-phasesofdevice-tab',
  templateUrl: './phasesofdevice-tab.component.html',
  styleUrls: ['./phasesofdevice-tab.component.scss']
})
export class PhasesofdeviceTabComponent implements OnInit {
  title="Phase of device";
  tabledata:any;
  displayedColumns:string[]=['Archivedlists','Unitno','Unitname','Phasetemplate','Devicetype','Deviceversion','Location','Cabinet','Frame','Place','Date','Reason'];

  constructor(private archiveService:ArchiveService) { }

  ngOnInit(): void {
    this.getPhasesArchives();
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabledata.filter = filterValue.trim().toLowerCase();
  }

  getPhasesArchives(){
    this.archiveService.getPhasesList().subscribe(res=>{
    this.tabledata=new MatTableDataSource(res)
    });
  }


}
