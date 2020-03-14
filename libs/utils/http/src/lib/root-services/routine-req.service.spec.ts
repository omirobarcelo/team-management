import { TestBed } from '@angular/core/testing';

import { RoutineReqService } from './routine-req.service';

describe('RoutineReqService', () => {
  let service: RoutineReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
