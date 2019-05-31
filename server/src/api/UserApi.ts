import * as UserTable from '../database/UserTable';
import * as express from "express";
import {Controller, Get, Route, Request, Security} from 'tsoa';
import {User} from "../model/User";
import * as passport from "passport";

/**
 * Offers some user information.
 */
@Route('user')
export class UserApi extends Controller {

    @Security('passport_local')
    @Get()
    public async getUser(@Request() req: express.Request): Promise<User> {
        if(req.session) {
            console.log(req.session.passport.user);
            return UserTable.getUser(req.session.passport.user);
        } else {
            throw new Error("Session not available!");
        }
    }
}