import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import { config } from "./config/app.config";
import { HTTPSTATUS } from "./config/http.config";
import "./config/passport.config";
import { initializeDatabase } from "./database/database";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import authRoutes from "./routes/auth.route";
import availabilityRoutes from "./routes/availability.route";
import eventRoutes from "./routes/event.route";
import integrationRoutes from "./routes/integration.route";
import meetingRoutes from "./routes/meeting.route";

const app = express();

const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

app.use(passport.initialize());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(HTTPSTATUS.OK).json({ message: "Hello from Appointly" });
});

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/event`, eventRoutes);
app.use(`${BASE_PATH}/availability`, availabilityRoutes);
app.use(`${BASE_PATH}/integration`, integrationRoutes);
app.use(`${BASE_PATH}/meeting`, meetingRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  await initializeDatabase();
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
});
