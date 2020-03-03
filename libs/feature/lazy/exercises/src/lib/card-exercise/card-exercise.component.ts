import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Exercise } from '@team-management/data/interfaces';

@Component({
  selector: 'snk-card-exercise',
  templateUrl: './card-exercise.component.html',
  styleUrls: ['./card-exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardExerciseComponent implements OnInit {
  @Input() exercise: Exercise;

  get imgSrc(): string {
    const catLetter = this.exercise.category.id.slice(-1);
    const exNum = this.exercise.id.slice(-1);
    return `https://raw.githubusercontent.com/omirobarcelo/team-management/initial-test/assets/ex${catLetter}${exNum}.png`;
  }

  constructor() {}

  ngOnInit(): void {}
}
