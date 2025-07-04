import { Router } from "express";
import { passportAuthenticate } from "../config/passport.config";
import {
  checkIntegrationController,
  connectAppController,
  getUserIntegrationsController,
  googleOAuthCallbackController,
} from "../controllers/integration.controller";

const integrationRoutes = Router();

integrationRoutes.get(
  "/all",
  passportAuthenticate,
  getUserIntegrationsController,
);

integrationRoutes.get(
  "/check/:appType",
  passportAuthenticate,
  checkIntegrationController,
);

integrationRoutes.get(
  "/connect/:appType",
  passportAuthenticate,
  connectAppController,
);

integrationRoutes.get("/google/callback", googleOAuthCallbackController);

export default integrationRoutes;
