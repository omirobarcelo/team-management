import { Injectable } from '@angular/core';
import { CreateRoutine, Routine } from '@team-management/data/interfaces';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutineReqService {
  private _routines: Routine[] = [];

  constructor() {}

  getAllRoutines(): Observable<Routine[]> {
    return timer(750).pipe(mapTo(this._routines));
  }

  getRoutine(id: string): Observable<Routine> {
    return timer(750).pipe(mapTo(this._routines.find(r => r.id === id)));
  }

  addRoutine(routine: CreateRoutine): Observable<Routine> {
    const newRoutine = { ...routine, id: `r${Math.floor(Math.random() * 100)}` };
    this._routines.push(newRoutine);
    return timer(750).pipe(mapTo(newRoutine));
  }

  updateRoutine(routine: Routine): Observable<Routine> {
    const idx = this._routines.findIndex(r => r.id === routine.id);
    this._routines.splice(idx, 1, routine);
    return timer(750).pipe(mapTo(routine));
  }

  deleteRoutine(id: string): Observable<void> {
    const idx = this._routines.findIndex(r => r.id === id);
    this._routines.splice(idx, 1);
    return timer(750).pipe(mapTo(null));
  }
}
