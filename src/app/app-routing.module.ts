import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from 'src/app/Authentication/auth.guard';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    data : {
      userRoles : []
    }
  },
  {
    path:'dashboard',
    canActivate: [AuthGuard],
    data : {
      userRoles : []
    },
    loadChildren: ()=>import('./Modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path:'project',
    canActivate: [AuthGuard],
    data : {
      userRoles : []
    },
    loadChildren: ()=>import('./Modules/project/project.module').then(m=>m.ProjectModule)
  },
  {
    path:'archive',
    canActivate: [AuthGuard],
    data : {
      userRoles : []
    },
    loadChildren: ()=>import('./Modules/archive/archive.module').then(m=>m.ArchiveModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
