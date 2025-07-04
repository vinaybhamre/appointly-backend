import { HTTPSTATUS } from "../config/http.config";
import { LoginDto, RegisterDto } from "../database/dto/auth.dto";
import { asyncHandlerWithValidation } from "../middlewares/withValidation.middleware";
import { loginService, registerService } from "../services/auth.service";

export const registerController = asyncHandlerWithValidation(
  RegisterDto,
  "body",
  async (req, res, registerDto) => {
    const { user } = await registerService(registerDto);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
      user,
    });
  },
);

export const loginController = asyncHandlerWithValidation(
  LoginDto,
  "body",
  async (req, res, loginDto) => {
    const { user, accessToken, expiresAt } = await loginService(loginDto);

    return res.status(HTTPSTATUS.OK).json({
      message: "User logged in successfully",
      user,
      accessToken,
      expiresAt,
    });
  },
);
