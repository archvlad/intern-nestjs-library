import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  subscriptionId: number;
}
