import { CustomValidationError, DatedEntity } from '@team-management-api/common';
import { RoleType } from '@team-management/data/types';
import * as bCrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, MaxLength, validateSync } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends DatedEntity {
  @Column({ length: 254, unique: true })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  email: string;

  @Column({ length: 128, nullable: false })
  @MaxLength(128)
  password: string;

  @Column({ name: 'password_reset_token', nullable: true })
  passwordResetToken: string;

  @Column({ name: 'first_name', length: 30, default: 'First' })
  @MaxLength(30)
  firstName: string;

  @Column({ name: 'last_name', length: 30, default: 'Last Name' })
  @MaxLength(50)
  lastName: string;

  @Column('varchar', { nullable: false })
  role: RoleType;

  /**
   * Generate a password hash
   * @param password
   */
  static async createPassword(password: string): Promise<string> {
    return bCrypt.hash(password, bCrypt.genSaltSync(8));
  }

  /**
   * Validate password through hash
   * @param password
   */
  async validatePassword(password: string): Promise<boolean> {
    return bCrypt.compare(password, this.password);
  }

  /**
   * Set the users password
   * @param password
   */
  async setPassword(password: string): Promise<UserEntity> {
    if (password) {
      this.password = await UserEntity.createPassword(password);
    }
    return this;
  }

  @BeforeInsert()
  doBeforeInsertion(): void {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }

  @BeforeUpdate()
  doBeforeUpdate(): void {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }
}
