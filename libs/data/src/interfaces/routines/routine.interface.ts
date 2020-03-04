import { RoutineExercise } from './routine-exercise.interface';

export interface Routine {
  id: string;
  name: string;
  exercises: RoutineExercise[];
}
