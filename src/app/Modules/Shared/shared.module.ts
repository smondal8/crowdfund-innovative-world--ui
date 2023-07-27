import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragdropDirective } from 'src/app/Directives/DragandDrop/dragdrop.directive';
import { UserroleDirective } from 'src/app/Directives/UserRole/userrole.directive';
import { DeleteComponent } from 'src/app/Components/delete/delete.component';
import { MaterialModule } from 'src/app/Material/angular.material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowseComponent } from 'src/app/Components/dashboard-upload/browse/browse.component';

@NgModule({
  declarations: [
    DragdropDirective,
    UserroleDirective,
    DeleteComponent,
    BrowseComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    DragdropDirective,
    DeleteComponent,
    BrowseComponent
  ]
})
export class SharedModule { }
