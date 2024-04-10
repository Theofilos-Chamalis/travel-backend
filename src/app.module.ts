import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { DrizzleModule } from './drizzle/drizzle.module';
import { DestinationModule } from './destination/destination.module';
import { BookingModule } from './booking/booking.module';
import { AvailableSeatsModule } from './available-seats/available-seats.module';
import { drizzleProvider } from './drizzle/drizzle.provider';
import { DestinationGqlModule } from './destination-gql/destination-gql.module';
import { BookingGqlModule } from './booking-gql/booking-gql.module';
import { AvailableSeatsGqlModule } from './available-seats-gql/available-seats-gql.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: !getConfig().server.isProduction,
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${getConfig().server.environment}`,
      isGlobal: true,
    }),
    ...(getConfig().server.isProduction
      ? [
          ThrottlerModule.forRoot([
            {
              name: 'default',
              ttl: 60000,
              limit: 120,
            },
          ]),
        ]
      : []),
    DrizzleModule,
    DestinationModule,
    BookingModule,
    AvailableSeatsModule,
    DestinationGqlModule,
    BookingGqlModule,
    AvailableSeatsGqlModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...(getConfig().server.isProduction
      ? [{ provide: APP_GUARD, useClass: ThrottlerGuard }]
      : []),
    ...drizzleProvider,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
