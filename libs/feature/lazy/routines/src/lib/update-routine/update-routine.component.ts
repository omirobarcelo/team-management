import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Routine } from '@team-management/data/interfaces';

@Component({
  selector: 'snk-update-routine',
  templateUrl: './update-routine.component.html',
  styleUrls: ['./update-routine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateRoutineComponent implements OnInit {
  @Input() routine: Routine;

  constructor() {}

  ngOnInit(): void {}
}
