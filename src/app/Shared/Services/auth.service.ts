import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = environment.baseURL;

  constructor(private communicationservice : CommunicationService) { }

  getExactUserRole() :  Observable<string>{
    return this.communicationservice.SendGetRequest(this.baseURL + '/roles/exactUserRole', {responseType: 'text'});
  }

  findPortalAccess() : Observable<any>{
    return this.communicationservice.SendGetRequest(this.baseURL + '/users/portal', {
                                                    headers: new HttpHeaders({
                                                    'Content-Type': 'application/json'})});
  }
}
