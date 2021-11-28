import { Module } from '@nestjs/common';
import { TiresService } from './tires.service';
import { TiresController } from './tires.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tire } from './tire.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tire, User])],
  providers: [TiresService],
  exports: [TiresService],
  controllers: [TiresController],
})
export class TiresModule { }
