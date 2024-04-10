import { Module } from '@nestjs/common';
import { AvailableSeatsService } from 'src/available-seats/available-seats.service';
import { AvailableSeatsGqlResolver } from './available-seats-gql.resolver';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  providers: [
    AvailableSeatsGqlResolver,
    AvailableSeatsService,
    ...drizzleProvider,
  ],
})
export class AvailableSeatsGqlModule {}
