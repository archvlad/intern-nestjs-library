import { IsNumber, IsNumberString } from 'class-validator';

export class AssignBookParams {
  @IsNumberString()
  subscriptionId: number;
}

export class AssignBookDto {
  @IsNumber()
  bookId: number;
}
