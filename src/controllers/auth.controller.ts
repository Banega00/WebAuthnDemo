import { Request, Response, NextFunction } from "express";
import { SuccessStatusCode } from "../status-codes";
import Logger from "../utils/Logger";
import { sendResponse } from "../utils/response-wrapper";
import { AuthService } from "../services/auth.service";
import type {
    RegistrationResponseJSON,
    AuthenticationResponseJSON,
    AuthenticatorDevice,
  } from '@simplewebauthn/typescript-types';
export class AuthController {
    private logger: Logger;
    private authService: AuthService;

    constructor() {
        this.logger = new Logger(this.constructor.name)
        this.authService = new AuthService();

    }

    generateAuthenticationOptions

    getRegisterOptions = async (request: Request, response: Response, next: NextFunction) => {
        
        const username = request.params.username;

        const registerOptions = await this.authService.getRegisterOptions(username);

        return sendResponse({ response, status: 200, code: SuccessStatusCode.Success, payload: { options: registerOptions } })
    }

    verifyAuthentication = async (request: Request, response: Response, next: NextFunction) => {
        const body: AuthenticationResponseJSON = request.body;

        const registerOptions = await this.authService.verifyAuthentication(body);

        return sendResponse({ response, status: 200, code: SuccessStatusCode.Success, payload: { options: registerOptions } })
    }
}