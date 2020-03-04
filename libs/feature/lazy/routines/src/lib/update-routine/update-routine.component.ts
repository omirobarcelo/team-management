import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges } from '@angular/core';
import { Routine, Exercise, RoutineExercise } from '@team-management/data/interfaces';
import { RoutineReqService, ExerciseReqService } from '@team-management/utils/http';

@Component({
  selector: 'snk-update-routine',
  templateUrl: './update-routine.component.html',
  styleUrls: ['./update-routine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateRoutineComponent implements OnInit, OnChanges {
  @Input() routine: Routine;

  name: string;
  routineExercises: RoutineExercise[];

  exercises: Exercise[];
  selectedExercise: Exercise;

  exerciseComparator = (ex1: Exercise, ex2: Exercise) => (ex1 && ex2 ? ex1.id === ex2.id : ex1 === ex2);

  constructor(private _routineReqService: RoutineReqService, private _exReqService: ExerciseReqService) {}

  ngOnInit(): void {
    this.name = this.routine.name;
    this.routineExercises = [...this.routine.exercises];
    this._exReqService.getAllExercises().subscribe(exercises => this.exercises = exercises);
  }

  ngOnChanges(): void {
    this.name = this.routine.name;
    this.routineExercises = [...this.routine.exercises];
  }

  addExercise(ex: Exercise): void {
    if (ex) {
      this.routineExercises.push({ ...ex });
    }
  }

  save(): void {
    this._routineReqService.updateRoutine({ ...this.routine, name: this.name, exercises: this.routineExercises }).subscribe();
  }

  log(arg: any): void {
    console.log(arg);
  }
}
