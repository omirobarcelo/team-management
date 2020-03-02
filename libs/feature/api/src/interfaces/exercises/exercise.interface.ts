import { ExerciseCategory } from '../exercise-categories';

export interface Exercise {
  id: string;
  name: string;
  muscles: string[];
  category: ExerciseCategory;
}