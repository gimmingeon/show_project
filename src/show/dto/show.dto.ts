import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class ShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연에 대한 소개를 입력해주세요.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  dateAndTime: string;
  
  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  place: string;
  
  @IsString()
  @IsNotEmpty({ message: '공연 이미지 주소를 입력해주세요.' })
  imageUrl: string;
  
  @IsString()
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  category: string;

}