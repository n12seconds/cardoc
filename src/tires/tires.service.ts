import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateTireDto } from './dto/create-tire.dto';
import { Tire } from './tire.entity';
import { User } from 'src/users/user.entity';
import { UserTireInfoDto } from './dto/user-tire-info.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

@Injectable()
export class TiresService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Tire)
    private readonly tiresRepository: Repository<Tire>
  ) { }

  async loadData(trimId: number): Promise<any> {

    const result = await axios
      .get(`https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`)
      .then((data) => data.data)
      .catch((e) => {
        console.log('error', e.message);
      });

    return result;
  }

  async create(userTireInfoDtoList: UserTireInfoDto[]) {

    if (userTireInfoDtoList.length > 5) {
      throw new BadRequestException("한번에 등록 가능한 데이터는 최대 5개입니다.");
    }
    let result: Tire[] = [];

    await Promise.all(
      userTireInfoDtoList.map(async (userTireInfoDto) => {

        const existingUser = await this.usersRepository.findOne({
          id: userTireInfoDto.id,
        });
        if (!existingUser) {
          return false;
        }

        let tireValue = await this.loadData(userTireInfoDto.trimId);
        if (tireValue) {
          tireValue = tireValue.spec.driving.frontTire.value;

          if (tireValue.indexOf("/") > -1 && tireValue.indexOf("R") > -1) {
            let value = tireValue.split(/\/|R/);
            if (value.length === 3 && (/\d+/).test(value[0]) && (/\d+/).test(value[1]) && (/\d+/).test(value[2])) {

              const createTireDto: CreateTireDto = {
                userId: existingUser.id,
                width: value[0],
                flatnessRatio: value[1],
                size: value[2]
              }

              const tirePromise = await this.tiresRepository.save(createTireDto);
              result.push(tirePromise);
            }
          }

        }
      })
    );

    return result;
  }

  async findByUser(id: string): Promise<Tire[]> {
    const existingUser = await this.usersRepository.findOne({
      id: id,
    });
    if (!existingUser) {
      throw new BadRequestException("사용자 정보를 찾을 수 없습니다.");
    }
    const tires = await this.tiresRepository.find({
      userId: id,
    });

    return tires;
  }

  async findOne(id: number): Promise<Tire> {
    const existingTire = await this.tiresRepository.findOne({
      id: id,
    });
    if (!existingTire) {
      throw new BadRequestException("정보를 찾을 수 없습니다.");
    }
    return existingTire;
  }


}
