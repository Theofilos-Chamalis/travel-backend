import { Test, TestingModule } from '@nestjs/testing';
import { DestinationService } from './destination.service';

describe('DestinationService', () => {
  let service: DestinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestinationService],
    }).compile();

    service = module.get<DestinationService>(DestinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
