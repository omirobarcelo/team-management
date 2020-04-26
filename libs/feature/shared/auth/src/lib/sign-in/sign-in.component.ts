import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@team-management/shared/app-services';
import { AuthService } from '../auth.service';

@Component({
  selector: 'snk-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  get emailControl(): FormControl {
    return this.signInForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  showPassword = false;

  serverErrorMsg: string;

  redirectUrl = '/';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetecor: ChangeDetectorRef,
    private _authService: AuthService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.redirectUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  login(): void {
    this._loadingService.appLoading = true;
    this._authService
      .login(this.emailControl.value, this.passwordControl.value)
      .subscribe(({ successful, errorMsg }) => {
        this._loadingService.appLoading = false;
        if (successful) {
          this.router.navigateByUrl(this.redirectUrl);
        } else {
          this.changeDetecor.markForCheck();
          this.serverErrorMsg = errorMsg;
        }
      });
  }
}
