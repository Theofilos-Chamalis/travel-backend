import { Test, TestingModule } from '@nestjs/testing';
import { AvailableSeatsController } from './available-seats.controller';
import { AvailableSeatsService } from './available-seats.service';

describe('AvailableSeatsController', () => {
  let controller: AvailableSeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailableSeatsController],
      providers: [AvailableSeatsService],
    }).compile();

    controller = module.get<AvailableSeatsController>(AvailableSeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
