import { async, TestBed } from '@angular/core/testing';
import { AppServicesModule } from './app-services.module';

describe('AppServicesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppServicesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AppServicesModule).toBeDefined();
  });
});
