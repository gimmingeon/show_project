import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationDto } from './dto/reservation.dto';
import { UserService } from '../user/user.service';
import { ShowService } from '../show/show.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly userService: UserService,
    private readonly showService: ShowService,
  ) {}

  async createReservation(userId: number, reservationDto: ReservationDto): Promise<Reservation> {
    const { showId } = reservationDto;

    const show = await this.showService.findOne(showId);
    if (!show) {
      throw new NotFoundException('해당하는 공연을 찾을 수 없습니다.');
    }

    const user = await this.userService.finduser(userId);

    if (user.point < 50000) {
      throw new BadRequestException('포인트가 부족하여 예매할 수 없습니다.');
    }

    const reservation = this.reservationRepository.create({
      user,
      show,
    });

    user.point -= 50000;
    await this.userService.updatePoint(user.id, user.point );

    return this.reservationRepository.save(reservation);
  }
}
