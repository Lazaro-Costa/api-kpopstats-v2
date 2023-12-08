import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  urls_profile?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  urls_banner?: string[];
}
