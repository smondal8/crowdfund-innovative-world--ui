import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { warningData } from 'src/app/Models/Interfaces/warningData';

@Component({
  selector: 'app-warning-invalidate-skip-dialog',
  templateUrl: './warning-invalidate-skip-dialog.component.html',
  styleUrls: ['./warning-invalidate-skip-dialog.component.scss']
})
export class WarningInvalidateSkipDialogComponent implements OnInit {

  text:string = ''; 

  constructor(public dialogRef:MatDialogRef<WarningInvalidateSkipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: warningData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
