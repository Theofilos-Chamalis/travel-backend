import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AvailableSeatsService } from './available-seats.service';
import { AvailableSeatsDto } from './dto/available-seats.dto';

@Controller('available-seats')
export class AvailableSeatsController {
  constructor(private readonly availableSeatsService: AvailableSeatsService) {}

  @Post()
  create(@Body() createAvailableSeatDto: AvailableSeatsDto) {
    return this.availableSeatsService.create(createAvailableSeatDto);
  }

  @Get()
  findAll() {
    return this.availableSeatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availableSeatsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAvailableSeats: AvailableSeatsDto,
  ) {
    return this.availableSeatsService.update(id, updateAvailableSeats);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availableSeatsService.remove(id);
  }
}
