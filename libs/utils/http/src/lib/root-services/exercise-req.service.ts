import { Injectable } from '@angular/core';
import { Exercise } from '@team-management/data/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseReqService {
  constructor(private data: DataService) {}

  getAllExercises(catId?: string): Observable<Exercise[]> {
    return this.data
      .getAll<Exercise[]>(`exercises`)
      .pipe(map(ret => (catId ? ret.filter(ex => ex.category.id === catId) : ret)));
  }
}
