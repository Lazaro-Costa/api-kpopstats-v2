import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateIdolDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  korean_name?: string;

  @IsString()
  @IsOptional()
  foreign_name?: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsOptional()
  date_birth?: Date;

  @IsBoolean()
  solist: boolean;

  @IsString()
  @IsOptional()
  more_info?: string;

  @IsNumber()
  companyId: number;

  @IsNumber()
  @IsOptional()
  groupId?: number;

  @IsNumber()
  @IsOptional()
  picsId?: number;
}
