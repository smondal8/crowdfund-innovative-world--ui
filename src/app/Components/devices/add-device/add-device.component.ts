import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnitService } from 'src/app/Shared/Services/unit.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  deviceForm: FormGroup;
  submitted = false;
  
  @Output() closeDrawer = new EventEmitter<any>();
  @ViewChild(MatTable) unitTable!: MatTable<any>;
  templates = ['phase1', 'phase 2', 'phase 3'];
  displayedColumns: string[] = ['cabinet', 'frame', 'place', 'device', 'version', 'unit', 'phase', 'actions'];
  tabledata = [{cabinet: 'C1', frame: 'F1', place: 'P2', device: 'Braun', version: '1.1', unit: 'Unit 1', phase: 'Ph1', actions: ''}];
  
  constructor(private formBuilder: FormBuilder, private unitService: UnitService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  get f() { return this.deviceForm.controls; }

  createForm() {
    this.deviceForm = this.formBuilder.group({
      unit: ['', Validators.required],
      deviceType: ['', Validators.required],
      deviceVersion: ['', Validators.required],
      phaseTemplate: ['', Validators.required],
      cabinet: ['', Validators.required],
      frame: ['', Validators.required],
      place: ['', Validators.required]
    })
  }

  addToPreview() {
    this.submitted = true;
    const formData = {
      device: this.deviceForm.value.deviceType,
      version: this.deviceForm.value.deviceVersion,
      unit: this.deviceForm.value.unit,
      phase: this.deviceForm.value.phaseTemplate,
      cabinet: this.deviceForm.value.cabinet,
      frame: this.deviceForm.value.frame,
      place: this.deviceForm.value.place,     
      actions: ''
    };   

    this.tabledata.push(formData);   
    this.unitTable.renderRows(); 
  }

  delete(element) {
    const index = this.tabledata.indexOf(element);
    this.tabledata.splice(index, 1);
    this.unitTable.renderRows();
  }

  cancel() {
    this.closeDrawer.emit();
  }

  addDevice() {
    if(this.tabledata && this.tabledata.length > 0) {
      this.unitService.updateUnits(this.tabledata);
      this.cancel();
      this.toastr.success(`${this.tabledata.length} log items added successfully`);
    }    
  }

}
