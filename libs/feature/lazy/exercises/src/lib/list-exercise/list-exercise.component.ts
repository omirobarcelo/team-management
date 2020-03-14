import { Component, OnInit } from '@angular/core';
import { Exercise, ExerciseCategory } from '@team-management/data/interfaces';
import { ExerciseCategoryReqService, ExerciseReqService } from '@team-management/utils/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'snk-list-exercise',
  templateUrl: './list-exercise.component.html',
  styleUrls: ['./list-exercise.component.scss']
})
export class ListExerciseComponent implements OnInit {
  categories$: Observable<ExerciseCategory[]>;
  exercises$: Observable<Exercise[]>;

  constructor(private _exCatReqService: ExerciseCategoryReqService, private _exReqService: ExerciseReqService) {}

  ngOnInit(): void {
    this.categories$ = this._exCatReqService.getAllCategories();
    this.exercises$ = this._exReqService.getAllExercises();
  }

  selectCategory(catId: string): void {
    this.exercises$ = this._exReqService.getAllExercises(catId);
  }

  log(arg: any): void {
    console.log(arg);
  }
}
