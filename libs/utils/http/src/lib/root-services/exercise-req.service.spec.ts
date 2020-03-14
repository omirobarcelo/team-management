import { TestBed } from '@angular/core/testing';

import { ExerciseReqService } from './exercise-req.service';

describe('ExerciseReqService', () => {
  let service: ExerciseReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
