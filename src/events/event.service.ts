import {Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {MongoRepository, Repository} from 'typeorm';
import { Event } from './event.entity';
import { User } from '../users/user.entity';
import { CreateEventDto, UpdateEventDto } from './dto';
import {ObjectId} from "mongodb";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: MongoRepository<Event>,
        @InjectRepository(User)
        private userRepository: MongoRepository<User>,
    ) {}

    async create(createEventDto: CreateEventDto, userUid: string): Promise<Event> {
        const user = await this.userRepository.findOneBy({ uid: userUid });

        const event = new Event();
        event.name = createEventDto.name;
        event.description = createEventDto.description;
        event.location = createEventDto.location;
        event.owner = userUid;
        event.uid=uuidv4();

        return this.eventRepository.save(event);
    }

    async findAll(): Promise<Event[]> {
        return this.eventRepository.find();
    }

    async findOne(uid: string): Promise<Event> {
        return this.eventRepository.findOneBy({ uid});
    }

    async update(uid: string, updateEventDto: UpdateEventDto, useruId: string): Promise<void> {
        const event = await this.eventRepository.find({ uid })
        // Validate if user is the owner of the event
        if(event[0].owner !== useruId) {
            throw new UnauthorizedException();
        }

        await this.eventRepository.updateMany({ uid }, { $set: updateEventDto });
    }

    async delete(uid: string, userId: string): Promise<void> {
        const event = await this.eventRepository.findOneBy({ uid });

        // Validate if user is the owner of the event
        if(event.owner !== userId) {
            throw new UnauthorizedException();
        }

        await this.eventRepository.deleteMany({ uid });
    }
}
