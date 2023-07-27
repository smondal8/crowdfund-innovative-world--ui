import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class ArchiveService {

  archiveAllData=[
    { Archivedlists: 'Unit', Unitno: '1', Unitname: 'XYZ', Phasename: 'Phase 1', Phaseversion: '1.0',date: '4/25/2022', Reason: 'Due to...' },
    { Unitno: '2', Unitname: 'ZAB', Phasename: 'Phase 2', Phaseversion: '1.0', date: '5/15/2022', Reason: 'Due to...' },
    { Unitno: '3', Unitname: 'BCD', Phasename: 'Phase 3', Phaseversion: '1.0', date: '7/23/2022', Reason: 'Due to...' },
    
    { Archivedlists: 'Device', Unitno: '1', Unitname: 'XYZ', Phasename: 'Phase 1',Devicetype: 'BRAUN 1', Deviceversion: '1.1',  Cabinet: 'C1', Frame: 'F2', Place: 'P2',date: '4/25/2022', Reason: 'Due to...' },
    { Unitno: '2', Unitname: 'ZAB', Phasename: 'Phase 2',Devicetype: 'BRAUN 2', Deviceversion: '1.1',  Cabinet: 'C2', Frame: 'F3', Place: 'P4',date: '5/22/2022', Reason: 'Due to...' },
    { Unitno: '3', Unitname: 'BCD', Phasename: 'Phase 3',Devicetype: 'BRAUN 3', Deviceversion: '1.1',  Cabinet: 'C2', Frame: 'F3', Place: 'P4',date: '4/24/2022', Reason: 'Due to...' },

    {Archivedlists:'Phase of device',Unitno:'1',Unitname:'XYZ',Phasename: 'Engineering 1',Devicetype:'BRAUN 1',Deviceversion:'1.1',Location:'10CJP01.AAA001',Cabinet:'C1',Frame:'F2',Place:'P2',date:'5/2/2023',Reason:'Due to ...'},
    {Unitno:'2',Unitname:'ZAB',Phasename: 'Test bay',Devicetype:'BRAUN 2',Deviceversion:'1.1',Location:'10CJP01.AAA001',Cabinet:'C2',Frame:'F3',Place:'P4',date:'5/2/2023',Reason:'Due to ...'},
    {Unitno:'3',Unitname:'BCD',Phasename: 'Engineering 2',Devicetype:'BRAUN 3',Deviceversion:'1.1',Location:'10CJP01.AAA001',Cabinet:'C1',Frame:'F2',Place:'P2',date:'5/2/2023',Reason:'Due to ...'},
  ];

  dummyData = [
      {Archivedlists: 'Unit',Unitname: 'XYZ',Phasetemplate:'Phase 1',date:'11/10/2022',Reason:'Due to ...'},
      {Unitname: 'ZAB',Phasetemplate:'Phase 2',date:'10/9/2022',Reason:'Due to ...'},
      {Unitname: 'BCD',Phasetemplate:'Phase 3',date:'12/11/2023',Reason:'Due to ...'},
  ];

  deviceData=[
    {Archivedlists:'Device',Unit:'XYZ',Devicetype:'BRAUN 1',Deviceversion:'1.1',Phasetemplate:'Phase 1',Location:'10CJP01.AAA001',Cabinet:'C1',Frame:'F2',Place:'P2',Date:'2/28/2023',Reason:'Due to ...'},
    {Unit:'ZAB',Devicetype:'BRAUN 2',Deviceversion:'1.1',Phasetemplate:'Phase 2',Location:'10CJP01.AAA001',Cabinet:'C2',Frame:'F3',Place:'P3',Date:'9/12/2023',Reason:'Due to ...'},
    {Unit:'ZAB',Devicetype:'BRAUN 3',Deviceversion:'1.1',Phasetemplate:'Phase 3',Location:'10CJP01.AAA001',Cabinet:'C3',Frame:'F2',Place:'P2',Date:'9/12/2023',Reason:'Due to ...'}
  ];

  phasesOfDevices=[
    {Archivedlists:'Phase of device',Unitno:'1',Unitname:'XYZ',Phasetemplate:'Engineering 1',Devicetype:'BRAUN 1',Deviceversion:'1.1',Location:'10CJP01.AAA001',Cabinet:'C1',Frame:'F2',Place:'P2',Date:'5/2/2023',Reason:'Due to ...'},
    {Unitno:'2',Unitname:'ZAB',Phasetemplate:'Test bay ',Devicetype:'BRAUN 2',Deviceversion:'1.1',Location:'10CJP01.AAA001',Cabinet:'C2',Frame:'F3',Place:'P4',Date:'12/7/2023',Reason:'Due to ...'},
    {Unitno:'3',Unitname:'BCD',Phasetemplate:'Engineering 2',Devicetype:'BRAUN 3',Deviceversion:'1.1',Location:'10CJP01.AAA001',Cabinet:'C1',Frame:'F2',Place:'P2',Date:'10/3/2021',Reason:'Due to ...'},
  ];

  private archives = new BehaviorSubject<any>(this.dummyData);
  private devicelist=new BehaviorSubject<any>(this.deviceData);
  private phaseslist=new BehaviorSubject<any>(this.phasesOfDevices);
  private allList=new BehaviorSubject<any>(this.archiveAllData);

  constructor() {
  }

  getArchiveAll(): Observable<any> {
    return this.allList.asObservable()
  }

  updateArchiveAll(archive) {
    for (let element of archive) {
      this.archiveAllData.push(element);
    }
    this.archives.next(this.archiveAllData);
  }



  getArchives(): Observable<any> {
    return this.archives.asObservable()
  }

  updateArchive(archive) {
    for (let element of archive) {
      this.dummyData.push(element);
    }
    this.archives.next(this.dummyData);
  }


  getDeviceList(): Observable<any> {
    return this.devicelist.asObservable()
  }

  updateDeviceList(archive) {
    for (let element of archive) {
      this.deviceData.push(element);
    }
    this.devicelist.next(this.deviceData);
  }


  getPhasesList():Observable<any> {
    return this.phaseslist.asObservable();
  }
  updatePhasesList(archive) {
    for (let element of archive){
      this.phasesOfDevices.push(element);
    }
    this.phaseslist.next(this.phasesOfDevices)
  }

}