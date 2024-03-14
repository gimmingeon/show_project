import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Show } from '../../show/entities/show.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reservations)
  user: User;

  @ManyToOne(() => Show, show => show.reservations)
  show: Show;

  @Column({ type: 'varchar', nullable: false, default : "예약 완료" })
  status: string;
}
