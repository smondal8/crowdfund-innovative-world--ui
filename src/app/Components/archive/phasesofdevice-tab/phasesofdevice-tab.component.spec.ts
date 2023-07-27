import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesofdeviceTabComponent } from './phasesofdevice-tab.component';

describe('PhasesofdeviceTabComponent', () => {
  let component: PhasesofdeviceTabComponent;
  let fixture: ComponentFixture<PhasesofdeviceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhasesofdeviceTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhasesofdeviceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
