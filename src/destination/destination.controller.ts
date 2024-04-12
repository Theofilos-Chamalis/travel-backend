import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationDto } from './dto/destination.dto';

@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  create(@Body() createDestination: DestinationDto) {
    return this.destinationService.create(createDestination);
  }

  @Get()
  findAll() {
    return this.destinationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') idOrSlug: string) {
    return this.destinationService.findOne(idOrSlug);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.destinationService.remove(id);
  }
}
