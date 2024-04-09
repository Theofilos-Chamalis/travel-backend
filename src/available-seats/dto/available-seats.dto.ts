import { IsUUID, IsInt, Min, Max, IsOptional } from 'class-validator';

export class AvailableSeatsDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsUUID()
  destinationId: string;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  numSeatsAvailable: number;
}
