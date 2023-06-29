import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import {AuthService} from "../auth/auth.service";
import {AuthGuard} from "@nestjs/passport";

import { UserResponseDto } from './user-response.dto';

@Controller('users')
export class UserController {
  constructor(
      private authService: AuthService,
      private userService: UserService,
  ) {}

  @Post('auth/login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Post('auth/register')
  async register(@Body() user: User) {
    const usr = await this.userService.create(user);
    return {
      uid: usr.uid,
      username: usr.username,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req): Promise<UserResponseDto> {
    const user = await this.userService.findOne(req.user.uid);
    return {
      uid: user.uid,
      username: user.username,
      // assign other fields as necessary
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findOne(@Request() req): Promise<UserResponseDto> {
    return this.userService.findOneByUsername(req.user.username).then(user => ({
      uid: user.uid,
      username: user.username,
    }));
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Request() req, @Body() user: User): Promise<void> {
    const uid = req.user.uid;
    return this.userService.update(uid, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  delete(@Request() req): Promise<void> {
    // get the id from the jwt user
    const uid = req.user.uid;
    return this.userService.delete(uid);
  }
}
