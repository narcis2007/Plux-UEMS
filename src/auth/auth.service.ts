import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOneByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Please check your login credentials');
    }

    async login(userDto: any) {
        const user = await this.validateUser(userDto.username, userDto.password);
        const payload = { username: user.username, uid: user.uid };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
