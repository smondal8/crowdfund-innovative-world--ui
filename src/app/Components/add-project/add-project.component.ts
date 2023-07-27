import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProjectData } from 'src/app/Models/Interfaces/AddProjectData';
import { ProjectService } from 'src/app/Shared/Services/project.service';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  projects: { name: any;}[];

  projectList:any[];

  constructor(public dialogRef: MatDialogRef<AddProjectComponent>,
    private _projectservice: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: AddProjectData) { }

  ngOnInit(): void {
    this.projects=this._projectservice.projects;  
  }

  addCard(projectName:any){
    this.projectList = projectName;
  }

  addProject(){
    let p =this.projects.filter(x => x.name==this.projectList)[0];
    this.dialogRef.close(p);
  }

}
