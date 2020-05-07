import { Injectable } from '@angular/core';
import { Token } from '@team-management/data/interfaces';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthReqService {
  constructor(private data: DataService) {}

  /**
   * Sign in, returns JWT on success, error message on fail
   * @param email
   * @param password
   */
  signIn(email: string, password: string): Observable<Token> {
    return this.data.add<Token>(`auth/sign-in`, { email, password });
  }
}
