import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('exercise')
export class ExerciseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'datetime'
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime'
  })
  public updatedAt: Date;

  @Column('varchar', { default: 'New Exercise' })
  name: string;

  @Column('simple-array', { default: '[]' })
  muscles: string[];

  @Column('simple-json')
  category: { id: string; name: string };
}
