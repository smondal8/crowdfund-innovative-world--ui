import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { devicephasemodel } from 'src/app/Models/Interfaces/ProjectModel';
import { DeviceClass, DevicePhase } from 'src/app/Models/ViewModels/ProjectClass';
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
  constructor(private router : Router, private activaterouter : ActivatedRoute,
    public dialog: MatDialog) { 
  
  }

  ngOnInit(): void {
    
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
