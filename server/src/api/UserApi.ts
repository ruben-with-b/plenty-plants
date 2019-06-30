import * as UserTable from '../database/UserTable';
import * as UserGardenTable from '../database/UserGardenTable';
import * as express from "express";
import {Controller, Get, Route, Request, Security, Response, Post, Delete, Tags, Put, Body} from 'tsoa';
import {User} from "../model/User";
import {StatusError} from "../model/StatusError";
import {TutorialProgress} from "../model/TutorialProgress";

/**
 * Offers some user information.
 */
@Tags('User')
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
                    resolve(UserGardenTable.getPlants(user.getUsername()));
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
        return new Promise<any>((resolve, reject) => {
            if(req.session) {
                // Get current user.
                UserTable.getUser(req.session.passport.user).then((user) => {
                    // Add plant to favourites.
                    UserGardenTable.addPlant(user.getUsername(), plant).then(() => {
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
        return new Promise<any>((resolve, reject) => {
            if(req.session) {
                // Get current user.
                UserTable.getUser(req.session.passport.user).then((user) => {
                    // Remove plants from favourites.
                    UserGardenTable.removePlant(user.getUsername(), plant).then(() => {
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
     * @summary Get the tutorial-progress for a plant.
     * @param req The request.
     * @param plant The name of the plant.
     */
    @Security('basicAuth')
    @Get('my-plants/{plant}/tutorial-progress')
    public async getTutorialProgress(@Request() req: express.Request, plant: string): Promise<TutorialProgress> {
        return new Promise<TutorialProgress>((resolve, reject) => {
            if(req.session) {
                // Get current user.
                UserTable.getUser(req.session.passport.user).then((user) => {
                    // Get progress.
                    UserGardenTable.getTutorialProgress(user.getUsername(), plant).then((progress) => {
                        resolve(new TutorialProgress(progress));
                    });
                }).catch((error) => {
                    reject(new StatusError(500, "Internal error", error.toString()));
                })
            } else {
                reject(new StatusError(500, "Internal Error", "Session not available!"));
            }
        });
    }

    /**
     * @summary Update the tutorial-progress of a plant.
     * @param req The request.
     * @param plant The name of the plant.
     * @param tutorialProgress The new tutorial progress.
     */
    @Response('204', 'Progress successfully updated.')
    @Security('basicAuth')
    @Put('my-plants/{plant}/tutorial-progress')
    public async updateTutorialProgress(@Request() req: express.Request, plant: string,
                                        @Body() tutorialProgress: TutorialProgress): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if(req.session) {
                // Get current user.
                UserTable.getUser(req.session.passport.user).then((user) => {
                    // Update progress.
                    UserGardenTable.updateTutorialProgress(user.getUsername(), plant, tutorialProgress.progress).then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(new StatusError(500, "Internal error", error.toString()));
                    });
                }).catch((error) => {
                    reject(new StatusError(500, "Internal error", error.toString()));
                })
            } else {
                reject(new StatusError(500, "Internal Error", "Session not available!"));
            }
        });
    }
}