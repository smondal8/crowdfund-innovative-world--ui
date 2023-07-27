import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommisiontableComponent } from './commisiontable.component';

describe('CommisiontableComponent', () => {
  let component: CommisiontableComponent;
  let fixture: ComponentFixture<CommisiontableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommisiontableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommisiontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
