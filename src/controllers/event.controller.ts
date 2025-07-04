import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import {
  CreateEventDto,
  EventIdDTO,
  UsernameAndSlugDTO,
  UsernameDTO,
} from "../database/dto/event.dto";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { asyncHandlerWithValidation } from "../middlewares/withValidation.middleware";
import {
  createEventService,
  deleteEventService,
  getPublicEventByUsernameAndSlugService,
  getPublicEventsByUsernameService,
  getUserEventsService,
  toggleEventPrivacyService,
} from "../services/event.service";

export const createEventController = asyncHandlerWithValidation(
  CreateEventDto,
  "body",
  async (req: Request, res: Response, createEventDto) => {
    const userId = req.user?.id as string;

    const event = await createEventService(userId, createEventDto);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Event created successfully",
      event,
    });
  },
);

export const getUserEventsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;

    const { events, username } = await getUserEventsService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User events fetched successfully",
      data: {
        events,
        username,
      },
    });
  },
);

export const toggleEventPrivacyController = asyncHandlerWithValidation(
  EventIdDTO,
  "body",
  async (req: Request, res: Response, eventIdDto) => {
    const userId = req.user?.id as string;

    const event = await toggleEventPrivacyService(userId, eventIdDto.eventId);

    return res.status(HTTPSTATUS.OK).json({
      message: `Event set to ${
        event.isPrivate ? "private" : "public"
      } successfully`,
    });
  },
);

export const getPublicEventsByUsernameController = asyncHandlerWithValidation(
  UsernameDTO,
  "params",
  async (req: Request, res: Response, usernameDto: UsernameDTO) => {
    const { user, events } = await getPublicEventsByUsernameService(
      usernameDto.username,
    );

    return res.status(HTTPSTATUS.OK).json({
      message: `Public events fetched successfully`,
      user,
      events,
    });
  },
);

export const getPublicEventByUsernameAndSlugController =
  asyncHandlerWithValidation(
    UsernameAndSlugDTO,
    "params",
    async (
      req: Request,
      res: Response,
      usernameAndSlugDto: UsernameAndSlugDTO,
    ) => {
      const event = await getPublicEventByUsernameAndSlugService(
        usernameAndSlugDto,
      );

      return res.status(HTTPSTATUS.OK).json({
        message: `Event details fetched successfully`,
        event,
      });
    },
  );

export const deleteEventController = asyncHandlerWithValidation(
  EventIdDTO,
  "params",
  async (req: Request, res: Response, eventIdDto) => {
    const userId = req.user?.id as string;

    await deleteEventService(userId, eventIdDto.eventId);

    return res.status(HTTPSTATUS.OK).json({
      message: `Event deleted successfully`,
    });
  },
);
