import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'show',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  // 공연 이름
  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  // 공연 설명
  @Column({ type: 'varchar', nullable: false })
  description: string;

  // 공연 날짜 및 시간
  @Column({ type: 'text', nullable: false })
  dateAndTime: string;

  // 좌석 정보
  @Column({ type: 'text', nullable: true })
  seatInfo: string;

  // 공연 이미지
  @Column({ type: 'varchar', nullable: false })
  imageUrl: string;

  // 공연 카테고리
  @Column({ type: 'varchar', nullable: false })
  category: string;

  @OneToMany(() => Reservation, reservation => reservation.show)
  reservations: Reservation[];
}