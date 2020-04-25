import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '@team-management/shared/app-services';
import { NzProgressModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';

const mockLoadingService = {
  appLoading: false
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NzProgressModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: LoadingService,
          useValue: mockLoadingService
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Gymnastika'`, () => {
    expect(component.title).toEqual('Gymnastika');
  });

  it('should not show loading by default' ,() => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('nz-progress')).toBeFalsy();
  });

  it('should show loading when app loading is true' ,() => {
    component.loadingService.appLoading = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('nz-progress')).toBeTruthy();
  });
});
