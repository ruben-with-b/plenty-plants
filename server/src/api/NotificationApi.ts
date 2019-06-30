import * as PushSubscriptionTable from '../database/PushSubscriptionTable';
import * as express from "express";
import * as NotificationService from '../service/NotificationService';
import {Controller, Route, Request, Security, Response, Post, Body, Tags} from 'tsoa';
import {StatusError} from "../model/StatusError";
import {PushSubscription} from "web-push";

/**
 * Some actions concerning notification-management.
 */
@Tags('Notifications')
@Route('notification')
export class NotificationApi extends Controller {

    /**
     * @summary Add a notification-subscription.
     * @param {express.Request} req The incoming request.
     * @param {PushSubscription} pushSubscription The push subscription.
     */
    @Security('basicAuth')
    @Response('201')
    @Response('401', 'Unauthorized')
    @Response('500', 'Internal server error')
    @Post('add')
    public async addSubscription(@Request() req: express.Request,
                                 @Body() pushSubscription: PushSubscription): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // check if the user is authenticated
            if (!req.isAuthenticated()) {
                reject(new StatusError(401, 'Unauthorized',
                    'Please log in!'));
                return;
            }
            // check if there is a session
            if (!req.session) {
                reject(new StatusError(500, 'Internal server error',
                    'Session not available.'));
                return;
            }
            // Save subscription to DB
            PushSubscriptionTable.add(req.session.passport.user, pushSubscription).then(() => {
                resolve({});
            }).catch((error) => {
                reject(new StatusError(500, 'Failed to access db', error));
            })
        });
    }

    /**
     * @summary Send a frost-warning to the current user.
     * @param {express.Request} req The incoming request.
     */
    @Security('basicAuth')
    @Response('204')
    @Response('401', 'Unauthorized')
    @Response('500', 'Internal server error')
    @Post('send-frost-warning')
    public async sendFrostWarning(@Request() req: express.Request): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // check if the user is authenticated
            if (!req.isAuthenticated()) {
                reject(new StatusError(401, 'Unauthorized',
                    'Please log in!'));
                return;
            }
            // check if there is a session
            if (!req.session) {
                reject(new StatusError(500, 'Internal server error',
                    'req.session undefined'));
                return;
            }

            NotificationService.sendNotification(req.session.passport.user,
                "Frostwarnung", "Achtung, diese Nacht gibt es Frost!").then(() => {
                resolve({});
            }).catch((error) => {
                reject(new StatusError(500, 'Internal error', error));
            });
        });
    }
}