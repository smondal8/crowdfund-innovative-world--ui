import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  dummyData = [{name: 'xyz', phasetemplate: 'Phase 1', date: '02-02-2025', actions: 'delete'},
  {name: 'abc', phasetemplate: 'Phase 2', date: '02-02-2024', actions: 'delete'},
  {name: 'mnp', phasetemplate: 'Phase 3', date: '02-02-2023', actions: 'Save'}];

  private units = new BehaviorSubject<any>(this.dummyData);
  constructor() { }

  getUnits(): Observable<any>{
    return this.units.asObservable()
  }

  updateUnits(unit) {
    for(let element of unit) {
      this.dummyData.push(element);    
    }
    
    this.units.next(this.dummyData);
  }
}
