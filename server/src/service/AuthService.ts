import * as UserTable from "../database/UserTable";
import {User} from "../model/User";
import passport = require('passport');
import LocalStrategy = require('passport-local');

function initAuthentication(): void {
    passport.use(
        new LocalStrategy.Strategy(
            {
                usernameField: "email",
                passwordField: "hashedPw"
            },

            (username, password, done) => {
                UserTable.getUser(username).then((user) => {
                    if (user && user.getEmail() === username && user.getHashedPw() === password) {
                        done(null, user);
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
    passport.deserializeUser((email: String, done) => {
        UserTable.getUser(email).then((user) => {
            done(null, user);
        }).catch((error) => {
            done(error);
        });
    });
}

const middleware = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
};

export {
    initAuthentication,
    middleware
}

