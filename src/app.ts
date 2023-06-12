import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import { validateRequestPayload } from './utils/validator';
import cors from 'cors';
import { errorHandler } from './utils/error-handler';
import httpContext from 'express-http-context'
import { randomString } from './utils/helpers';
import Logger from './utils/Logger';
import { router } from "./routes/router";
import path from 'path'
import { errorWrapper } from "./utils/error-wrapper";
import session from 'express-session'
import { env } from "./utils/env-wrapper";
import { sendResponse } from "./utils/response-wrapper";
import { SuccessStatusCode } from "./status-codes";

const logger = new Logger('App');

const app: express.Application = express();

app.use(cors());
app.use(json({ limit: "50mb", type: "application/json" }));

app.use(httpContext.middleware);
app.use(errorWrapper((request: Request, response: Response, next: NextFunction) => {
    const reqId = request.headers.reqid ?? randomString(6)
    httpContext.set('ip', request.ip)
    httpContext.set('reqId', reqId);
    httpContext.set('startTime', Date.now());
    httpContext.set('route', `${request.method.toUpperCase()} ${request.originalUrl}`);
    next();
}))

//Logger for logging express route
app.use(errorWrapper((request: Request, response: Response, next: NextFunction) => {
    logger.info(`Start of Request: ${httpContext.get('route')}`)
    next();
}));

app.use(session({
    secret: env.cookie_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3000, httpOnly: true }
}))


app.get('/test-express-session', (request: Request, response: Response) => {

    logger.debug('Request', request.headers)

    logger.debug('IP', request.ip)

    //send response
    sendResponse({ response, status: 200, code: SuccessStatusCode.Success, payload: { message: 'Session is working' } })
})

app.use(errorWrapper(validateRequestPayload));



app.use(router)

app.use(express.static(path.join(__dirname, './public')))

app.use(errorHandler);


export default app;
