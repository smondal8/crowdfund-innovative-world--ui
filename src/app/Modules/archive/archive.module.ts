import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ArchiveRoutingModule } from "./archive-routing.module";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/Material/angular.material";
import { ArchiveService } from "src/app/Shared/Services/archive.service";
import { ArchiveTabComponent } from "src/app/Components/archive/archive-tab/archive-tab.component";
import { UnitsTabComponent } from "src/app/Components/archive/units-tab/units-tab.component";
import { DeviceTabComponent } from "src/app/Components/archive/device-tab/device-tab.component";
import { PhasesofdeviceTabComponent } from "src/app/Components/archive/phasesofdevice-tab/phasesofdevice-tab.component";


@NgModule({
    declarations: [
        ArchiveTabComponent,
        UnitsTabComponent,
        DeviceTabComponent,
        PhasesofdeviceTabComponent,

    ],
    imports: [
        ArchiveRoutingModule,
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    providers: [
        ArchiveService
    ]
})

export class ArchiveModule {

}