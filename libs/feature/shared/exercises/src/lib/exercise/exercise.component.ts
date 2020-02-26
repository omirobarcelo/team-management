import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'snk-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  @Input() todos: { title: string }[];

  constructor() { }

  ngOnInit(): void {
  }

}
