import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';
import { AssignBookDto, AssignBookParams } from './dtos/assign-book.dto';
import { FindOneParams } from './dtos/find-one.dto';
import { RemoveBookDto, RemoveBookParams } from './dtos/remove-book.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOperation({ summary: 'Return all subscriptions' })
  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @ApiOperation({ summary: 'Return subscription by ID' })
  @Get(':subscriptionId')
  findOne(@Param() params: FindOneParams) {
    return this.subscriptionsService.findOne(params.subscriptionId);
  }

  @ApiOperation({ summary: 'Create subscription' })
  @Post()
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.createSubscription(
      createSubscriptionDto.userId,
    );
  }

  @ApiOperation({ summary: 'Assign book to subscription' })
  @Post(':subscriptionId/assignBook')
  assignBook(
    @Param() params: AssignBookParams,
    @Body() assignBookDto: AssignBookDto,
  ) {
    const { subscriptionId } = params;
    const { bookId } = assignBookDto;
    return this.subscriptionsService.assignBook(subscriptionId, bookId);
  }

  @ApiOperation({ summary: 'Remove book from subscription' })
  @Delete(':subscriptionId/removeBook')
  removeBook(
    @Param() params: RemoveBookParams,
    @Body() assignBookDto: RemoveBookDto,
  ) {
    const { subscriptionId } = params;
    const { bookId } = assignBookDto;
    return this.subscriptionsService.removeBook(subscriptionId, bookId);
  }
}
