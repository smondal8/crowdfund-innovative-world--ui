import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from 'src/app/Components/project-dashboard/project-dashboard.component';
import { ProjectRoutingModule } from './project-routing.module';
import { MaterialModule } from 'src/app/Material/angular.material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { UnitService } from 'src/app/Shared/Services/unit.service';
import { ProjectComponent } from 'src/app/Components/project/project.component';
import { AddProjectComponent } from 'src/app/Components/add-project/add-project.component';


@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectComponent,
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule      
  ],
  providers: [
    UnitService
  ]
})
export class ProjectModule { }
