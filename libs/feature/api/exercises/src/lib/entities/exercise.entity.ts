import { DatedEntity } from '@team-management/api/common';
import { Column, Entity } from 'typeorm';

@Entity('exercise')
export class ExerciseEntity extends DatedEntity {
  @Column('varchar', { default: 'New Exercise' })
  name: string;

  @Column('varchar', { nullable: true })
  slug: string;

  @Column('simple-array', { default: '[]' })
  muscles: string[];

  @Column('simple-json')
  category: { id: string; name: string };
}
