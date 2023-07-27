import { CellStructure, DevicePhase, ProjectClass, Table, Location, DeviceClass, UnitClass } from "../Models/ViewModels/ProjectClass";

export class ProjectStimulatdData{
    projectlist :ProjectClass[];
    Tables : Table[];

    constructor()
    {
        let Table1 : Table = new Table(["E1672(PLC A)", "E1672(PLC B)", "E1672(PLC C)"],
                                        [new CellStructure("Module", "header"),
                                        new CellStructure("A.XXXX", "text"),
                                        new CellStructure("V._XX", "text"),
                                        new CellStructure("dd/mm/yyyy",  "date"),
                                        new CellStructure("c.XXXX",  "text"),
                                        new CellStructure("C.XXXX", "text"),
                                        new CellStructure("Reason of Change", "text")]);

        let Table2 : Table = new Table(["Activate Safety Date", "Current compilation"],
                                        [new CellStructure("Description","header"),
                                        new CellStructure("C1", "text"),
                                        new CellStructure("Date", "date"),
                                        new CellStructure("Signature of officer", "signature")]);

        let devicephase1 : DevicePhase = new DevicePhase("1", "Engineering 1", "11/12/2012", "InProgress","", Table1);
        let devicephase2 : DevicePhase = new DevicePhase("2", "Test Bay", "11/12/2012", "InActive","", Table2);
        let devicephase3 : DevicePhase = new DevicePhase("3", "Engineering 2", "11/12/2012", "InActive","", Table1);
        let devicephase4 : DevicePhase = new DevicePhase("4", "Start Commissioning", "11/12/2012", "InActive","", Table2);
        let devicephase5 : DevicePhase = new DevicePhase("5", "Start F-Commisioning", "11/12/2012", "InActive","", Table1);
        let devicephase6 : DevicePhase = new DevicePhase("6", "End F-Commissioning", "11/12/2012", "InActive","", Table2);
        let devicephase7 : DevicePhase = new DevicePhase("7", "End Commisioning", "11/12/2012", "InActive","", Table1);
        let location : Location = new Location("C1", "F1", "P1");

        let braun : DeviceClass = new DeviceClass("1", "Braun", "Unit1", "1.0.0", "Phase1", location, 
                                [devicephase1,devicephase2,devicephase3,devicephase4,devicephase5,devicephase6,devicephase7])
        let unit1 : UnitClass = new UnitClass("1", "Unit1", "Phase1", [braun]);
        let project : ProjectClass = new ProjectClass("1", "Project1", [unit1]);
        this.projectlist= [project];
    }

    getProjectList(){
        return this.projectlist;
    }
}