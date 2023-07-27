import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-phase-step',
  templateUrl: './add-phase-step.component.html',
  styleUrls: ['./add-phase-step.component.scss']
})
export class AddPhaseStepComponent implements OnInit {  

  constructor(public dialogRef: MatDialogRef<AddPhaseStepComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
