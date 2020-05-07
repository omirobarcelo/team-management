import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '@team-management/shared/app-services';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { SignInComponent } from './sign-in.component';

let mockRouter;
let mockRoute;
let mockAuthService;
let mockLoadingService;

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(() => {
    mockRouter = {
      navigateByUrl: jest.fn()
    };
    mockRoute = {
      snapshot: {
        queryParamMap: new Map([['returnUrl', '/exercises']])
      }
    };
    mockAuthService = {
      login: jest.fn()
    };
    mockLoadingService = {
      appLoading: false
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NzAlertModule,
        NzButtonModule,
        NzFormModule,
        NzInputModule,
        NzIconModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [SignInComponent],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: mockRoute
        },
        {
          provide: AuthService,
          useValue: mockAuthService
        },
        {
          provide: LoadingService,
          useValue: mockLoadingService
        }
      ]
    });
  });

  it('should create', async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  }));

  it('should have default redirect url', async(() => {
    mockRoute.snapshot.queryParamMap = new Map([]);
    TestBed.overrideProvider(ActivatedRoute, { useValue: mockRoute });
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component.redirectUrl).toBe('/');
    });
  }));

  it('should disable login button on init', async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
      expect(submitBtn.nativeElement.disabled).toBeTruthy();
    });
  }));

  it('should enable login button when form is valid', async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.signInForm.setValue({
        email: 'admin@gym.fit',
        password: 'test'
      });
      fixture.detectChanges();
      const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
      expect(submitBtn.nativeElement.disabled).toBeFalsy();
    });
  }));

  it('should show error message on failed login', fakeAsync(() => {
    mockAuthService.login.mockReturnValue(of({ successful: false, errorMsg: 'ERROR' }));
    TestBed.overrideProvider(AuthService, { useValue: mockAuthService });
    TestBed.compileComponents().then(() => {
      const authService = TestBed.inject(AuthService);
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const loginSpy = jest.spyOn(component, 'login');
      let alert = fixture.debugElement.query(By.css('nz-alert'));
      expect(alert).toBeFalsy();
      component.signInForm.setValue({
        email: 'admin@gym.fit',
        password: 'test'
      });
      fixture.detectChanges();
      const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
      submitBtn.nativeElement.click();
      flush();
      fixture.detectChanges();
      expect(loginSpy).toBeCalled();
      expect(authService.login).toBeCalledWith('admin@gym.fit', 'test');
      alert = fixture.debugElement.query(By.css('nz-alert'));
      expect(alert).toBeTruthy();
      expect(alert.nativeElement.getAttribute('ng-reflect-nz-message')).toBe('ERROR');
    });
  }));

  it('should go to redirect url on successful login', fakeAsync(() => {
    mockAuthService.login.mockReturnValue(of({ successful: true }));
    TestBed.overrideProvider(AuthService, { useValue: mockAuthService });
    TestBed.compileComponents().then(() => {
      const authService = TestBed.inject(AuthService);
      const router = TestBed.inject(Router);
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const loginSpy = jest.spyOn(component, 'login');
      component.signInForm.setValue({
        email: 'admin@gym.fit',
        password: 'test'
      });
      fixture.detectChanges();
      const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
      submitBtn.nativeElement.click();
      flush();
      fixture.detectChanges();
      expect(loginSpy).toBeCalled();
      expect(authService.login).toBeCalledWith('admin@gym.fit', 'test');
      expect(router.navigateByUrl).toBeCalledWith('/exercises');
    });
  }));
});
