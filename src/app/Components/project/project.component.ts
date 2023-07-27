import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Shared/Services/project.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

export interface projectData{
  id:number;
  name:string
}

@Component({
  selector: 'app-block-card',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: { name: string; }[];
  projectArray = new Array();
 
  desc='log items';
  name='device';

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[]=["id","name"];
  allProjects: any[];
  tabledata: any;
  
  constructor(public dialog: MatDialog,
    private _projectservice: ProjectService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService
    ) {this.dataSource = new MatTableDataSource(this.projectArray); }

  ngOnInit(): void {
    this.projects = this._projectservice.projects;
  }

  addProject():void{
    let dialogref = this.dialog.open(AddProjectComponent, {
      width: '430px',
      height: '350px',
      data: {
        title: "Add new Project",
        subtitle: `Project Name-ID`,
        info: `Adding project will map the project to "Site companion" application`
      }
    })  
    dialogref.afterClosed().subscribe(result => {
      console.log(this.projectArray,'aads')
      if(result){
        if(!this.projectArray.includes(result.name))
        this.projectArray.push(result.name)
      }
    }) 
   }

   arrowclick() {
    this._router.navigate(['project-dashboard'], { relativeTo: this._activatedRoute });
  }

}
