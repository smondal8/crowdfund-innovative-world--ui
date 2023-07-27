import { DeviceClass, DevicePhase, ProjectClass, UnitClass } from "src/app/Models/ViewModels/ProjectClass";
import { CommunicationService } from "./communication.service";
import { ProjectStimulatdData } from "src/app/StimulatedData/ProjectData";
import { BehaviorSubject, Observable, Subject, forkJoin, map, of, pipe } from "rxjs";
import { Injectable } from "@angular/core";
import { DeviceModel, devicephasemodel } from "src/app/Models/Interfaces/ProjectModel";
import { User } from "src/app/Models/Interfaces/user";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
export class ProjectService{
    private projectData : ProjectStimulatdData;
    private projectlist : ProjectClass[];
    private selectedProject : ProjectClass;
    private selectedUnit : UnitClass;
    private selectedDevice : DeviceClass;
    private selectedPhase : DevicePhase;

    public phasevalidationsubject : Subject<string>;

    projects = [{name:'DUBAL-DUB01'},{name:'DUBAL-DUB02'},{name:'DUBAL-03'}];

    private proj = new BehaviorSubject<any>(this.projects);

    constructor(private _commuicationservice: CommunicationService)
    {
        this.projectData = new ProjectStimulatdData();
        this.projectlist = this.projectData.getProjectList();
        this.phasevalidationsubject = new Subject<string>();
    }

    SetCurrentActiveProject(project : ProjectClass){
        this.selectedProject = project;
    }

    GetCurrentActiveProject()
    {
        return this.selectedProject;
    }

    SetCurrentActiveUnit(unit : UnitClass)
    {
        this.selectedUnit = unit
    }

    GetCurrentActiveUnit()
    {
        return this.selectedUnit;
    }

    SetCurrentActiveDevice(device : DeviceClass)
    {
        this.selectedDevice = device;
    }

    GetCurrentActiveDevice()
    {
        return this.selectedDevice;
    }

    SetActiveProjectPhase(phase : DevicePhase)
    {
        this.selectedPhase = phase; 
    }

    GetActiveProjectphase()
    {
        return this.selectedPhase;
    }

    GetAllProjects()
    {
        return this.projectlist;
    }

    GetProjectbyId(id : string)
    {
        return this.projectlist.find( x=> x.id === id);
    }

    GetDevicedetails(projectid : string, unitid: string, deviceid :string) :Observable<DeviceModel>
    {
        let project = this.projectlist.find(x => x.id === projectid);
        let unit = project.GetUnitbyId(unitid);
        let device = unit.GetDevicebyId(deviceid);
        return of(device);
    }

    GetProjectPhases(projectid : string, unitid: string, deviceid :string) : Observable<devicephasemodel[]>
    {   
        let project = this.projectlist.find(x => x.id === projectid);
        let unit = project.GetUnitbyId(unitid);
        let device = unit.GetDevicebyId(deviceid);
        return of(device.phases);
    }



    GetProjectTableData(projectid, unitid, deviceid, phaseid)
    {
        let project = this.projectlist.find(x => x.id === projectid);
        let unit = project.GetUnitbyId(unitid);
        let device = unit.GetDevicebyId(deviceid);
        let tables = device.phases.find(x => x.id == phaseid).data;
        return of(tables);
    }

    SetProjectTableData(projectid, unitid, deviceid, phaseid, validatsts, data, imgUrl,) : Observable<boolean>
    {
        let project = this.projectlist.find(x => x.id === projectid);
        let unit = project.GetUnitbyId(unitid);
        let device = unit.GetDevicebyId(deviceid);
        let tables = device.phases.find(x => x.id === phaseid);
        tables.validate = validatsts;
        tables.imageUrl = imgUrl;
        tables.data.setData(data);
        return of(true);
    }
}
