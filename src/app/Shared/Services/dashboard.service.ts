import { Injectable } from '@angular/core';
import { filter, from, map, Observable, of, Subject } from 'rxjs';
import { dashboardcardMode, DashBoardModule } from 'src/app/Models/Interfaces/DashBoardCardModel';
import { CommunicationService } from './communication.service';
import * as config from '../../../app.config';
import { DashBardData } from 'src/app/StimulatedData/DashBoardData';
import { FileClass } from 'src/app/Models/ViewModels/FileClass';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private isStimulationEnabled : boolean = config.AppConfig.isStimulationEnabaled;
  dashboardcarddata : dashboardcardMode[];
  _dummydata : DashBardData = new DashBardData()
  filesaveSubject$ : Subject<void>;
  constructor(private _httpservice : CommunicationService) {
    this.filesaveSubject$ = new Subject();
   }

  GetTemplateData() : Observable<DashBoardModule>{
    if(this.isStimulationEnabled)
    {
      return of(this._dummydata.GetDashBoardData());
    }
    else
    {
      // replace with org url
      return this._httpservice.SendGetRequest("");
    }
  }

  GetTemplateFiles(templatename : string):Observable<FileClass[]>{
    if(this.isStimulationEnabled)
    {
      return from(this._dummydata.GetDashBoardData().templates).
             pipe(filter( x=> x.name === templatename),map(x => x.Files))
    }
    else
    {
      return this._httpservice.SendGetRequest("");
    }
  }

  SaveTemplateFiles(templatename : string, _formdata : FormData, files : FileClass[])
  {
    if(this.isStimulationEnabled)
    {
      this._dummydata.SaveFileChanges(templatename, files);
    }
    else{
      this._httpservice.SendPostRequest<Boolean, FormData>('', _formdata);
    }
  }
}
