import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    Request,
} from '@nestjs/common';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
export class EventController {
    constructor(private eventService: EventService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createEventDto: CreateEventDto, @Request() req): Promise<Event> {
        return this.eventService.create(createEventDto, req.user.uid);
    }

    @Get()
    async findAll(): Promise<Event[]> {
        return this.eventService.findAll();
    }

    @Get(':uid')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param('uid') uid: string): Promise<Event> {
        return this.eventService.findOne(uid);
    }

    @Put(':uid')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('uid') uid: string, @Body() updateEventDto: UpdateEventDto, @Request() req): Promise<void> {
        return this.eventService.update(uid, updateEventDto, req.user.uid);
    }

    @Delete(':uid')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Param('uid') uid: string, @Request() req): Promise<void> {
        return this.eventService.delete(uid, req.user.uid);
    }
}
