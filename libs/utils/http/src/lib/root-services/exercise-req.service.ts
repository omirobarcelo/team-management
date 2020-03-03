import { Injectable } from '@angular/core';
import { Exercise } from '@team-management/data/interfaces';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseReqService {
  private _exercises: Exercise[] = [
    {
      id: 'ex1',
      name: 'Ex 1',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catA',
        name: 'Cat A'
      }
    },
    {
      id: 'ex2',
      name: 'Ex 2',
      muscles: ['m1', 'm2', 'm3'],
      category: {
        id: 'catA',
        name: 'Cat A'
      }
    },
    {
      id: 'ex3',
      name: 'Ex 3',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catA',
        name: 'Cat A'
      }
    },
    {
      id: 'ex1',
      name: 'Ex 1',
      muscles: ['m1'],
      category: {
        id: 'catB',
        name: 'Cat B'
      }
    },
    {
      id: 'ex2',
      name: 'Ex 2',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catB',
        name: 'Cat B'
      }
    },
    {
      id: 'ex3',
      name: 'Ex 3',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catB',
        name: 'Cat B'
      }
    },
    {
      id: 'ex1',
      name: 'Ex 1',
      muscles: ['m1', 'm2', 'm3'],
      category: {
        id: 'catC',
        name: 'Cat C'
      }
    },
    {
      id: 'ex2',
      name: 'Ex 2',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catC',
        name: 'Cat C'
      }
    },
    {
      id: 'ex3',
      name: 'Ex 3',
      muscles: ['m1'],
      category: {
        id: 'catC',
        name: 'Cat C'
      }
    }
  ];

  constructor() {}

  getAllExercises(catId?: string): Observable<Exercise[]> {
    const exercises = catId ? this._exercises.filter(ex => ex.category.id === catId) : this._exercises;
    return timer(750).pipe(mapTo(exercises));
  }
}
