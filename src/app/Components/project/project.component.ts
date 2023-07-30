import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProjectComponent } from '../add-project/add-project.component';
import { filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/Service/rest.service';
import { TokenService } from 'src/app/Service/token.service';

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
  projects: any[];
  projectArray: any[];//new Array();
 
  desc='log items';
  name='device';

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[]=["id","name"];
  allProjects: any[];
  tabledata: any;
  
  constructor(public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService,
    private restService: RestService,
    private tokenService: TokenService
    ) {
      //this.dataSource = new MatTableDataSource(this.projectArray); 
    }

  ngOnInit(): void {
    this.projects = ["Windstorm","Bombasto","Magneta","Tornado"];
    this.restService.getProject(this.tokenService.getUser()).subscribe(
      result=> {
        this.projectArray = result.projects;
      },
      error=>{
        this.toastr.error("Something wrong!!");
      }
    )

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
      if(result){
        if(!this.projectArray.includes(result.name))
        this.projectArray.push(result.name)
      }
    }) 
   }

}
