import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {OverlayModule} from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

const MaterialComponent = [
  MatButtonModule, 
  MatToolbarModule, 
  MatCardModule, 
  MatIconModule, 
  MatSidenavModule, 
  MatTabsModule, 
  MatExpansionModule, 
  MatProgressSpinnerModule, 
  MatTableModule, 
  MatPaginatorModule, 
  MatGridListModule,
  OverlayModule, 
  MatDialogModule, 
  MatDividerModule, 
  MatListModule,
  MatFormFieldModule,
  MatRadioModule,
  MatIconModule, 
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule
];

@NgModule({
    declarations: [],
    imports: [
      MaterialComponent
    ],
    exports:[MaterialComponent]
  })
  export class MaterialModule { }