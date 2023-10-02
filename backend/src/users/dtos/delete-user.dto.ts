import { IsNumberString } from 'class-validator';

export class DeleteUserParams {
  @IsNumberString()
  id: number;
}
