import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: 'number', minimum: 0, maximum: 100 })
  nature: number;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty({ type: 'number', minimum: 0, maximum: 100 })
  relax: number;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty({ type: 'number', minimum: 0, maximum: 100 })
  history: number;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty({ type: 'number', minimum: 0, maximum: 100 })
  culture: number;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty({ type: 'number', minimum: 0, maximum: 100 })
  party: number;
}

export class DestinationDto {
  @IsUUID()
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', maxLength: 256 })
  slug: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', maxLength: 128 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  description: string;

  @IsISO8601()
  @ApiProperty({ type: 'string', format: 'date' })
  startingDate: string;

  @IsISO8601()
  @ApiProperty({ type: 'string', format: 'date' })
  endingDate: string;

  @IsInt()
  @Min(0)
  @ApiProperty({ type: 'number', minimum: 0 })
  price: number;

  @ValidateNested()
  @Type(() => MoodsDto)
  @ApiProperty({ type: MoodsDto })
  moods: MoodsDto;
}
