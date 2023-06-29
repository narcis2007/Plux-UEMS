import {
    Entity,
    ObjectId,
    ObjectIdColumn,
    Column,
    OneToMany,
    Index,
    ManyToMany,
    JoinTable,
    Unique,
    PrimaryColumn
} from 'typeorm';
import { Event } from '../events/event.entity';
import {Field, InputType, ObjectType} from '@nestjs/graphql';

@ObjectType()
@Entity()
@Unique(["username"])
export class User {
    @ObjectIdColumn()
    _id: string;
    @Field()
    @PrimaryColumn()
    uid: string;
    @Field()
    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    events: string[];
}
