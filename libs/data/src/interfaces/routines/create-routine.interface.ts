import { Exercise } from '../exercises';

export interface CreateRoutine {
  name: string;
  exercises: Exercise[];
}
