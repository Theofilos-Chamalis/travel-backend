import { Test, TestingModule } from '@nestjs/testing';
import { AvailableSeatsGqlResolver } from './available-seats-gql.resolver';
import { AvailableSeatsGqlService } from './available-seats-gql.service';

describe('AvailableSeatsGqlResolver', () => {
  let resolver: AvailableSeatsGqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailableSeatsGqlResolver, AvailableSeatsGqlService],
    }).compile();

    resolver = module.get<AvailableSeatsGqlResolver>(AvailableSeatsGqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
