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

  constructor() {}

  ngOnInit(): void {}
}
