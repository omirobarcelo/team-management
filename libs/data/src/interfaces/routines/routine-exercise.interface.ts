import { Exercise } from '../exercises';

export interface RoutineExercise extends Exercise {
  repetitions?: number;
  times?: number;
  weight?: number;
}
