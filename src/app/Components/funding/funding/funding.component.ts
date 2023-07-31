import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FundingProjectData } from 'src/app/Models/Interfaces/FundingProjectData';
import { FormGroup,FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { RestService } from 'src/app/Service/rest.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-funding',
  templateUrl: './funding.component.html',
  styleUrls: ['./funding.component.scss']
})
export class FundingComponent implements OnInit {

  projects: { name: any;}[];

  projectList:any[];

  public fundingForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<FundingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FundingProjectData,
    private formBuilder: FormBuilder,private toastr: ToastrService,private restService:
     RestService,private tokenService: TokenService,) { }
     

  ngOnInit(): void {

    this.fundingForm = this.formBuilder.group({      
      projectAmout: ['', Validators.compose([Validators.required])]
    })
  }

  addCard(projectName:any){
    this.projectList = projectName;
  }

  addProject(){
    const createProjectForm = Object.assign({},this.fundingForm.value);
    if(this.fundingForm.invalid){
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
