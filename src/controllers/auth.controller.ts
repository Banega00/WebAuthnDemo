import { Request, Response, NextFunction } from "express";
import { SuccessStatusCode } from "../status-codes";
import Logger from "../utils/Logger";
import { sendResponse } from "../utils/response-wrapper";
import { AuthService } from "../services/auth.service";

export class AuthController {
    private logger: Logger;
    private authService: AuthService;

    constructor() {
        this.logger = new Logger(this.constructor.name)
        this.authService = new AuthService();

    }

    getRegisterOptions = async (request: Request, response: Response, next: NextFunction) => {
        
        const username = request.params.username;

        const registerOptions = await this.authService.getRegisterOptions(username);

        return sendResponse({ response, status: 200, code: SuccessStatusCode.Success, payload: { options: registerOptions } })
    }
}