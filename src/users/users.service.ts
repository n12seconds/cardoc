import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async findById(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      id: id,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    const existingUser = await this.usersRepository.findOne({
      id: createUserDto.id,
    });
    if (existingUser) {
      throw new BadRequestException("이미 사용중인 아이디입니다.");
    }
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hash,
    });
    const userPromise = await this.usersRepository.save(user);
    return userPromise.id;
  }

  async findOne(id: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      id: id,
    });
    if (!existingUser) {
      throw new BadRequestException("정보를 찾을 수 없습니다.");
    }
    return existingUser;
  }


}
