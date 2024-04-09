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

class MoodsDto {
  @IsInt()
  @Min(0)
  @Max(100)
  nature: number;

  @IsInt()
  @Min(0)
  @Max(100)
  relax: number;

  @IsInt()
  @Min(0)
  @Max(100)
  history: number;

  @IsInt()
  @Min(0)
  @Max(100)
  culture: number;

  @IsInt()
  @Min(0)
  @Max(100)
  party: number;
}

export class DestinationDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsISO8601()
  startingDate: string;

  @IsISO8601()
  endingDate: string;

  @IsInt()
  @Min(0)
  price: number;

  @ValidateNested()
  @Type(() => MoodsDto)
  moods: MoodsDto;
}
