import { Component, OnInit } from '@angular/core';
import { Routine } from '@team-management/data/interfaces';
import { RoutineReqService } from '@team-management/utils/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'snk-list-routine',
  templateUrl: './list-routine.component.html',
  styleUrls: ['./list-routine.component.scss']
})
export class ListRoutineComponent implements OnInit {
  routines$: Observable<Routine[]>;

  selectedRoutine: Routine;

  constructor(private _routineReqService: RoutineReqService) {}

  ngOnInit(): void {
    this.routines$ = this._routineReqService.getAllRoutines();
  }

  newRoutine(): void {
    this._routineReqService
      .addRoutine({ name: 'New routine', exercises: [] })
      .subscribe(routine => {
        this.routines$ = this._routineReqService.getAllRoutines();
        this.selectedRoutine = routine;
      });
  }

  log(arg: any): void {
    console.log(arg);
  }
}
