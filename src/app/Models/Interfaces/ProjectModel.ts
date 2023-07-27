export interface ProjectModel{
    name : string,
    id : string,
    units : UnitModel[]
}

export interface UnitModel{
    id : string,
    name : string,
    phasetemplate : string,
    devices : DeviceModel[]
}

export interface DeviceModel{
    id : string,
    name : string,
    type : string,
    deviceversion : string,
    phasetemplate : string,
    location : locationmodel,
    phases : devicephasemodel[]
}

export interface locationmodel{
    cabinet : string,
    frame : string,
    place : string
}

export interface devicephasemodel{
    id :string,
    name : string,
    date : string,
    validate : string,
    imageUrl : string,
    data : tabledata
}

export interface tabledata{
    row : string[],
    columns : datastructure[],
    data : any | undefined,
    setData(data : [])
}

export interface datastructure{
    name : string,
    type : string,
    dataoptions : any
}

export interface rowData {
    value: any;
    isMandatory: boolean;
} 



