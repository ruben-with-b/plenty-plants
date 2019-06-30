import * as CONFIG from "./config";
import {PushSubscription} from "web-push";

/**
 * Add a push subscription.
 * @param username The username of the affected user.
 * @param pushSubscription The new push subscription.
 */
export function add(username: string, pushSubscription: PushSubscription): Promise<any> {
    return new Promise<boolean>(function(resolve, reject) {
        CONFIG.pool.query(
            'INSERT INTO push_subscription_table (username, push_subscription)' +
            'VALUES (\'' + username + '\', \''
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
 * @param username The username of the affected user.
 * @param pushSubscription The push subscription to be removed.
 */
export function remove(username: string, pushSubscription: PushSubscription): Promise<any> {
    return new Promise<boolean>(function(resolve, reject) {
        CONFIG.pool.query(
            'DELETE FROM push_subscription_table WHERE username=\'' + username
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
 * @param username The username of the affected user.
 * @return All push subscriptions of the user.
 */
export function getSubscriptionsForUser(username: string): Promise<Array<PushSubscription>> {
    return new Promise<Array<PushSubscription>>(function(resolve, reject) {
        CONFIG.pool.query('SELECT push_subscription FROM push_subscription_table WHERE username = \'' + username + '\'', (error, results) => {
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