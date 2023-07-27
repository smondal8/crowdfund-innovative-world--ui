import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ArchiveService } from 'src/app/Shared/Services/archive.service';

@Component({
  selector: 'app-device-tab',
  templateUrl: './device-tab.component.html',
  styleUrls: ['./device-tab.component.scss']
})
export class DeviceTabComponent implements OnInit {
  subtitle="Devices";
  title="Archived - All";
  tabledata: any;
  displayedColumns:string[]=['Archivedlists','Unit','Devicetype','Deviceversion','Phasetemplate','Location','Cabinet','Frame','Place','Date','Reason']
  isUnitAvailable = true;

  constructor(private archiveService:ArchiveService) { }

  ngOnInit(): void {
    this.getDeviceArchives();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabledata.filter = filterValue.trim().toLowerCase();
  }

  getDeviceArchives() {
    this.archiveService.getDeviceList().subscribe( res => {
      this.tabledata = new MatTableDataSource(res)
    });
  }

}
