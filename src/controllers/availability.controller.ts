import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { UpdateAvailabilityDto } from "../database/dto/availability.dto";
import { EventIdDTO } from "../database/dto/event.dto";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { asyncHandlerWithValidation } from "../middlewares/withValidation.middleware";
import {
  getAvailabilityForPublicEventService,
  getUserAvailabilityService,
  updateAvailabilityService,
} from "../services/availability.service";

export const getUserAvailabilityController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;

    const availability = await getUserAvailabilityService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Fetched availability successfully",
      availability,
    });
  },
);

export const updateAvailabilityController = asyncHandlerWithValidation(
  UpdateAvailabilityDto,
  "body",
  async (req: Request, res: Response, updateAvailabilityDto) => {
    const userId = req.user?.id as string;

    await updateAvailabilityService(userId, updateAvailabilityDto);

    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "Availability updated successfully" });
  },
);

export const getAvailabilityForPublicEventController =
  asyncHandlerWithValidation(
    EventIdDTO,
    "params",
    async (req: Request, res: Response, eventIdDto) => {
      const availability = await getAvailabilityForPublicEventService(
        eventIdDto.eventId,
      );

      return res.status(HTTPSTATUS.OK).json({
        message: "Event availability fetched successfully",
        data: availability,
      });
    },
  );
