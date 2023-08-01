import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardUploadComponent } from 'src/app/Components/dashboard-upload/dashboard-upload.component';
import { DashboardComponent } from 'src/app/Components/dashboard/dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent },
                        {path: 'upload', component:DashboardUploadComponent, pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
