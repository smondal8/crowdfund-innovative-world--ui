import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDashboardComponent } from 'src/app/Components/project-dashboard/project-dashboard.component';
import { ProjectComponent } from 'src/app/Components/project/project.component';

const routes: Routes = 
[{ path: '', component: ProjectComponent },
  { path: 'project-dashboard', component: ProjectDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }