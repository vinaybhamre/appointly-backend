import { Router } from "express";
import { passportAuthenticate } from "../config/passport.config";
import {
  createEventController,
  deleteEventController,
  getPublicEventByUsernameAndSlugController,
  getPublicEventsByUsernameController,
  getUserEventsController,
  toggleEventPrivacyController,
} from "../controllers/event.controller";

const eventRoutes = Router();

eventRoutes.post("/create", passportAuthenticate, createEventController);
eventRoutes.get("/all", passportAuthenticate, getUserEventsController);

eventRoutes.get("/public/:username", getPublicEventsByUsernameController);

eventRoutes.get(
  "/public/:username/:slug",
  getPublicEventByUsernameAndSlugController,
);

eventRoutes.put(
  "/toggle-privacy",
  passportAuthenticate,
  toggleEventPrivacyController,
);

eventRoutes.delete("/:eventId", passportAuthenticate, deleteEventController);

export default eventRoutes;
