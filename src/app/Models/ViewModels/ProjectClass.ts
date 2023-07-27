import { DeviceModel, ProjectModel, UnitModel, datastructure, devicephasemodel, locationmodel, tabledata } from "../Interfaces/ProjectModel";


export class ProjectClass implements ProjectModel
{
    constructor(public id : string,public name : string,public units : UnitClass[] )
    {
    }
    AddUnits(unit :UnitClass)
    {
        this.units.push(unit);
    }

    GetUnits()
    {
        return this.units;
    }

    GetUnitbyId(id :string)
    {
        return this.units.find( x=> x.id === id);
    }
}

export class UnitClass implements UnitModel
{
    constructor(public id: string, public name: string, public phasetemplate: string, public devices: DeviceModel[])
    {
    }

    AddDevice(device : DeviceClass)
    {
        this.devices.push(device);
    }
    GetDevices()
    {
        return this.devices;
    }

    GetDevicebyId(id :string)
    {
        return this.devices.find( x=> x.id === id);
    }
}

export class DeviceClass implements DeviceModel{
    constructor(public id: string, 
                public name : string, 
                public type :string,
                public deviceversion : string,
                public phasetemplate : string,
                public location : locationmodel,
                public phases : devicephasemodel[]){
                }

    AddPhases(phase : devicephasemodel)
    {
        this.phases.push(phase);
    }
    GetPhases()
    {
        return this.phases;
    }

    GetPhasebyId(id :string)
    {
        return this.phases.find( x=> x.id === id);
    }
}

export class Location implements locationmodel
{   
    constructor(public cabinet :string, public frame : string, public place : string){
    }
}

export class DevicePhase implements devicephasemodel{
    constructor(public id : string, public name: string, public date: string, public validate: string,public imageUrl : string, public data: tabledata){
    }
    
}

export class Table implements tabledata{
    constructor(public row : string[], public columns : datastructure[], public data : any = undefined){
    }

    public setData(data : [])
    {
        this.data = data
    }
}

export class CellStructure implements datastructure{
    constructor(public name : string, public type : string, public dataoptions : any = undefined){
    }
}