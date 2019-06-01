import * as UserTable from '../database/UserTable';
import * as express from "express";
import {Controller, Get, Route, Request, Security} from 'tsoa';
import {User} from "../model/User";

/**
 * Offers some user information.
 */
@Route('user')
export class UserApi extends Controller {

    @Security('basicAuth')
    @Get()
    public async getUser(@Request() req: express.Request): Promise<User> {
        if(req.session) {
            return UserTable.getUser(req.session.passport.user);
        } else {
            throw new Error("Session not available!");
        }
    }
}