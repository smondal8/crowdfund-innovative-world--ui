import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TabItem } from '../../content/content.component';
import { MatDrawer } from '@angular/material/sidenav';
import { filter } from 'rxjs';
import { ArchiveService } from 'src/app/Shared/Services/archive.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-archive-tab',
  templateUrl: './archive-tab.component.html',
  styleUrls: ['./archive-tab.component.scss']
})
export class ArchiveTabComponent implements OnInit {

  tabledata: any;
  message:any;
  title='Archived - All';
  
  tabs : TabItem[]= []
  currentTab = '';
  currentRoute : string;
  @ViewChild('drawer') drawer: MatDrawer;

  constructor(private router : Router,
    private _activatedRoute: ActivatedRoute,
    private archiveService:ArchiveService) { 
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)).subscribe((event) => {
              this.currentTab = event["urlAfterRedirects"].split('/').pop();});
    }

  ngOnInit(): void {

    this.tabs=[
      {
        label:'Units',
        route:'/archive/units'
      },
      {
        label:'Devices',
        route:'/archive/devices'
      },
      {
        label:'Phases of devices',
        route:'/archive/phasesofdevices'
      },
    ]
  }


}
