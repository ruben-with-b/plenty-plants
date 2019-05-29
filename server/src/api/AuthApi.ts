import * as UserTable from '../database/UserTable';
import {User} from '../model/User';
import {Request, Response, NextFunction} from "express";
import passport from 'passport';
import bcrypt from 'bcrypt';

/**
 * Offers some functions for user authentication.
 */
export {
    login,
    logout,
    signUp
}

/**
 * The salt to be used to hash the password. If specified as a number then a salt will be generated with the specified
 * number of rounds.
 */
const saltRounds = 10;

/**
 * Authenticate a user.
 * @param req The request.
 * @param res The response.
 * @param next The next function to be called.
 */
const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            console.log(info.message);
            res.statusMessage = info.message;
            res.status(401).send();
            return;
        }

        req.login(user, () => {
            res.send("Logged in");
        });
    })(req, res, next);
};

/**
 * Logout a user.
 * @param req The request.
 * @param res The response.
 */
const logout = (req: Request, res: Response) => {
    req.logout();

    console.log("logged out");

    return res.send();
};

/**
 * Affiliate new user.
 * @param req The request.
 * @param res The response.
 */
const signUp = (req: Request, res: Response) => {
    let email: string = req.query.email;
    let password: string = req.query.password;

    UserTable.getUser(email).then((user: User) => {
        if (user === undefined) {
            bcrypt.hash(password, saltRounds).then((hashedPw) => {
                UserTable.addUser(email, hashedPw).then(() => {
                    res.status(200).send();
                }).catch(error => {
                    console.log(error);
                    res.status(500).send('Creating new user failed!');
                });
            }).catch((error) => {
                console.log('Password encryption failed!', error);
                res.status(500).send('Password encryption failed!');
            });

        } else {
            let msg: String = 'A user with the email \'' + email + '\' already exists!';
            console.log(msg);
            res.status(409).send(msg);
        }
    }).catch(error => {
        console.log('DB access failed!', error);
        res.status(500).send('DB access failed!');
    });
};