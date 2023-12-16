import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: CreateUserDto['username'];

  @IsString()
  @IsNotEmpty()
  password: CreateUserDto['password'];
}
