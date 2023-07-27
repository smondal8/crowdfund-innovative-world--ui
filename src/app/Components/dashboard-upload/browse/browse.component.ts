import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FileClass } from 'src/app/Models/ViewModels/FileClass';
import { DashboardService } from 'src/app/Shared/Services/dashboard.service';
import * as Config from '../../../../app.config'

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {
  @Output() FileUploadEvent : EventEmitter<FileClass[]>;
  @Input() Template: string ='';
  @Input() TitleDisplaySts :boolean;
  browseTitle : string | any;
  @Input()FileConfig: any;
  file_selection_form: FormGroup;
  private file_selection_sub: Subscription;
  @ViewChild("fileSelector", {static: false}) file_selector!: ElementRef;

  constructor() { 
    this.file_selection_form = new FormGroup({
      file_selection: new FormControl()
    });
    this.FileUploadEvent = new EventEmitter<FileClass[]>();
  }

  ngOnInit(): void {
    this.browseTitle = `Upload ${this.Template.toLowerCase()} template below`;
    this.trackFileSelection();
  }

  ngOnDestroy(): void {
    this.file_selection_sub.unsubscribe();
  }

  trackFileSelection(){
    this.file_selection_sub = this.file_selection_form.get('file_selection')?.valueChanges.subscribe(
      ()=>{
        const file_selection = this.file_selector.nativeElement;
        this.selectFiles(file_selection.files);
        this.file_selector.nativeElement.value = '';
      }
    ) as Subscription;
  }

  selectFiles(files : File[])
  {
    const _filelist = []
    for(let _file of files)
    {
      _filelist.unshift(new FileClass(undefined, _file.name, Date.now().toString(), false, _file));
    }
    this.UploadFile(_filelist);
  }

  openFileSelector(){
    const file_selection = this.file_selector.nativeElement;
    file_selection.click();
  }

  UploadFile(file : FileClass[])
  {
    this.FileUploadEvent.emit(file);
  }
}
