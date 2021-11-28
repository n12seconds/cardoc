import {
  Body,
  Controller,
  Get,
  Request,
  Param,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TiresService } from './tires.service';
import { UserTireInfoDto } from './dto/user-tire-info.dto';
import { Tire } from './tire.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('tires')
@Controller('tires')
export class TiresController {
  constructor(private readonly tiresService: TiresService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() UserTireInfoDtoList: UserTireInfoDto[]) {
    return this.tiresService.create(UserTireInfoDtoList);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findByUser(@Query('id') id: string): Promise<Tire[]> {
    return this.tiresService.findByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tire> {
    return this.tiresService.findOne(id);
  }

}
