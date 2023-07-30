import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Material/angular.material';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ContentComponent } from './Components/content/content.component';
import { SharedModule } from './Modules/Shared/shared.module';
import { DashboardService } from './Shared/Services/dashboard.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CommunicationService } from './Shared/Services/communication.service';
import { AuthService } from './Shared/Services/auth.service';
import { LoginComponent } from './Components/login/login.component';
import { ProjectService } from './Shared/Services/project.service';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AuthGuard } from './Authentication/auth.guard';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TokenService} from './Service/token.service';
import { RestService } from './Service/rest.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule 
  ],
  providers: [DashboardService, CommunicationService, AuthService, ProjectService, AuthGuard, TokenService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
