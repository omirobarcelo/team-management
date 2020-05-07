import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class TokenDto {
  @Expose()
  @Type(() => Boolean)
  successful: boolean;

  @Expose()
  @Type(() => String)
  @IsOptional()
  token?: string;

  @Expose()
  @Type(() => String)
  @IsOptional()
  errorMsg?: string;
}
