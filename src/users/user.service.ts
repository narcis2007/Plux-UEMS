import {Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import {MongoRepository, Repository} from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private userRepository: MongoRepository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ uid: id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }


  async findOneByUsername(username: string): Promise<User> {
    const users = await this.userRepository.find({ where: { username } });
    return users[0];
  }


  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return await this.userRepository.save({ ...user, uid: uuidv4() });
  }

  async update(uid: string, user: User): Promise<void> {
    const usr = { ...user };
    if(user.password){
      usr.password = await bcrypt.hash(user.password, 10);user.password = await bcrypt.hash(user.password, 10);
    }
    await this.userRepository.updateMany({ uid }, { $set: usr });
  }

  async delete(uid: string): Promise<void> {
    await this.userRepository.deleteMany({ uid });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOneByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
