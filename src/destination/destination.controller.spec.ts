import { Test, TestingModule } from '@nestjs/testing';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';

describe('DestinationController', () => {
  let controller: DestinationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinationController],
      providers: [DestinationService],
    }).compile();

    controller = module.get<DestinationController>(DestinationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
