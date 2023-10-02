import { IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  userId: number;
}
