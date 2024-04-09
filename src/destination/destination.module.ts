import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  controllers: [DestinationController],
  providers: [DestinationService, ...drizzleProvider],
})
export class DestinationModule {}
