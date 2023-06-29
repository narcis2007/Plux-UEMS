import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    location: string;
}

export class UpdateEventDto {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsString()
    location?: string;
}
