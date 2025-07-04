import { Router } from "express";
import { passportAuthenticate } from "../config/passport.config";
import {
  cancelMeetingController,
  createMeetBookingForGuestController,
  getUserMeetingsController,
} from "../controllers/meeting.controller";

const meetingRoutes = Router();

meetingRoutes.get("/user/all", passportAuthenticate, getUserMeetingsController);

meetingRoutes.post("/public/create", createMeetBookingForGuestController);

meetingRoutes.put(
  "/cancel/:meetingId",
  passportAuthenticate,
  cancelMeetingController,
);

export default meetingRoutes;
