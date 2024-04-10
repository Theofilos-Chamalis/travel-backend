import { Test, TestingModule } from '@nestjs/testing';
import { DestinationGqlResolver } from './destination-gql.resolver';
import { DestinationGqlService } from './destination-gql.service';

describe('DestinationGqlResolver', () => {
  let resolver: DestinationGqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestinationGqlResolver, DestinationGqlService],
    }).compile();

    resolver = module.get<DestinationGqlResolver>(DestinationGqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
