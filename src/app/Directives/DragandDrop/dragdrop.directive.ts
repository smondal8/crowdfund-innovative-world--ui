import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragdrop]'
})
export class DragdropDirective {

  constructor() { }

  @Output()onFileDropped = new EventEmitter<any>();
  @HostBinding('style.opacity') private workspace_opacity = '1';

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.workspace_opacity = '0.5';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.workspace_opacity = '1';
  }

  @HostListener('drop', ['$event']) public ondrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.workspace_opacity = '1';
    let files = event.dataTransfer!.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }

}
