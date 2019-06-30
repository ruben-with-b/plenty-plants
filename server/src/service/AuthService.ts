import * as UserTable from "../database/UserTable";
import {User} from "../model/User";
import passport from 'passport';
import bcrypt from 'bcrypt';
import {BasicStrategy} from "passport-http";
import * as express from "express";
import {StatusError} from "../model/StatusError";

/**
 * Initialize the authentication.
 */
export function initAuthentication(): void {
    passport.use(
        new BasicStrategy(
           (username, password, done) => {
                UserTable.getUser(username).then((user) => {
                    if (user && user.getUsername() === username) {
                        bcrypt.compare(password, user.getHashedPw()).then((result) => {
                            if(result) {
                                done(null, user);
                            } else {
                                done(null, false);
                            }
                        }).catch((error) => {
                            done(error);
                        });
                    } else {
                        done(null, false);
                    }
                }).catch((error) => {
                    done(error);
                });
            }
        )
    );
    // Defines how to serialize a user in a session. (because the username is unique, it is enough)
    passport.serializeUser((user: User, done) => {
        done(null, user.getUsername())
    });
    // Describes how to deserialize a user from the session.
    passport.deserializeUser((username: string, done) => {
        UserTable.getUser(username).then((user) => {
            done(null, user);
        }).catch((error) => {
            done(error);
        });
    });
}

/**
 * Is called before each request to a protected api-resource.
 * @param req The request.
 * @param name The name of the wanted security from the securityDefinitions.
 * @param scopes The required scopes.
 * @see https://github.com/lukeautry/tsoa#authentication
 */
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