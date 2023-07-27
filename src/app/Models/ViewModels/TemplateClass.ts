import { Template } from "../Interfaces/DashBoardCardModel";
import { FileClass } from "./FileClass";

export class Templateclass implements Template{
    constructor(public name : string, public totalcount : number,
                public lastupdatedate : string, public Files : FileClass[]){}

    AddFile(_file : FileClass)
    {
        this.Files.unshift(_file);
        this.UpdateFileDetails();        
    }

    AddFiles(_files : FileClass[])
    {
        this.Files = [..._files, ...this.Files];
        this.UpdateFileDetails();
    }

    DeleteFile(_file : FileClass)
    {
        this.Files = this.Files.filter( x => x.id !== _file.id);
        this.UpdateFileDetails(true);
    }

    private UpdateFileDetails(deleteflag : boolean = false)
    {
        if(deleteflag)
        {
            this.totalcount = this.totalcount !== 0 ? this.totalcount - 1 : 0
            this.lastupdatedate = Date.now.toString();
            return;
        }
        this.totalcount = this.Files.length;
        this.lastupdatedate = this.Files[0].uploaddate;
    }
}