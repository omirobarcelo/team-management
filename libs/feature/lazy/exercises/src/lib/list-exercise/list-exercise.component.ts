import { Component, OnInit } from '@angular/core';
import { ExerciseCategoryReqService } from '@team-management/utils/http';
import { Observable } from 'rxjs';
import { ExerciseCategory } from '@team-management/data/interfaces';

@Component({
  selector: 'snk-list-exercise',
  templateUrl: './list-exercise.component.html',
  styleUrls: ['./list-exercise.component.scss']
})
export class ListExerciseComponent implements OnInit {
  categories$: Observable<ExerciseCategory[]>;

  constructor(private _exCatReqService: ExerciseCategoryReqService) {}

  ngOnInit(): void {
    this.categories$ = this._exCatReqService.getAllCategories();
  }

  log(arg: any): void {
    console.log(arg);
  }
}
