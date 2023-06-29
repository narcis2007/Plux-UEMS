import { PubSub } from 'graphql-subscriptions';
import {Args, Mutation, Query, Resolver, Subscription} from "@nestjs/graphql";
import {User} from "./user.entity";
import {UserService} from "./user.service";
import {CreateUserDTO} from "./user-create.dto";
import {Event} from "../events/event.entity";

const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(returns => [User])
    async users() {
        return this.userService.findAll();
    }

    @Mutation(returns => User)
    async createUser(@Args('input') input: CreateUserDTO) {
        const usr = new User();
        usr.username = input.username;
        usr.password = input.password;

        const user = await this.userService.create(usr);
        pubSub.publish('userCreated', { userCreated: user });
        return user;
    }

    @Subscription(returns => User)
    userCreated() {
        return pubSub.asyncIterator('userCreated');
    }
}
