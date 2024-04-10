import { Field, InputType, ObjectType, ID, Int } from '@nestjs/graphql';
import { IsUUID, IsInt, Min, Max, IsOptional } from 'class-validator';

@ObjectType()
export class AvailableSeatsGQLDto {
  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  id: string;

  @Field(() => ID)
  @IsUUID()
  destinationId: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  numSeatsAvailable: number;
}

@InputType()
export class AvailableSeatsGQLInputDto extends AvailableSeatsGQLDto {
  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  id: string;

  @Field(() => ID)
  @IsUUID()
  destinationId: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  numSeatsAvailable: number;
}
