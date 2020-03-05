import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRoutineComponent } from './print-routine.component';

describe('PrintRoutineComponent', () => {
  let component: PrintRoutineComponent;
  let fixture: ComponentFixture<PrintRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintRoutineComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
