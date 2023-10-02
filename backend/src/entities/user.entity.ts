import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Subscription } from './subscriptions.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ default: false })
  hasSubscription: boolean;

  @OneToOne(() => Subscription, (subscription) => subscription.user)
  subscription: Subscription;
}
