import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsDate,
  IsEmail,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class BookingDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'uuid', required: false })
  id: string;

  @IsUUID()
  @ApiProperty({ type: 'string', format: 'uuid' })
  destinationId: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: 'string', format: 'email' })
  userEmail: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ type: 'number', minimum: 1, maximum: 5 })
  numSeats: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: 'boolean', required: false })
  confirmed: boolean;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  expiresAt: Date;
}
