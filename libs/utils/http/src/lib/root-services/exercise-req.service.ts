import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '@team-management/data/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseReqService {
  constructor(private http: HttpClient) {}

  getAllExercises(catId?: string): Observable<Exercise[]> {
    return this.http
      .get<any[]>(`api/exercises`)
      .pipe(map(ret => (catId ? ret.filter(ex => ex.category.id === catId) : ret)));
  }
}
