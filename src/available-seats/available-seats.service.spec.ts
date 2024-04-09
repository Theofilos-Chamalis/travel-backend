import { Test, TestingModule } from '@nestjs/testing';
import { AvailableSeatsService } from './available-seats.service';

describe('AvailableSeatsService', () => {
  let service: AvailableSeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailableSeatsService],
    }).compile();

    service = module.get<AvailableSeatsService>(AvailableSeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
