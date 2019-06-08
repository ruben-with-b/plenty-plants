import * as UserTable from '../database/UserTable';
import * as express from "express";
import {Controller, Get, Route, Request, Security} from 'tsoa';
import {User} from "../model/User";
import {StatusError} from "./StatusError";

/**
 * Offers some user information.
 */
@Route('user')
export class UserApi extends Controller {

    @Security('basicAuth')
    @Get()
    public async getUser(@Request() req: express.Request): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            if(req.session) {
                UserTable.getUser(req.session.passport.user).then((user) => {
                    resolve(user);
                }).catch((error) => {
                    reject(new StatusError(500, "Internal error", error.toString()));
                })
            } else {
                reject(new StatusError(500, "Internal Error", "Session not available!"));
            }
        });
    }
}