import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UnitService } from 'src/app/Shared/Services/unit.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {
  unitForm: FormGroup;
  submitted = false;
  
  @Output() closeDrawer = new EventEmitter<any>();
  @ViewChild(MatTable) unitTable!: MatTable<any>;
  templates = ['phase1', 'phase 2', 'phase 3'];
  displayedColumns: string[] = ['name', 'phasetemplate', 'actions'];
  tabledata = [{name: 'xyz', phasetemplate: 'Phase 1', date: '02-02-2025', actions: 'delete'}];  

  constructor(private formBuilder: FormBuilder, private unitService: UnitService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  get f() { return this.unitForm.controls; }

  createForm() {
    this.unitForm = this.formBuilder.group({
      unitName: ['', Validators.required],
      phaseTemplate: ['', Validators.required]
    })
  }

  addToPreview() {
    this.submitted = true;
    const formData = {
      name: this.unitForm.value.unitName,
      phasetemplate: this.unitForm.value.phaseTemplate,
      date: '02-02-2023',
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

  addUnit() {
    if(this.tabledata && this.tabledata.length > 0) {
      this.unitService.updateUnits(this.tabledata);
      this.cancel();
      this.toastr.success(`${this.tabledata.length} log items added successfully`);
    }    
  }

}
