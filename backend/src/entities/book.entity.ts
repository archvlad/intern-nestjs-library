import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subscription } from './subscriptions.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @ManyToOne(() => Subscription, (subscription) => subscription.books, {
    onDelete: 'SET NULL',
  })
  subscription: Subscription;
}
