import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsBoolean()
  @IsOptional()
  hasSubscription: boolean;
}
