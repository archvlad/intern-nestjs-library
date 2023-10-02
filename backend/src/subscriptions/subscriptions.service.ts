import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import { Subscription } from 'src/entities/subscriptions.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) {}

  async findOne(id: number) {
    const subscription = await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.user', 'user')
      .leftJoinAndSelect('subscription.books', 'books')
      .where('subscription.id = :id', { id })
      .getOne();

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return subscription;
  }

  // Оформляет пользователю абонемент
  async createSubscription(userId: number) {
    // Находим пользователя по userId
    const user = await this.usersService.findOne(userId);

    // Если у пользователя уже есть абонемет, выкидываем ошибку
    if (user.hasSubscription)
      throw new BadRequestException(
        `User with ID ${userId} already has a subscription`,
      );

    // Иначе создаем абонемент и присваиваем его пользователю
    const subscription = new Subscription();
    subscription.user = user;
    subscription.startedAt = new Date();

    // Сохраняем абонемет в БД
    await this.subscriptionRepository.save(subscription);

    // Обновляем пользователя, указывая, что у него есть абонемент
    await this.usersService.updateUser(userId, { hasSubscription: true });

    // Возвращаем только что созданный абонемент
    return this.findOne(subscription.id);
  }

  // Записывает книгу на абонемент
  async assignBook(subscriptionId: number, bookId: number) {
    // Получаем абонемент и книгу по их ID
    const subscription = await this.findOne(subscriptionId);
    const book = await this.booksService.findOne(bookId);

    // Если книга уже записана на абонемент, то кидаем ошибку
    if (book.subscription?.id == subscriptionId)
      throw new BadRequestException(
        `Book with ID ${bookId} already assigned to subscription with ID ${subscriptionId}`,
      );

    // Если книга записана на другой абонемент, то кидаем ошибку
    if (book.subscription && book.subscription.id != subscriptionId)
      throw new BadRequestException(
        `Cant't assign book with ID ${bookId} as it assigned to another subscription with ID ${book.subscription.id}`,
      );

    // Если на абонемент записано 5 книгу, то кидаем ошибку
    if (subscription.books?.length == 5)
      throw new BadRequestException(
        `Can't assign more than 5 books to a subscription`,
      );

    // Записываем книгу на абонемент
    if (subscription.books) subscription.books.push(book);
    else subscription.books = [book];

    // Поскольку абонемент был изменен, сохраняем его в БД
    await this.subscriptionRepository.save(subscription);

    // Возвращаем сообщение об успешной записи
    return {
      message: `Book with ID ${bookId} assigned to subscription with ID ${subscriptionId}`,
    };
  }

  // Отвязывает книгу от абонемента
  async removeBook(subscriptionId: number, bookId: number) {
    // Получаем абонемент по ID
    const subscription = await this.findOne(subscriptionId);

    // Смотрим, записана ли книга на абонемент
    const book = subscription.books?.find((b) => b.id == bookId);

    // Если не записана, то кидаем ошибку
    if (!book)
      throw new BadRequestException(
        `Book with ID ${bookId} isn't assigned to a subscription with ID ${subscriptionId}`,
      );

    // Иначе, отвязываем книгу от абонемента
    subscription.books = subscription.books.filter((b) => b.id != bookId);

    // Поскольку абонемент был изменен, сохраняем его в БД
    await this.subscriptionRepository.save(subscription);

    // Возвращаем сообщение об успешной отвязки
    return {
      message: `Book with ID ${bookId} removed from subscription with ID ${subscriptionId}`,
    };
  }

  findAll() {
    return this.subscriptionRepository
      .createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.user', 'user')
      .leftJoinAndSelect('subscription.books', 'books')
      .getMany();
  }
}
