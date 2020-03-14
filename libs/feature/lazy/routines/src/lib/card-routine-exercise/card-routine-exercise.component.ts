import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RoutineExercise } from '@team-management/data/interfaces';

@Component({
  selector: 'snk-card-routine-exercise',
  templateUrl: './card-routine-exercise.component.html',
  styleUrls: ['./card-routine-exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardRoutineExerciseComponent implements OnInit {
  @Input() exercise: RoutineExercise;

  get imgSrc(): string {
    const catLetter = this.exercise.category.id.slice(-1);
    const exNum = this.exercise.id.slice(-1);
    return `https://raw.githubusercontent.com/omirobarcelo/team-management/initial-test/assets/ex${catLetter}${exNum}.png`;
  }

  constructor() {}

  ngOnInit(): void {}
}
