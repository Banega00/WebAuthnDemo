import { GenerateRegistrationOptionsOpts, generateRegistrationOptions } from "@simplewebauthn/server";
import { dataSource } from "../../main";
import CustomError from "../errors/CustomError";
import { User } from "../models/user.entity";
import { ErrorStatusCode } from "../status-codes";
import Logger from "../utils/Logger"
import { randomUUID } from "crypto";
import { env } from "../utils/env-wrapper";
import type {
    RegistrationResponseJSON,
    AuthenticationResponseJSON,
    AuthenticatorDevice,
} from '@simplewebauthn/typescript-types';
//This is Service
//Its responsibility is to execute specific functions without knowledge of request, and response objects
export class AuthService {


    private logger: Logger;
    constructor() {
        this.logger = new Logger(this.constructor.name)
    }

    async getRegisterOptions(username: string) {
        const existingUser = await dataSource.manager.findOne(User, { where: { username } });

        if (existingUser) {
            throw new CustomError({ code: ErrorStatusCode.USER_ALREADY_EXISTS, message: `User with username ${username} already exists` })
        }

        const user = new User({ username, id: randomUUID() });

        const opts: GenerateRegistrationOptionsOpts = {
            rpName: 'SimpleWebAuthn Example',
            rpID: env.fido.rp_id,
            userID: user.username,
            userName: user.id,
            timeout: 60000,
            attestationType: 'none',
            /**
             * Passing in a user's list of already-registered authenticator IDs here prevents users from
             * registering the same device multiple times. The authenticator will simply throw an error in
             * the browser if it's asked to perform registration when one of these ID's already resides
             * on it.
             */
            // excludeCredentials: [devices].map(dev => ({
            //     id: dev.credentialID,
            //     type: 'public-key',
            //     transports: dev.transports,
            // })),
            authenticatorSelection: {
                residentKey: 'discouraged',
            },
            /**
             * Support the two most common algorithms: ES256, and RS256
             */
            supportedAlgorithmIDs: [-7, -257],
        };

        const options = generateRegistrationOptions(opts);

        return options;
    }

    async verifyAuthentication(authResponse: AuthenticationResponseJSON) {

        // const user = inMemoryUserDeviceDB[loggedInUserId];

        // const expectedChallenge = req.session.currentChallenge;

        // let dbAuthenticator;
        // const bodyCredIDBuffer = base64url.toBuffer(body.rawId);
        // // "Query the DB" here for an authenticator matching `credentialID`
        // for (const dev of user.devices) {
        //     if (isoUint8Array.areEqual(dev.credentialID, bodyCredIDBuffer)) {
        //         dbAuthenticator = dev;
        //         break;
        //     }
        // }

        // if (!dbAuthenticator) {
        //     return res.status(400).send({ error: 'Authenticator is not registered with this site' });
        // }

        // let verification: VerifiedAuthenticationResponse;
        // try {
        //     const opts: VerifyAuthenticationResponseOpts = {
        //         response: body,
        //         expectedChallenge: `${expectedChallenge}`,
        //         expectedOrigin,
        //         expectedRPID: rpID,
        //         authenticator: dbAuthenticator,
        //         requireUserVerification: true,
        //     };
        //     verification = await verifyAuthenticationResponse(opts);
        // } catch (error) {
        //     const _error = error as Error;
        //     console.error(_error);
        //     return res.status(400).send({ error: _error.message });
        // }

        // const { verified, authenticationInfo } = verification;

        // if (verified) {
        //     // Update the authenticator's counter in the DB to the newest count in the authentication
        //     dbAuthenticator.counter = authenticationInfo.newCounter;
        // }

        // req.session.currentChallenge = undefined;

        // res.send({ verified });

    }
}