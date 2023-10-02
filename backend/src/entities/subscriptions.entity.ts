import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.subscription, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamptz' })
  startedAt: Date;

  @OneToMany(() => Book, (book) => book.subscription)
  books: Book[];
}
