import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRoutineExerciseComponent } from './card-routine-exercise.component';

describe('CardRoutineExerciseComponent', () => {
  let component: CardRoutineExerciseComponent;
  let fixture: ComponentFixture<CardRoutineExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardRoutineExerciseComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRoutineExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
