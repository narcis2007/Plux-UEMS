import {forwardRef, Module} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {UserResolver} from "./user.resolver";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
