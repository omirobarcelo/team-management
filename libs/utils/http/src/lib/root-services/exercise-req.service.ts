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
      id: 'exA1',
      name: 'Ex A1',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catA',
        name: 'Cat A'
      }
    },
    {
      id: 'exA2',
      name: 'Ex A2',
      muscles: ['m1', 'm2', 'm3'],
      category: {
        id: 'catA',
        name: 'Cat A'
      }
    },
    {
      id: 'exA3',
      name: 'Ex A3',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catA',
        name: 'Cat A'
      }
    },
    {
      id: 'exB1',
      name: 'Ex B1',
      muscles: ['m1'],
      category: {
        id: 'catB',
        name: 'Cat B'
      }
    },
    {
      id: 'exB2',
      name: 'Ex B2',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catB',
        name: 'Cat B'
      }
    },
    {
      id: 'exB3',
      name: 'Ex B3',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catB',
        name: 'Cat B'
      }
    },
    {
      id: 'exC1',
      name: 'Ex C1',
      muscles: ['m1', 'm2', 'm3'],
      category: {
        id: 'catC',
        name: 'Cat C'
      }
    },
    {
      id: 'exC2',
      name: 'Ex C2',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catC',
        name: 'Cat C'
      }
    },
    {
      id: 'exC3',
      name: 'Ex C3',
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
