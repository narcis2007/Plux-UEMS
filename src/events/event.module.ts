// event.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Event } from './event.entity';
import {UserModule} from "../users/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Event]), UserModule],
    providers: [EventService],
    controllers: [EventController],
    exports: [EventService],
})
export class EventModule {}
