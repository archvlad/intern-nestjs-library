import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Subscription } from './entities/subscriptions.entity';
import { Book } from './entities/book.entity';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Subscription, Book],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    SubscriptionsModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
