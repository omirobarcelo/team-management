import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IdentifiedEntity } from './identified.entity';

/**
 * Identified entity with creation and update fields
 */
export class DatedEntity extends IdentifiedEntity {
  @CreateDateColumn({
    type: 'datetime'
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime'
  })
  public updatedAt: Date;
}
