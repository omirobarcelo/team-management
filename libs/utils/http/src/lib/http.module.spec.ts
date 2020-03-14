import { async, TestBed } from '@angular/core/testing';
import { HttpModule } from './http.module';

describe('HttpModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HttpModule).toBeDefined();
  });
});
