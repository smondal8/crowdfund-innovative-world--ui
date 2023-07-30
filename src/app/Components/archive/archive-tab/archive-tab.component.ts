import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TabItem } from '../../content/content.component';
import { MatDrawer } from '@angular/material/sidenav';
import { filter } from 'rxjs';
import { ArchiveService } from 'src/app/Shared/Services/archive.service';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Service/rest.service';
import { TokenService } from 'src/app/Service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-archive-tab',
  templateUrl: './archive-tab.component.html',
  styleUrls: ['./archive-tab.component.scss']
})
export class ArchiveTabComponent implements OnInit {

  tabledata: any;
  message:any;
  title='Archived Projects';
  
  tabs : TabItem[]= []
  currentTab = '';
  currentRoute : string;
  projectArray: any[];

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(private router : Router,
    private _activatedRoute: ActivatedRoute,
    private archiveService:ArchiveService,
    private restService: RestService,
    private tokenService: TokenService,
    private toastr: ToastrService) { 
      
    }

  ngOnInit(): void {
    this.restService.getProject(this.tokenService.getUser()).subscribe(
      result=> {
        this.projectArray = result.archivedProjects;
      },
      error=>{
        this.toastr.error("Something wrong!!");
      }
    )

  }


}
