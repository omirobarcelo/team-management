import { async, TestBed } from '@angular/core/testing';
import { ExercisesModule } from './exercises.module';

describe('ExercisesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExercisesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExercisesModule).toBeDefined();
  });
});
