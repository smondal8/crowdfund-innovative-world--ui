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
  isFunder :boolean;

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
    if(this.tokenService.getRole() === "Funder"){
      this.isFunder = true;
      this.restService.getAllProject().subscribe(
        result=> {
          this.projectArray = result;
        },
        error=>{
          this.toastr.error("Something wrong!!");
        }
      )
    }
    else{
      this.isFunder = false;
      this.restService.getProject(this.tokenService.getUser()).subscribe(
        result=> {
          this.projectArray = result.projects;
        },
        error=>{
          this.toastr.error("Something wrong!!");
        }
      )
    }

    

  }

  addProject():void{
    let dialogref = this.dialog.open(AddProjectComponent, {
      width: '500px',
      height: '550px',
      data: {
        title: "Add new Project",
        info: `User can create project to add into the app`
      }
    })  
    dialogref.afterClosed().subscribe(result => {
      this.ngOnInit();
    }) 
   }

   fundPayment(projectId : number):void{
    let dialogref = this.dialog.open(AddProjectComponent, {
      width: '500px',
      height: '550px',
      data: {
        title: "Add new Project",
        info: `User can create project to add into the app`
      }
    })  
    dialogref.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
   }

}
