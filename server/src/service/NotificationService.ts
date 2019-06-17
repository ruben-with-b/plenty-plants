import * as PushSubscriptionTable from "../database/PushSubscriptionTable";
import * as webpush from 'web-push'
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
 * @param userEmail The recipient.
 * @param message The message to be transmitted.
 */
export function sendNotification(userEmail: string, message: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        PushSubscriptionTable.getSubscriptionsForUser(userEmail).then((subscriptions: Array<PushSubscription>) => {
            for(let subscription of subscriptions) {
                webpush.sendNotification(subscription, message).catch((error) => {
                    console.log('Error sending push notification!\r\n' +  error);
                });
            }
            resolve({});
        }).catch((error) => {
            reject(error);
        });
    });
}