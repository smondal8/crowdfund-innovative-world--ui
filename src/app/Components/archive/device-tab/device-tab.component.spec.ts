import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTabComponent } from './device-tab.component';

describe('DeviceTabComponent', () => {
  let component: DeviceTabComponent;
  let fixture: ComponentFixture<DeviceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
