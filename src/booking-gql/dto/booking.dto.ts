import {
  Field,
  InputType,
  ObjectType,
  ID,
  Int,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {
  IsUUID,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsEmail,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

@ObjectType()
export class BookingGQLDto {
  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  id: string;

  @Field(() => ID)
  @IsUUID()
  destinationId: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(5)
  numSeats: number;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  confirmed: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsDate()
  @IsOptional()
  expiresAt: Date;
}

@InputType()
export class BookingGQLInputDto extends BookingGQLDto {
  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  id: string;

  @Field(() => ID)
  @IsUUID()
  destinationId: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(5)
  numSeats: number;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  confirmed: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsDate()
  @IsOptional()
  expiresAt: Date;
}
