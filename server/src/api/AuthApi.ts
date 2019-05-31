import * as UserTable from '../database/UserTable';
import {User} from '../model/User';
import * as express from "express";
import passport from 'passport';
import bcrypt from 'bcrypt';
import {Controller, Get, Post, Route, Request, Response, SuccessResponse, Query, Security} from "tsoa";
import {StatusError} from "./StatusError";

/**
 * Offers some functions for user authentication.
 */
@Route('auth')
export class AuthApi extends Controller {

    /**
     * The salt to be used to hash the password. If specified as a number then a salt will be generated with the specified
     * number of rounds.
     */
    private readonly SALT_ROUNDS: number = 10;

    /**
     * Log in a user.
     * @param req The request.
     */
    @Security('passport_local')
    @SuccessResponse('200', 'Logged in')
    @Response('401', 'Authentication failed')
    @Post('login')
    public async login(@Request() req: express.Request): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            passport.authenticate("local", (err, user, info) => {
                if(user) {
                    resolve();
                } else {
                    reject();
                }
            })(req, req.res, req.next);
        });
    }

    /**
     * Log out a user.
     * @param req The request.
     */
    @SuccessResponse('200', 'Logged out')
    @Response('401', 'Authentication failed')
    @Get('logout')
    public async logout(@Request() req: express.Request) {
        req.logout();

        console.log("logged out");
    }

    /**
     * Sign up a new user.
     * @param email The email address of the new user.
     * @param password The password of the new user.
     */
    @SuccessResponse('200', 'Signed up')
    @Response('409', 'User already exists')
    @Get('signup')
    public async signUp(@Query('email') email: string, @Query('password') password: string) {
        UserTable.getUser(email).then((user: User) => {
            if (user === undefined) {
                bcrypt.hash(password, this.SALT_ROUNDS).then((hashedPw) => {
                    UserTable.addUser(email, hashedPw).then(() => {
                        return;
                    });
                });

            } else {
                let error: StatusError = new StatusError(409, 'Conflict',
                    'A user with the email \'' + email + '\' already exists!');
                console.log(error);
                throw error;
            }
        });
    }
}