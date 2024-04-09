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
  id: string;

  @IsUUID()
  destinationId: string;

  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsInt()
  @Min(1)
  @Max(5)
  numSeats: number;

  @IsBoolean()
  @IsOptional()
  confirmed: boolean;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  expiresAt: Date;
}
