import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { EventLocationEnumType } from "../entities/event.entity";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsEnum(EventLocationEnumType)
  @IsNotEmpty()
  locationType: EventLocationEnumType;
}

export class EventIdDTO {
  @IsUUID(4, { message: "Invalid uuid" })
  @IsNotEmpty()
  eventId: string;
}

export class UsernameDTO {
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class UsernameAndSlugDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}
