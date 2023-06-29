import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, ObjectId, ObjectIdColumn, PrimaryColumn} from "typeorm";
import {User} from "../users/user.entity";

@Entity()
export class Event {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    uid: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column()
    owner: string;

    @Column()
    users: string[];
}
