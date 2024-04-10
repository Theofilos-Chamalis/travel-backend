import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min, Max, IsOptional } from 'class-validator';

export class AvailableSeatsDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'uuid', required: false })
  id: string;

  @IsUUID()
  @ApiProperty({ type: 'string', format: 'uuid' })
  destinationId: string;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  @ApiProperty({ type: 'number', minimum: 0, maximum: 5, required: false })
  numSeatsAvailable: number;
}
