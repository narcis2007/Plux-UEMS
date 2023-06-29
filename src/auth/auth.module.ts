import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import {UserModule} from "../users/user.module";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'SECRET',
            signOptions: { expiresIn: '36000s' },
        }),
        forwardRef(() => UserModule),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
