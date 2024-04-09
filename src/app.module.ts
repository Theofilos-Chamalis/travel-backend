import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfiguration } from './utils/configuration';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { DrizzleModule } from './drizzle/drizzle.module';
import { DestinationModule } from './destination/destination.module';
import { BookingModule } from './booking/booking.module';
import { AvailableSeatsModule } from './available-seats/available-seats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${getConfiguration().server.environment}`,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 120,
      },
    ]),
    DrizzleModule,
    DestinationModule,
    BookingModule,
    AvailableSeatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
