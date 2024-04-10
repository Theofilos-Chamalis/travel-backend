import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DestinationService } from '../destination/destination.service';
import {
  DestinationGQLInputDto,
  DestinationGQLDto,
} from './dto/destination.dto';

@Resolver(() => DestinationGQLDto)
export class DestinationGqlResolver {
  constructor(private readonly destinationGqlService: DestinationService) {}

  @Mutation(() => [DestinationGQLDto], { name: 'destinationCreate' })
  createDestinationGql(
    @Args('DestinationGQLInputDto')
    createDestinationGqlInput: DestinationGQLInputDto,
  ) {
    return this.destinationGqlService.create(createDestinationGqlInput);
  }

  @Query(() => [DestinationGQLDto], { name: 'destinationGetAll' })
  findAll() {
    return this.destinationGqlService.findAll();
  }

  @Query(() => [DestinationGQLDto], { name: 'destinationGetById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.destinationGqlService.findOne(id);
  }

  @Mutation(() => [DestinationGQLDto], { name: 'destinationDelete' })
  removeDestinationGql(@Args('id', { type: () => String }) id: string) {
    return this.destinationGqlService.remove(id);
  }
}
