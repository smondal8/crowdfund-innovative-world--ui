import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
  userRole = new BehaviorSubject<string>(null);

}
