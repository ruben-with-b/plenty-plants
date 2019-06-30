import * as CONFIG from "./config";
import {StatusError} from "../api/StatusError";

/**
 * @summary Get the favourite plants of a user.
 * @param userEmail The email-address of the user whose plants should be fetched.
 */
export function getPlants(userEmail: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        CONFIG.pool.query('SELECT plant_name FROM user_garden_table ' +
            'WHERE user_email = \'' + userEmail + '\'', (error, results) => {
            if (error) {
                reject(new StatusError(500, "Error accessing the DB", error.message));
                return;
            }

            let plants: string[] = [];

            results.rows.forEach((row: any) => {
                plants.push(row.plant_name);
            });

            resolve(plants);
        });
    });
}

/**
 * @summary Add a plant to the users favourites.
 * @param userEmail The email-address of the user.
 * @param plantName The name of the plant to be added.
 */
export function addPlant(userEmail: string, plantName: string): Promise<any> {
    return new Promise<string[]>((resolve, reject) => {
        CONFIG.pool.query('INSERT INTO user_garden_table (user_email, plant_name) ' +
            'values (\'' + userEmail + '\', \'' + plantName + '\');', (error) => {
            if (error) {
                reject(new StatusError(500, "Error accessing the DB", error.message));
                return;
            }

            resolve();
        });
    });
}

/**
 * @summary Remove a plant from the users favourites.
 * @param userEmail The email-address of the user.
 * @param plantName The name of the plant to be removed.
 */
export function removePlant(userEmail: string, plantName: string): Promise<any> {
    return new Promise<string[]>((resolve, reject) => {
        CONFIG.pool.query('DELETE FROM user_garden_table ' +
            'WHERE user_email=\'' + userEmail + '\' and plant_name=\'' + plantName + '\';', (error) => {
            if (error) {
                reject(new StatusError(500, "Error accessing the DB", error.message));
                return;
            }

            resolve();
        });
    });
}