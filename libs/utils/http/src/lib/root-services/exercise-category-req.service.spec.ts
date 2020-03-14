import { TestBed } from '@angular/core/testing';

import { ExerciseCategoryReqService } from './exercise-category-req.service';

describe('ExerciseCategoryReqService', () => {
  let service: ExerciseCategoryReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseCategoryReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
