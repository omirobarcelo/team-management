import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise, Routine } from '@team-management/data/interfaces';
import { RoutineReqService } from '@team-management/utils/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'snk-print-routine',
  templateUrl: './print-routine.component.html',
  styleUrls: ['./print-routine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintRoutineComponent implements OnInit {
  routine$: Observable<Routine>;

  constructor(private _routineReqService: RoutineReqService, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    const routineId = this._route.snapshot.paramMap.get('routineId');
    this.routine$ = this._routineReqService.getRoutine(routineId);
  }

  getImgSrc(exercise: Exercise): string {
    const catLetter = exercise.category.id.slice(-1);
    const exNum = exercise.id.slice(-1);
    return `https://raw.githubusercontent.com/omirobarcelo/team-management/initial-test/assets/ex${catLetter}${exNum}.png`;
  }
}
