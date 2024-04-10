import { Module } from '@nestjs/common';
import { BookingService } from 'src/booking/booking.service';
import { BookingGqlResolver } from './booking-gql.resolver';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  providers: [BookingGqlResolver, BookingService, ...drizzleProvider],
})
export class BookingGqlModule {}
