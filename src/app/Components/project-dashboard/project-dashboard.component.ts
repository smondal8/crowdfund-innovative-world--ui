import { Component, OnInit, ViewChild } from '@angular/core';
import { TabItem } from '../content/content.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  
  Title = "Project1"
  currentTab = '';
  tabs : TabItem[]= []
  currentRoute : string;
  @ViewChild('drawer') drawer: MatDrawer;
  
  constructor(private router : Router,
    private _activatedRoute: ActivatedRoute,) { 
    this.router.events.pipe(
                            filter(event => event instanceof NavigationEnd)).subscribe((event) => {
                                  this.currentTab = event["urlAfterRedirects"].split('/').pop();});
    }

  ngOnInit(): void {
    this.tabs = [
      {
        label: 'Unit',
        route: '/project/project-dashboard/unit',
      },
      {
        label: 'Device',
        route: '/project/project-dashboard/device',
      }
    ];
  }

  OnBackNavigation(){
    this.router.navigate(['project']),{ relativeTo: this._activatedRoute };
  }

  closeDrawer() {
    this.drawer.close();
  }

}
