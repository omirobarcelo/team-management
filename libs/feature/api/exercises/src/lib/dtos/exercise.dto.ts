import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

class CategoryDto {
  @Expose()
  @Type(() => String)
  @IsOptional()
  id?: string;

  @Expose()
  @Type(() => String)
  name: string;
}

export class ExerciseDto {
  @Expose()
  @Type(() => String)
  @IsOptional()
  id?: string;

  @Expose()
  @Type(() => Date)
  @IsOptional()
  createdAt?: Date;

  @Expose()
  @Type(() => Date)
  @IsOptional()
  updatedAt?: Date;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  @IsOptional()
  slug?: string;

  @Expose()
  @Type(() => String)
  muscles: string[];

  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;
}
