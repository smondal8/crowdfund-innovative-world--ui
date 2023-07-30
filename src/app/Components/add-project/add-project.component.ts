import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProjectData } from 'src/app/Models/Interfaces/AddProjectData';
import { FormGroup,FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { RestService } from 'src/app/Service/rest.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/Service/token.service';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  projects: { name: any;}[];

  projectList:any[];

  public projectFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddProjectData,
    private formBuilder: FormBuilder,private toastr: ToastrService,private restService:
     RestService,private tokenService: TokenService,) { }

  ngOnInit(): void {
    this.projectFormGroup = this.formBuilder.group({
      projectName: ['', Validators.compose([Validators.required])],
      projectDescription: ['', Validators.compose([Validators.required])],
      projectArea: ['', Validators.compose([Validators.required])],
      projectTarget: ['', Validators.compose([Validators.required])],
    })
  }

  addCard(projectName:any){
    this.projectList = projectName;
  }

  addProject(){
    const createProjectForm = Object.assign({},this.projectFormGroup.value);
    if(this.projectFormGroup.invalid){
      this.toastr.error("Please fill all the fields!!");
    }
    else{
      this.restService.createProject(this.tokenService.getUser(),createProjectForm).subscribe(
        result=> {
          this.toastr.info("Project Created!!");
          this.dialogRef.close();
        },
        error=>{
          this.toastr.error("Something wrong while creating the project!!");
          console.log(error);
        }
      )
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
