import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class SignInDto {
  @Type(() => String)
  @MaxLength(254)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Type(() => String)
  @MaxLength(128)
  @IsNotEmpty()
  password: string;
}
