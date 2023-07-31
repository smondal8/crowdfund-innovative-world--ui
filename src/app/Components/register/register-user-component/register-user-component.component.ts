import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProjectData } from 'src/app/Models/Interfaces/AddProjectData';
import { FormGroup,FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { RestService } from 'src/app/Service/rest.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/Service/token.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-register-user-component',
  templateUrl: './register-user-component.component.html',
  styleUrls: ['./register-user-component.component.scss']
})
export class RegisterUserComponentComponent implements OnInit {

  projects: { name: any;}[];

    projectList:any[];

    public registerForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<RegisterUserComponentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: AddProjectData,
      private formBuilder: FormBuilder,private toastr: ToastrService,private restService:
       RestService,private tokenService: TokenService,) { }

    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        userId: ['', Validators.compose([Validators.required])],
        userName: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        aboutMe: ['', Validators.compose([Validators.required])],
        city: ['', Validators.compose([Validators.required])],
        phoneNumber: ['', Validators.compose([Validators.required])],
        userType: ['', Validators.compose([Validators.required])]
      })
    }

    addCard(projectName:any){
      this.projectList = projectName;
    }

    registerUser(){
      const registerUserFormVal = Object.assign({},this.registerForm.value);
      if(this.registerForm.invalid){
        this.toastr.error("Please fill all the fields !!");
      }
      else{
        this.restService.registerUser(registerUserFormVal).subscribe(
          result=> {
            this.toastr.info("User registered!!");
            this.dialogRef.close();
          },
          error=>{
            this.toastr.error("Something wrong while doing registration !!");
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
