import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '../entities/subscriptions.entity';
import { User } from 'src/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Subscription]),
    UsersModule,
    BooksModule,
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
