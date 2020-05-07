import { async, TestBed } from '@angular/core/testing';
import { HttpModule } from './http.module';
import { ENV_CONFIG } from './environment-config.interface';

const environment = {
  baseUrl: 'http://localhost:3000',
  apiPath: 'api'
};

describe('HttpModule.forRoot', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule.forRoot({ environment })]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HttpModule).toBeDefined();
  });

  it('should provide an environment configuration', () => {
    const envConfig = TestBed.inject(ENV_CONFIG);
    expect(envConfig).toEqual({ environment });
  });
});
