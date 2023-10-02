import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: number) {
    const book = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.subscription', 'subscription')
      .where('book.id = :id', { id })
      .getOne();

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  createBook(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }
}
