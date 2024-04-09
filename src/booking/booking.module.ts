import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  controllers: [BookingController],
  providers: [BookingService, ...drizzleProvider],
})
export class BookingModule {}
