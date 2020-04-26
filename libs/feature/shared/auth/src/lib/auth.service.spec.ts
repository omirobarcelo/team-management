import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthReqService } from '@team-management/utils/http';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

const mockAuthReqService = {
  signIn: jest.fn()
};
const mockRouter = {
  navigate: jest.fn()
};

describe('AuthService', () => {
  let router: Router;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        {
          provide: AuthReqService,
          useValue: mockAuthReqService
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });

  it('should retrieve a saved token', () => {
    service = TestBed.inject(AuthService);
    service.setToken('newToken');
    expect(service.getToken()).toBe('newToken');
  });

  it('should save the token on successful login', async () => {
    mockAuthReqService.signIn.mockReturnValue(of({ successful: true, token: 'newToken' }));
    TestBed.overrideProvider(AuthReqService, { useValue: mockAuthReqService });
    service = TestBed.inject(AuthService);
    const res = await service.login('email', 'password').toPromise();
    expect(service.getToken()).toBe('newToken');
    expect(res.successful).toBeTruthy();
  });

  it('should return an error message on failed login', async () => {
    mockAuthReqService.signIn.mockReturnValue(of({ successful: false, errorMsg: 'ERROR' }));
    TestBed.overrideProvider(AuthReqService, { useValue: mockAuthReqService });
    service = TestBed.inject(AuthService);
    service.clearToken();
    const res = await service.login('email', 'password').toPromise();
    expect(service.getToken()).toBeFalsy();
    expect(res.successful).toBeFalsy();
    expect(res.errorMsg).toBe('ERROR');
  });

  it('should clear the session and go to the sign in page on logout', () => {
    router = TestBed.inject(Router);
    service = TestBed.inject(AuthService);
    service.logout();
    expect(service.getToken()).toBeFalsy();
    expect(router.navigate).toBeCalledWith(['/signin'], { queryParams: { returnUrl: undefined } });
  });

  it('should clear the session and go to the sign in page on logout with a return url', () => {
    router = TestBed.inject(Router);
    service = TestBed.inject(AuthService);
    service.logout('/exercises');
    expect(service.getToken()).toBeFalsy();
    expect(router.navigate).toBeCalledWith(['/signin'], { queryParams: { returnUrl: '/exercises' } });
  });
});
