import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningInvalidateSkipDialogComponent } from './warning-invalidate-skip-dialog.component';

describe('WarningInvalidateSkipDialogComponent', () => {
  let component: WarningInvalidateSkipDialogComponent;
  let fixture: ComponentFixture<WarningInvalidateSkipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningInvalidateSkipDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningInvalidateSkipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
