import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Subscription } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.subscription', 'subscription')
      .leftJoinAndSelect('subscription.books', 'books')
      .getMany();
  }

  async findOne(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.subscription', 'subscription')
      .leftJoinAndSelect('subscription.books', 'books')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async deleteUser(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: `User with ID ${id} deleted` };
  }
}
