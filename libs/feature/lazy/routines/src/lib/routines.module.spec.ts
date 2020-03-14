import { async, TestBed } from '@angular/core/testing';
import { RoutinesModule } from './routines.module';

describe('RoutinesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RoutinesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RoutinesModule).toBeDefined();
  });
});
