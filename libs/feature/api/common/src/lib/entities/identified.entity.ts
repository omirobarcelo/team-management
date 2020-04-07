import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Base entity with a uuid as a primary key
 */
export class IdentifiedEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
