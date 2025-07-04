import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { DayOfWeekEnum } from "../entities/day-availability.entity";

export class DayAvailabilityDto {
  @IsEnum(DayOfWeekEnum)
  @IsNotEmpty()
  day: DayOfWeekEnum;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;
}

export class UpdateAvailabilityDto {
  @IsNumber()
  @IsNotEmpty()
  timeGap: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayAvailabilityDto)
  days: DayAvailabilityDto[];
}
