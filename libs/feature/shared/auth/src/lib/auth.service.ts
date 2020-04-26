import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthReqService } from '@team-management/utils/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private _authReqService: AuthReqService) {}

  /**
   * Saves the token
   * @param token
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Returns the saved token
   */
  getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * Removes the saved token
   */
  clearToken(): void {
    localStorage.removeItem('token');
  }

  /**
   * Returns if the user is authenticated (there is a token and it is not expired)
   */
  userIsAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      return jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  /**
   * Sends login form to server
   * If request is successful, saves the token
   * Returns if request is successful and any error message
   * @param email
   * @param password
   */
  login(email: string, password: string): Observable<{ successful: boolean; errorMsg?: string }> {
    return this._authReqService.signIn(email, password).pipe(
      map(res => {
        if (res.successful) {
          this.setToken(res.token);
        }
        return { successful: res.successful, errorMsg: res.errorMsg };
      })
    );
  }

  /**
   * Clears the sessions and redirects to sign in page
   * @param returnUrl redirection route after new login
   */
  logout(returnUrl?: string): void {
    this.clearToken();
    this.router.navigate(['/signin'], { queryParams: { returnUrl } });
  }
}
