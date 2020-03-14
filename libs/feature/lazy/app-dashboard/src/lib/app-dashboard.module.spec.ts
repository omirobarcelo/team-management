import { async, TestBed } from '@angular/core/testing';
import { AppDashboardModule } from './app-dashboard.module';

describe('AppDashboardModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppDashboardModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AppDashboardModule).toBeDefined();
  });
});
