import * as UserTable from '../database/UserTable';
import * as UserGardenTable from '../database/UserGardenTable';
import * as express from "express";
import {Controller, Get, Route, Request, Security, Response, Post, Delete} from 'tsoa';
import {User} from "../model/User";
import {StatusError} from "./StatusError";

/**
 * Offers some user information.
 */
@Route('user')
export class UserApi extends Controller {

    /**
     * @summary Get the user profile for the current user.
     */
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

    /**
     * @summary Get the users favourite plants.
     */
    @Security('basicAuth')
    @Get('my-plants')
    public async getMyPlants(@Request() req: express.Request): Promise<Array<string>> {
        return new Promise<Array<string>>((resolve, reject) => {
            if(req.session) {
                // Get current user.
                UserTable.getUser(req.session.passport.user).then((user) => {
                    resolve(UserGardenTable.getPlants(user.getEmail()));
                }).catch((error) => {
                    reject(new StatusError(500, "Internal error", error.toString()));
                })
            } else {
                reject(new StatusError(500, "Internal Error", "Session not available!"));
            }
        });
    }

    /**
     * @summary Add a plant to the users favourite plants.
     * @param req The request.
     * @param plant The plant to be added.
     */
    @Response('204', 'Plant successfully added.')
    @Security('basicAuth')
    @Post('my-plants/{plant}')
    public async addPlant(@Request() req: express.Request, plant: string): Promise<any> {
        return new Promise<Array<string>>((resolve, reject) => {
            if(req.session) {
                // Get current user.
                UserTable.getUser(req.session.passport.user).then((user) => {
                    // Add plant to favourites.
                    UserGardenTable.addPlant(user.getEmail(), plant).then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(new StatusError(500, "Internal error", error.toString()));
                    })
                }).catch((error) => {
                    reject(new StatusError(500, "Internal error", error.toString()));
                })
            } else {
                reject(new StatusError(500, "Internal Error", "Session not available!"));
            }
        });
    }

    /**
     * @summary Remove a plant from the users favourite plants.
     * @param req The request.
     * @param plant The plant to be removed.
     */
    @Response('204', 'Plant successfully removed.')
    @Security('basicAuth')
    @Delete('my-plants/{plant}')
    public async removePlant(@Request() req: express.Request, plant: string): Promise<any> {
        return new Promise<Array<string>>((resolve, reject) => {
            if(req.session) {
                // Get current user.
                UserTable.getUser(req.session.passport.user).then((user) => {
                    // Remove plants from favourites.
                    UserGardenTable.removePlant(user.getEmail(), plant).then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(new StatusError(500, "Internal error", error.toString()));
                    })
                }).catch((error) => {
                    reject(new StatusError(500, "Internal error", error.toString()));
                })
            } else {
                reject(new StatusError(500, "Internal Error", "Session not available!"));
            }
        });
    }
}