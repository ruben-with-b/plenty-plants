import * as UserTable from "../database/UserTable";
import {User} from "../model/User";
import passport from 'passport';
import bcrypt from 'bcrypt';
import {BasicStrategy} from "passport-http";

/**
 * Initializes the authentication.
 */
export {
    initAuthentication,
}

/**
 * Initialize the authentication.
 */
function initAuthentication(): void {
    passport.use(
        new BasicStrategy(
           (username, password, done) => {
                UserTable.getUser(username).then((user) => {
                    if (user && user.getEmail() === username) {
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