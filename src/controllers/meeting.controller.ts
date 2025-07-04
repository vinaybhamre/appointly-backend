import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { CreateMeetingDto, MeetingIdDTO } from "../database/dto/meeting.dto";
import {
  MeetingFilterEnum,
  MeetingFilterEnumType,
} from "../enums/meeting.enum";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { asyncHandlerWithValidation } from "../middlewares/withValidation.middleware";
import {
  cancelMeetingService,
  createMeetBookingForGuestService,
  getUserMeetingsService,
} from "../services/meeting.service";

export const getUserMeetingsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;

    const filter =
      (req.query.filter as MeetingFilterEnumType) || MeetingFilterEnum.UPCOMING;

    const meetings = await getUserMeetingsService(userId, filter);

    return res.status(HTTPSTATUS.OK).json({
      message: "Meetings fetched successfully",
      meetings,
    });
  },
);

export const createMeetBookingForGuestController = asyncHandlerWithValidation(
  CreateMeetingDto,
  "body",
  async (req: Request, res: Response, createMeetingDto) => {
    const { meetLink, meeting } = await createMeetBookingForGuestService(
      createMeetingDto,
    );

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Meeting scheduled successfully",
      data: {
        meetLink,
        meeting,
      },
    });
  },
);

export const cancelMeetingController = asyncHandlerWithValidation(
  MeetingIdDTO,
  "params",
  async (req: Request, res: Response, meetingIdDto) => {
    await cancelMeetingService(meetingIdDto.meetingId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Meeting cancelled successfully",
    });
  },
);
