import { DashBoardModule } from "../Models/Interfaces/DashBoardCardModel";
import { FileClass } from "../Models/ViewModels/FileClass";
import { Templateclass } from "../Models/ViewModels/TemplateClass";

export class DashBardData{
    private _dashboarddata : DashBoardModule;

    constructor()
    {
        this._dashboarddata = {
            syncdata : {},
            templates: [new Templateclass('Phase', 0, null, []),
                        new Templateclass('Device', 0, null, [])]
        }
        this.SetInitialDataData()
    }

    private SetInitialDataData()
    {
        const phasetemplate = this._dashboarddata.templates.find(X => X.name == "Phase");
        let samplefiles = [new FileClass(undefined, 'First.xlxs', Date.now().toString(), true),
                           new FileClass(undefined, 'second.xlxs', Date.now().toString(), true)]
        phasetemplate.AddFiles(samplefiles);
        return this._dashboarddata;
    }

    GetDashBoardData()
    {
        return this._dashboarddata;
    }

    AddFile(templatetype : string, _files :FileClass[])
    {
        let obj = this._dashboarddata.templates.find(x => x.name === templatetype);
        obj?.AddFiles(_files);
        console.log(obj?.Files.slice());
        return obj?.Files.slice();
    }

    DeleteFile(templatetype : string, _file :FileClass)
    {
        let obj = this._dashboarddata.templates.find(x => x.name === templatetype);
        obj?.DeleteFile(_file);
        return obj?.Files.slice();
    }

    SaveFileChanges(templatetype : string, _files : FileClass[])
    {
        console.log("Inside Save Files");
        let obj = this._dashboarddata.templates.find(x => x.name === templatetype);
        if(obj)
        {
            obj.Files = [..._files];
            obj.lastupdatedate = obj.Files[0].uploaddate,
            obj.totalcount = obj.Files.length;
        }
    }
}