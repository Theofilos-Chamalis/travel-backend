import { Test, TestingModule } from '@nestjs/testing';
import { BookingGqlResolver } from './booking-gql.resolver';
import { BookingGqlService } from './booking-gql.service';

describe('BookingGqlResolver', () => {
  let resolver: BookingGqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingGqlResolver, BookingGqlService],
    }).compile();

    resolver = module.get<BookingGqlResolver>(BookingGqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
