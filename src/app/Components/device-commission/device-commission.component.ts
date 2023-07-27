import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { devicephasemodel } from 'src/app/Models/Interfaces/ProjectModel';
import { DeviceClass, DevicePhase } from 'src/app/Models/ViewModels/ProjectClass';
import { ProjectService } from 'src/app/Shared/Services/project.service';
import { AddPhaseStepComponent } from './add-phase-step/add-phase-step.component';

@Component({
  selector: 'app-device-commission',
  templateUrl: './device-commission.component.html',
  styleUrls: ['./device-commission.component.scss']
})
export class DeviceCommissionComponent implements OnInit {
  
  devicedetails : DeviceClass;
  devicephaseList : devicephasemodel[];
  $devicePhaseSubscription : Subscription;
  currentactivephase : DevicePhase;
  activeindex :number;
  date : Date = new Date();
  stepName: string;
  constructor(private _projectservice : ProjectService, private router : Router, private activaterouter : ActivatedRoute,
    public dialog: MatDialog) { 
    
    this._projectservice.phasevalidationsubject.subscribe( (status)=>{
        if(status === "Completed")
        {
          this.currentactivephase.validate = status;
          this.activeindex++;
          if(this.devicephaseList.length > this.activeindex)
          {
            this.currentactivephase = this.devicephaseList[this.activeindex];
            this.currentactivephase.validate = "InProgress";
            this.currentactivephase.data.data = [];
            this._projectservice.SetActiveProjectPhase(this.devicephaseList[this.activeindex]);
            this.router.navigate([this.activeindex], {relativeTo: this.activaterouter});
          }
        }
        else if(status === "InProgress")
        {          
          this.currentactivephase.validate = status;
          this.activeindex++;
          if(this.devicephaseList.length > this.activeindex)
          {
            this.currentactivephase = this.devicephaseList[this.activeindex];
            this.currentactivephase.validate = "InActive";
            this._projectservice.SetActiveProjectPhase(this.devicephaseList[this.activeindex]);           
          }
        } 
        else if(status === 'Skipped') {
          this.currentactivephase.validate = status;
          this.activeindex++;
          if(this.devicephaseList.length > this.activeindex)
          {
            this.currentactivephase = this.devicephaseList[this.activeindex];
            this.currentactivephase.validate = "InProgress";
            this.currentactivephase.data.data = [];
            this._projectservice.SetActiveProjectPhase(this.devicephaseList[this.activeindex]); 
            this.router.navigate([this.activeindex], {relativeTo: this.activaterouter});          
          }
        }
    });
  }

  ngOnInit(): void {
    this.$devicePhaseSubscription = this._projectservice.GetProjectPhases("1", "1","1").subscribe((data : devicephasemodel[])=>{
        this.devicephaseList = data;
        this.activeindex = this.devicephaseList.findIndex(x => x.validate === "InProgress");
        this.currentactivephase = this.devicephaseList[this.activeindex];
        this._projectservice.SetActiveProjectPhase(this.currentactivephase);
        this.router.navigate([this.activeindex], {relativeTo: this.activaterouter});
    })
  }

  isLastCompleted(phase) {
    let isActive;
    if (this.devicephaseList) {
      const activeindex = this.devicephaseList.findIndex(x => x.id === phase.id);
      const nextPhase = this.devicephaseList[activeindex + 1];
      if ((nextPhase && (nextPhase.validate === 'InProgress' || nextPhase.validate === 'Skipped'))) {
        isActive = false;
      } else {
        isActive = true;
      }

    }
    return isActive;
  }

  OnCardClick(selectedPhase : devicephasemodel, index : number){
    if(selectedPhase.validate === "InActive" || selectedPhase.validate === "Skipped")
    {
        return;
    }
    else
    {
      this.$devicePhaseSubscription = this._projectservice.GetProjectPhases("1", "1","1").subscribe((data : devicephasemodel[])=>{
        this.currentactivephase = selectedPhase;
        this.activeindex = index;
        this._projectservice.SetActiveProjectPhase(this.currentactivephase);
        this.router.navigate([index], {relativeTo: this.activaterouter});
    })
    }
  }

  openDialog(phase): void {
    const dialogRef = this.dialog.open(AddPhaseStepComponent, {
      data: {name: this.stepName, phase: phase},
    });

    dialogRef.afterClosed().subscribe(result => {      
      if(result && result.name) {
        const activeindex = this.devicephaseList.findIndex(x => x.id === result.phase.id);
        const data = {...this.devicephaseList[0]};
        data.name = result.name;
        data.validate = 'InProgress';
        data.id =  `${this.devicephaseList.length + 1}`;
        this.devicephaseList.forEach( element => {
          if(element.validate == 'InProgress') {
            element.validate = 'InActive';
          }
        })
        this.devicephaseList.splice(activeindex + 1, 0, data);
      }
    });
  }

}
