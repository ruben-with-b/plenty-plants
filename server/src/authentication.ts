import * as express from 'express';
import {StatusError} from "./api/StatusError";
import passport from "passport";

export function expressAuthentication(req: express.Request, name: string, scopes?: string[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        if(req.isAuthenticated()) {
            // The user is already logged in.
            resolve({});
            return;
        } else {
            // Check if the user sent an authorization header. Check if it is valid.
            passport.authenticate("basic", (err: Error, user: string, info: any) => {
                if(err) {
                    reject(new StatusError(500, 'Internal error', err.message));
                    return;
                }
                if(user) {
                    req.login(user, (error) => {
                        if(error) {
                            reject(new StatusError(500, 'Internal error', error.message));
                            return;
                        } else {
                            resolve({});
                            return;
                        }
                    });
                } else {
                    reject(new StatusError(401, 'Authentication error', 'Missing or wrong credentials.'));
                    return;
                }
            })(req, req.res, req.next);
        }
    });
}