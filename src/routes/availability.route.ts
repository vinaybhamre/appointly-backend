import { Router } from "express";
import { passportAuthenticate } from "../config/passport.config";
import {
  getAvailabilityForPublicEventController,
  getUserAvailabilityController,
  updateAvailabilityController,
} from "../controllers/availability.controller";

const availabilityRoutes = Router();

availabilityRoutes.get(
  "/me",
  passportAuthenticate,
  getUserAvailabilityController,
);

availabilityRoutes.get(
  "/public/:eventId",
  getAvailabilityForPublicEventController,
);

availabilityRoutes.put(
  "/update",
  passportAuthenticate,
  updateAvailabilityController,
);

export default availabilityRoutes;
