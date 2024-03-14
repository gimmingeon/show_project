import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReservationDto {
  @IsNumber()
  @IsNotEmpty({ message: '공연 번호를 입력해주세요.' })
  showId: number;
}