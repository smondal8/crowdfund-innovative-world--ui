import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArchiveTabComponent } from "src/app/Components/archive/archive-tab/archive-tab.component";


const routes: Routes = [
    {path:'',component:ArchiveTabComponent,children:[
      {path:'',redirectTo:'units',pathMatch:'full'}
    ]},  
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class ArchiveRoutingModule {

}