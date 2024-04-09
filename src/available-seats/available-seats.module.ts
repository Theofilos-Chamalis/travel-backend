import { Module } from '@nestjs/common';
import { AvailableSeatsService } from './available-seats.service';
import { AvailableSeatsController } from './available-seats.controller';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  controllers: [AvailableSeatsController],
  providers: [AvailableSeatsService, ...drizzleProvider],
})
export class AvailableSeatsModule {}
