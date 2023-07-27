import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class CommunicationService {
    constructor(private http: HttpClient) { }
  
    SendPostRequest<T, K>(url : string, body : K) : Observable<T>
    {
      return this.http.post<T>(url, body);
    }

    SendGetRequest<T, k>(url : string, options ?:{})
    {
        return this.http.get<T>(url, options);
    }
  }