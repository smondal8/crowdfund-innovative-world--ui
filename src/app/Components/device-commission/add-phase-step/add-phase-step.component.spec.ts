import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhaseStepComponent } from './add-phase-step.component';

describe('AddPhaseStepComponent', () => {
  let component: AddPhaseStepComponent;
  let fixture: ComponentFixture<AddPhaseStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhaseStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPhaseStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
