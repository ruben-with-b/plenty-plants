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
     * Checks whether the current user is authenticated
     * @param req The request.
     */
    @SuccessResponse('204', 'Logged in')
    @Response('401', 'User is not authenticated')
    @Get('is-authenticated')
    public async isAuthenticated(@Request() req: express.Request): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            if(req.isAuthenticated()) {
                resolve();
            } else {
                reject(new StatusError(401, 'Authentication error',
                    'User is not authenticated'));
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
     * @param username The username of the new user.
     * @param password The password of the new user.
     */
    @SuccessResponse('204', 'Signed up')
    @Response('409', 'User already exists')
    @Get('signup')
    public async signUp(@Query('username') username: string, @Query('password') password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            UserTable.getUser(username).then((user) => {
                if (user === undefined) {
                    bcrypt.hash(password, this.SALT_ROUNDS).then((hashedPw: String) => {
                        return UserTable.addUser(username, hashedPw);
                    }).then(() => {
                        resolve();
                        return;
                    }).catch((error) => {
                        reject(new StatusError(500, "Internal error", error.toString()));
                    });
                } else {
                    reject(new StatusError(409, 'Conflict',
                        'A user with the username \'' + username + '\' already exists!'));
                    return;
                }
            }).catch((error) => {
                reject(new StatusError(500, "Internal error", error.toString()));
            });
        });
    }
}