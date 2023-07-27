import { Templateclass } from "../ViewModels/TemplateClass"

export interface dashboardcardMode{
    name : string,
    count : number,
    date : Date,
}

export interface filestructure{
    id : string,
    name : string,
    uploadsts : boolean
}

export interface Template{
    name : string,
    totalcount : number,
    lastupdatedate: string,
    Files : filestructure[]
}

export interface DashBoardModule{
    syncdata: {},
    templates : Templateclass[]
}

