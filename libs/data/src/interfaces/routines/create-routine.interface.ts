import { RoutineExercise } from './routine-exercise.interface';

export interface CreateRoutine {
  name: string;
  exercises: RoutineExercise[];
}
