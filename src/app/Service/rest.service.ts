import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class RestService {
 
 public baseURL = '';
 timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
 constructor(private http: HttpClient) {
   this.baseURL = environment.baseURL;
 }

 httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Zone-Id': this.timezone
   })
 };

 authenticate(loginForm): Observable<any> {
   return this.http.post<any>(this.baseURL + '/authenticate', loginForm, this.httpOptions);
 }

 fetchProfile(userId): Observable<any> {
  return this.http.get<any>(this.baseURL + '/fetchUserProfile/' + userId,this.httpOptions);
 }

 getProject(userId): Observable<any> {
  return this.http.get<any>(this.baseURL + '/getProject/' + userId,this.httpOptions);
 }

 createProject(userId,projectForm): Observable<any> {
  return this.http.post<any>(this.baseURL + '/createProject/' + userId, projectForm, this.httpOptions);
 }

 registerUser(registerUserForm): Observable<any> {
  return this.http.post<any>(this.baseURL + '/register', registerUserForm, this.httpOptions);
 }

}

