import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCommissionComponent } from './device-commission.component';

describe('DeviceCommissionComponent', () => {
  let component: DeviceCommissionComponent;
  let fixture: ComponentFixture<DeviceCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCommissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
