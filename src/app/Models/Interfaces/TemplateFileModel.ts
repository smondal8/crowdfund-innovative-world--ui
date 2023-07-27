export interface Cardlayoutmodel{
    name : string,
    lastmodifieddate : Date|null,
    Files : TemplateFileModel[]
}
export interface TemplateFileModel{
    name : string | null;
    date : Date | null;
    uploadstatus : boolean;
    data : {};
}