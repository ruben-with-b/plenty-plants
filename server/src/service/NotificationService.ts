import * as PushSubscriptionTable from "../database/PushSubscriptionTable";
import * as webpush from 'web-push'
import {Notification} from '../model/Notification';
import {PushSubscription} from "web-push";
import dotenv from "dotenv";

// set VAPID keys
dotenv.config();
if(!process.env.VAPID_KEY_PUBLIC || !process.env.VAPID_KEY_PRIVATE) {
    throw new Error('vapid-keys undefined!')
}
webpush.setVapidDetails(
    'mailto:myuserid@email.com',
    process.env.VAPID_KEY_PUBLIC,
    process.env.VAPID_KEY_PRIVATE
);

/**
 * Allows sending a notification.
 * @param username The recipient.
 * @param title The title of the notification.
 * @param message The message of the notification.
 */
export function sendNotification(username: string, title: string, message: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let notification: Notification = new Notification(title, message);
        PushSubscriptionTable.getSubscriptionsForUser(username).then((subscriptions: Array<PushSubscription>) => {
            for(let subscription of subscriptions) {
                webpush.sendNotification(subscription, JSON.stringify(notification)).catch((error) => {
                    // remove the subscription, if it is outdated
                    if(error.statusCode == 410) {
                        removeSubscription(username, subscription).catch((error) => {
                            console.log(error);
                        });
                    }
                });
            }
            resolve({});
        }).catch((error) => {
            reject(error);
        });
    });
}

/**
 * Removes the given subscription from the db.
 * @param username The user whose subscription should be deleted.
 * @param subscription The subscription to be deleted.
 */
function removeSubscription(username: string, subscription: PushSubscription): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        PushSubscriptionTable.remove(username, subscription).then(() => {
            resolve({});
        }).catch((error) => {
            reject(error);
        });
    });
}