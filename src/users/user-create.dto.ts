import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CreateUserDTO {
    @Field()
    username: string;
    @Field()
    password: string;
}
