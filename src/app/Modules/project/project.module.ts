import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from 'src/app/Components/project-dashboard/project-dashboard.component';
import { ProjectRoutingModule } from './project-routing.module';
import { MaterialModule } from 'src/app/Material/angular.material';
import { UnitsComponent } from 'src/app/Components/units/units.component';
import { DevicesComponent } from 'src/app/Components/devices/devices.component';
import { EmptyListComponent } from 'src/app/Components/empty-list/empty-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { AddUnitComponent } from 'src/app/Components/units/add-unit/add-unit.component';
import { AddDeviceComponent } from 'src/app/Components/devices/add-device/add-device.component';
import { UnitService } from 'src/app/Shared/Services/unit.service';
import { ProjectComponent } from 'src/app/Components/project/project.component';
import { AddProjectComponent } from 'src/app/Components/add-project/add-project.component';


@NgModule({
  declarations: [
    ProjectDashboardComponent,
    UnitsComponent,
    DevicesComponent,
    EmptyListComponent,
    AddUnitComponent,
    AddDeviceComponent,
    ProjectComponent,
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule        
  ],
  providers: [
    UnitService
  ]
})
export class ProjectModule { }
