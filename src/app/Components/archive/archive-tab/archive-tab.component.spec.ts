import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveTabComponent } from './archive-tab.component';

describe('ArchiveTabComponent', () => {
  let component: ArchiveTabComponent;
  let fixture: ComponentFixture<ArchiveTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
