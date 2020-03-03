import { Exercise } from '../exercises';

export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
}
