import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: CreateUserInput): Promise<User> {
    return await this.userRepository.create<User>(user);
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id: id } });
  }
}
