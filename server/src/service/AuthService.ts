import * as UserTable from "../database/UserTable";
import {User} from "../model/User";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from "express";

/**
 * Initializes the authentication.
 */
export {
    initAuthentication,
    middleware
}

/**
 * Initialize the authentication.
 */
function initAuthentication(): void {
    passport.use(
        new LocalStrategy.Strategy(
            {
                usernameField: "email",
                passwordField: "password"
            },

            (username, password, done) => {
                UserTable.getUser(username).then((user) => {
                    if (user && user.getEmail() === username) {
                        bcrypt.compare(password, user.getHashedPw()).then((result) => {
                            if(result) {
                                done(null, user);
                            } else {
                                done(null, false, {message: 'Incorrect username or password'});
                            }
                        }).catch((error) => {
                            console.log("Password comparision failed!", error);
                            done("Password comparision failed!");
                        });
                    } else {
                        done(null, false, {message: 'Incorrect username or password'});
                    }
                }).catch((error) => {
                    done(error);
                });
            }
        )
    );
    // Defines how to serialize a user in a session. (because the email is unique it is enough)
    passport.serializeUser((user: User, done) => {
        done(null, user.getEmail())
    });
    // Describes how to deserialize a user from the session.
    passport.deserializeUser((email: string, done) => {
        UserTable.getUser(email).then((user) => {
            done(null, user);
        }).catch((error) => {
            done(error);
        });
    });
}

/**
 * The authentication middleware.
 * @param req The request.
 * @param res The response.
 * @param next The next function to be called.
 */
const middleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
};

