import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AvailableSeatsService } from '../available-seats/available-seats.service';
import {
  AvailableSeatsGQLDto,
  AvailableSeatsGQLInputDto,
} from './dto/available-seats.dto';

@Resolver(() => AvailableSeatsGQLDto)
export class AvailableSeatsGqlResolver {
  constructor(
    private readonly availableSeatsGqlService: AvailableSeatsService,
  ) {}

  @Mutation(() => [AvailableSeatsGQLDto], { name: 'availableSeatsCreate' })
  createAvailableSeatsGql(
    @Args('AvailableSeatsGQLInputDto')
    createAvailableSeatsGqlInput: AvailableSeatsGQLInputDto,
  ) {
    return this.availableSeatsGqlService.create(createAvailableSeatsGqlInput);
  }

  @Query(() => [AvailableSeatsGQLDto], { name: 'availableSeatsGetAll' })
  findAll() {
    return this.availableSeatsGqlService.findAll();
  }

  @Query(() => [AvailableSeatsGQLDto], { name: 'availableSeatsGetById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.availableSeatsGqlService.findOne(id);
  }

  @Mutation(() => [AvailableSeatsGQLDto], { name: 'availableSeatsUpdate' })
  updateAvailableSeatsGql(
    @Args('AvailableSeatsGQLInputDto')
    updateAvailableSeatsGqlInput: AvailableSeatsGQLInputDto,
  ) {
    return this.availableSeatsGqlService.update(
      updateAvailableSeatsGqlInput.id,
      updateAvailableSeatsGqlInput,
    );
  }

  @Mutation(() => [AvailableSeatsGQLDto], { name: 'availableSeatsDelete' })
  removeAvailableSeatsGql(@Args('id', { type: () => String }) id: string) {
    return this.availableSeatsGqlService.remove(id);
  }
}
