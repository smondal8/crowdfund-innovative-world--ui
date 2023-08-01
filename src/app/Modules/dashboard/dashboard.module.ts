import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/Components/dashboard/dashboard.component';
import { MaterialModule } from 'src/app/Material/angular.material';
import { DashboardUploadComponent } from 'src/app/Components/dashboard-upload/dashboard-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { TableComponent } from 'src/app/Components/dashboard-upload/table/table.component';
@NgModule({
  declarations: 
  [DashboardComponent,
   DashboardUploadComponent,
   TableComponent],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
