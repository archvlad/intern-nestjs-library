import { IsNumber, IsNumberString } from 'class-validator';

export class RemoveBookParams {
  @IsNumberString()
  subscriptionId: number;
}

export class RemoveBookDto {
  @IsNumber()
  bookId: number;
}
