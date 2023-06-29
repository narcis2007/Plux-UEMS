import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { PassportModule } from '@nestjs/passport'
import {AuthModule} from "./auth/auth.module";
import {EventModule} from "./events/event.module";
import { GraphQLModule  } from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PassportModule,
    UserModule,
    AuthModule,
    EventModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/test2',
      synchronize: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      logging: true
    }),
  ],
})
export class AppModule {}
