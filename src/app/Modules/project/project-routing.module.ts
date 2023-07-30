import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommisiontableComponent } from 'src/app/Components/commisiontable/commisiontable.component';
import { DeviceCommissionComponent } from 'src/app/Components/device-commission/device-commission.component';
import { DevicesComponent } from 'src/app/Components/devices/devices.component';
import { ProjectDashboardComponent } from 'src/app/Components/project-dashboard/project-dashboard.component';
import { ProjectComponent } from 'src/app/Components/project/project.component';
import { UnitsComponent } from 'src/app/Components/units/units.component';

const routes: Routes = 
[{ path: '', component: ProjectComponent },
  { path: 'project-dashboard', component: ProjectDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }