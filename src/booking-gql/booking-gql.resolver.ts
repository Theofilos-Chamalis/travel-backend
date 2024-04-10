import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookingService } from '../booking/booking.service';
import { BookingGQLDto, BookingGQLInputDto } from './dto/booking.dto';

@Resolver(() => BookingGQLDto)
export class BookingGqlResolver {
  constructor(private readonly bookingGqlService: BookingService) {}

  @Mutation(() => [BookingGQLDto], { name: 'bookingCreate' })
  createBookingGql(
    @Args('BookingGQLInputDto') createBookingGqlInput: BookingGQLInputDto,
  ) {
    return this.bookingGqlService.create(createBookingGqlInput);
  }

  @Query(() => [BookingGQLDto], { name: 'bookingGetAll' })
  findAll() {
    return this.bookingGqlService.findAll();
  }

  @Query(() => [BookingGQLDto], { name: 'bookingGetById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.bookingGqlService.findOne(id);
  }

  @Mutation(() => [BookingGQLDto], { name: 'bookingConfirm' })
  confirmBookingGql(@Args('id', { type: () => String }) id: string) {
    return this.bookingGqlService.confirmOne(id);
  }

  @Mutation(() => [BookingGQLDto], { name: 'bookingDelete' })
  removeBookingGql(@Args('id', { type: () => String }) id: string) {
    return this.bookingGqlService.remove(id);
  }
}
