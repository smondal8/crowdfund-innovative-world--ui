import { filestructure } from "../Interfaces/DashBoardCardModel";

export class FileClass implements filestructure{
    constructor(public id: string = Date.now().toString(36) + Math.random().toString(36).slice(2),
    public name : string, public uploaddate : string, public uploadsts : boolean,
                public file : File = null){
    }
}