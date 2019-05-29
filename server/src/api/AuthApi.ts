import * as UserTable from '../database/UserTable';
import {User} from '../model/User';
import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import bcrypt from 'bcrypt';

export {
    login,
    logout,
    signUp
}

const saltRounds = 10;

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

const logout = (req: Request, res: Response) => {
    req.logout();

    console.log("logged out");

    return res.send();
};

const signUp = (request: Request, response: Response) => {
    let email: String = request.query.email;
    let password: String = request.query.password;

    UserTable.getUser(email).then((user: User) => {
        if (user === undefined) {
            bcrypt.hash(password, saltRounds).then((hashedPw) => {
                UserTable.addUser(email, hashedPw).then(() => {
                    response.status(200).send();
                }).catch(error => {
                    console.log(error);
                    response.status(500).send('Creating new user failed!');
                });
            }).catch((error) => {
                console.log('Password encryption failed!', error);
                response.status(500).send('Password encryption failed!');
            });

        } else {
            let msg: String = 'A user with the email \'' + email + '\' already exists!';
            console.log(msg);
            response.status(409).send(msg);
        }
    }).catch(error => {
        console.log('DB access failed!', error);
        response.status(500).send('DB access failed!');
    });
};


// bcrypt.hash(myPlaintextPassword, saltRounds).then((hashedPw: String) => {});