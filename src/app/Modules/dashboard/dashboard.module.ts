import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/Components/dashboard/dashboard.component';
import { MaterialModule } from 'src/app/Material/angular.material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  declarations: 
  [DashboardComponent,
],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
