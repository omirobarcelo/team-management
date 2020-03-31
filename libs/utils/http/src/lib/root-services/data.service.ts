import { Injectable, Inject } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '../environment-config.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl: string;

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
    this.apiUrl = `${config.environment.baseUrl}/${config.environment.apiPath}`;
  }

  getAll<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${path}`);
  }

  add<T>(path: string, obj: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${path}`, obj);
  }
}
