import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArchiveTabComponent } from "src/app/Components/archive/archive-tab/archive-tab.component";
import { UnitsTabComponent } from "src/app/Components/archive/units-tab/units-tab.component";
import { DeviceTabComponent } from "src/app/Components/archive/device-tab/device-tab.component";
import { PhasesofdeviceTabComponent } from "src/app/Components/archive/phasesofdevice-tab/phasesofdevice-tab.component";


const routes: Routes = [
    {path:'',component:ArchiveTabComponent,children:[
      {path:'',redirectTo:'units',pathMatch:'full'},     
      {path:'units',component:UnitsTabComponent},
      {path:'devices',component:DeviceTabComponent},
      {path:'phasesofdevices',component:PhasesofdeviceTabComponent}
    ]},  
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class ArchiveRoutingModule {

}