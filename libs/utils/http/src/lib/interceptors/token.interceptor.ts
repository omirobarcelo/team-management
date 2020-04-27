import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@team-management/shared/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly _authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Accept: 'application/json',
        Authorization: `${this._authService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
