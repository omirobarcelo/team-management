import { Injectable } from '@angular/core';
import { ExerciseCategory } from '@team-management/data/interfaces';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseCategoryReqService {
  private _categories: ExerciseCategory[] = [
    {
      id: 'catA',
      name: 'Cat A'
    },
    {
      id: 'catB',
      name: 'Cat B'
    },
    {
      id: 'catC',
      name: 'Cat C'
    }
  ];

  constructor() {}

  getAllCategories(): Observable<ExerciseCategory[]> {
    return timer(750).pipe(mapTo(this._categories));
  }
}
