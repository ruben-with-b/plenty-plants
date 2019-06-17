import * as UserTable from '../database/UserTable';
import * as PushSubscriptionTable from '../database/PushSubscriptionTable';
import * as express from "express";
import {Controller, Get, Route, Request, Security, Response, Post, Body} from 'tsoa';
import {User} from "../model/User";
import {StatusError} from "./StatusError";

import * as webpush from 'web-push'
import {PushSubscription} from "web-push";

const vapidKeys = {
    publicKey: 'BDLpp91SDx9YfVpkbSCVIi4H-uXBcoggk1x0Whaw_kHQRU_9yxYQWQN4Uob0x06iu26nH7AdzNdq9vBc6Fk80OU',
    privateKey: 'PWzMXos8riKO6GAgV7q9z10_GunQPqu8pWVmCZuzFX0'
};

//setting our previously generated VAPID keys
webpush.setVapidDetails(
    'mailto:myuserid@email.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

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

    /**
     * @summary Get the plants of the current user.
     */
    @Response('401', 'Please log in.')
    @Get('my-plants')
    public async getMyPlants(): Promise<Array<string>> {
        return new Promise<Array<string>>((resolve, reject) => {
            resolve(new Array<string>('tomato', 'arugula'));
        });
    }

    /**
     *
     * @param {string} pushSubscription The push subscription (as json).
     */
    @Security('basicAuth')
    @Response('401', 'Unauthorized')
    @Response('500', 'Internal server error')
    @Post('save-push-subscription')
    public async savePushSubscription(@Request() req: express.Request, @Body() pushSubscription: PushSubscription): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if(req.isAuthenticated()) {
                if(req.session) {
                    PushSubscriptionTable.add(req.session.passport.user, pushSubscription);
                    resolve({});
                } else {
                    reject(new StatusError(500, 'Internal server error',
                        'req.session undefined'));
                }
            } else {
                reject(new StatusError(401, 'Unauthorized',
                    'Please log in!'));
                return;
            }
        });
    }

    @Security('basicAuth')
    @Response('401', 'Unauthorized')
    @Response('500', 'Internal server error')
    @Post('send-push-notification')
    public async sendNotification(@Request() req: express.Request): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if(req.isAuthenticated()) {
                if(req.session) {
                    PushSubscriptionTable.getSubscriptionsForUser(req.session.passport.user).then((subscriptions: Array<PushSubscription>) => {
                        for(let subscription of subscriptions) {
                            webpush.sendNotification(subscription, 'Test-Nachricht').then(() => {
                                resolve({}); // TODO nicht hier!!! Wenn alle requests beendet sind!
                            }).catch((error) => {
                                reject(new StatusError(500, 'Error sending push notification', error));
                            });
                        }
                    }).catch((error) => {
                        reject(new StatusError(500, 'Failed to access db', error));
                    });
                } else {
                    reject(new StatusError(500, 'Internal server error',
                        'req.session undefined'));
                }
            } else {
                reject(new StatusError(401, 'Unauthorized',
                    'Please log in!'));
                return;
            }
        });
    }
}