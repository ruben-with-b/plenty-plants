import * as CONFIG from "./config";
import {PushSubscription} from "web-push";

/**
 * Add a push subscription.
 * @param userEmail The email of the user.
 * @param pushSubscription The new push subscription.
 */
export function add(userEmail: string, pushSubscription: PushSubscription): Promise<any> {
    return new Promise<boolean>(function(resolve, reject) {
        CONFIG.pool.query(
            'INSERT INTO push_subscription_table (user_email, push_subscription)' +
            'VALUES (\'' + userEmail + '\', \''
                + JSON.stringify(pushSubscription) + '\')' , (error) => {
                if (error) {
                    console.log(error);
                    reject(error);
                    return
                }
                resolve();
            })
    });
}

/**
 * Remove a push subscription.
 * @param userEmail The email of the user.
 * @param pushSubscription The push subscription to be removed.
 */
export function remove(userEmail: string, pushSubscription: PushSubscription): Promise<any> {
    return new Promise<boolean>(function(resolve, reject) {
        CONFIG.pool.query(
            'DELETE FROM push_subscription_table WHERE user_email=\'' + userEmail
            + '\' AND push_subscription=\'' + JSON.stringify(pushSubscription) + '\'' , (error) => {
                if (error) {
                    console.log(error);
                    reject(error);
                    return
                }
                resolve();
            })
    });
}

/**
 * Get all push subscriptions of a specified user.
 * @param userEmail The email address of the user.
 * @return All push subscriptions of the user.
 */
export function getSubscriptionsForUser(userEmail: string): Promise<Array<PushSubscription>> {
    return new Promise<Array<PushSubscription>>(function(resolve, reject) {
        CONFIG.pool.query('SELECT push_subscription FROM push_subscription_table WHERE user_email = \'' + userEmail + '\'', (error, results) => {
            if (error) {
                reject(error);
                return;
            }

            let result: Array<PushSubscription> = new Array<PushSubscription>();

            results.rows.forEach((row: any) => {
                result.push(JSON.parse(row.push_subscription));
            });

            resolve(result);
        });
    });
}