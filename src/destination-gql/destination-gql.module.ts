import { Module } from '@nestjs/common';
import { DestinationGqlResolver } from './destination-gql.resolver';
import { DestinationService } from 'src/destination/destination.service';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  providers: [DestinationGqlResolver, DestinationService, ...drizzleProvider],
})
export class DestinationGqlModule {}
