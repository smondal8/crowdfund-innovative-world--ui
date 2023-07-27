import { Type } from "@angular/core";

export interface TableStructure{
    rowList : TableHeader[],
    columnList : TableHeader[]
}

export interface TableHeader{
    name : string,
    type : string
}