import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ArchiveRoutingModule } from "./archive-routing.module";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/Material/angular.material";
import { ArchiveService } from "src/app/Shared/Services/archive.service";
import { ArchiveTabComponent } from "src/app/Components/archive/archive-tab/archive-tab.component";


@NgModule({
    declarations: [
        ArchiveTabComponent

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