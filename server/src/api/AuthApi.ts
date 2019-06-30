import * as UserTable from '../database/UserTable';
import {User} from '../model/User';
import * as express from "express";
import bcrypt from 'bcrypt';
import {Controller, Get, Post, Route, Request, Response, SuccessResponse, Query, Security, Tags} from "tsoa";
import {StatusError} from "../model/StatusError";

/**
 * Offers some functions for user authentication.
 */
@Tags('Authentication')
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
    @Security('basicAuth')
    @SuccessResponse('204', 'Logged in')
    @Response('401', 'Authentication error')
    @Post('login')
    public async login(@Request() req: express.Request): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            if(req.isAuthenticated()) {
                resolve();
            } else {
                reject(new StatusError(401, 'Authentication error',
                    'Missing or wrong credentials'));
                return;
            }
        });
    }

    /**
     * Log out a user.
     * @param req The request.
     */
    @SuccessResponse('204', 'Logged out')
    @Get('logout')
    public async logout(@Request() req: express.Request) {
        req.logout();
    }

    /**
     * Sign up a new user.
     * @param email The email address of the new user.
     * @param password The password of the new user.
     */
    @SuccessResponse('204', 'Signed up')
    @Response('409', 'User already exists')
    @Get('signup')
    public async signUp(@Query('email') email: string, @Query('password') password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            UserTable.getUser(email).then((user: User) => {
                if (user === undefined) {
                    bcrypt.hash(password, this.SALT_ROUNDS).then((hashedPw) => {
                        UserTable.addUser(email, hashedPw).then(() => {
                            resolve();
                            return;
                        });
                    });

                } else {
                    reject(new StatusError(409, 'Conflict',
                        'A user with the email \'' + email + '\' already exists!'));
                    return;
                }
            });
        });
    }
}