import { Router } from "express";
import { ExampleController } from "../controllers/example.controller";
import { errorWrapper } from "../utils/error-wrapper";
import { AuthController } from "../controllers/auth.controller";

export const authRouter = Router();

const authController =  new AuthController();

authRouter.get('/register-options/:username', errorWrapper(authController.getRegisterOptions))

authRouter.post('/verify-authentication',  errorWrapper(authController.verifyAuthentication))