import { Type } from 'class-transformer';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  ValidateNested,
  IsISO8601,
} from 'class-validator';

import { Field, InputType, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class MoodsGQLDto {
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  nature: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  relax: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  history: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  culture: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  party: number;
}

@ObjectType()
export class DestinationGQLDto {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsISO8601()
  startingDate: string;

  @Field()
  @IsISO8601()
  endingDate: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  price: number;

  @Field(() => MoodsGQLDto)
  @ValidateNested()
  @Type(() => MoodsGQLDto)
  moods: MoodsGQLDto;
}

@InputType()
class MoodsGQLInputDto {
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  nature: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  relax: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  history: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  culture: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100)
  party: number;
}

@InputType()
export class DestinationGQLInputDto extends DestinationGQLDto {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsISO8601()
  startingDate: string;

  @Field()
  @IsISO8601()
  endingDate: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  price: number;

  @Field(() => MoodsGQLInputDto)
  @ValidateNested()
  @Type(() => MoodsGQLInputDto)
  moods: MoodsGQLInputDto;
}
