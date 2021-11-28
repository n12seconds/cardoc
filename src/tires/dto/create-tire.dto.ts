import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTireDto {

  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  width: number;

  @IsNotEmpty()
  @ApiProperty()
  flatnessRatio: number;

  @IsNotEmpty()
  @ApiProperty()
  size: number;

}
