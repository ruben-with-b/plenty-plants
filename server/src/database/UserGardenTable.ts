import * as CONFIG from "./config";
import {StatusError} from "../model/StatusError";

/**
 * @summary Get the favourite plants of a user.
 * @param username The username of the user whose plants should be fetched.
 */
export function getPlants(username: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        CONFIG.pool.query('SELECT plant_name FROM user_garden_table ' +
            'WHERE username = \'' + username + '\'', (error, results) => {
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
 * @param username The username of the actual user.
 * @param plantName The name of the plant to be added.
 */
export function addPlant(username: string, plantName: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        CONFIG.pool.query('INSERT INTO user_garden_table (username, plant_name, tutorial_progress) ' +
            'values (\'' + username + '\', \'' + plantName + '\', \'0\');', (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}

/**
 * @summary Remove a plant from the users favourites.
 * @param username The username of the actual user.
 * @param plantName The name of the plant to be removed.
 */
export function removePlant(username: string, plantName: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        CONFIG.pool.query('DELETE FROM user_garden_table ' +
            'WHERE username=\'' + username + '\' and plant_name=\'' + plantName + '\';', (error) => {
            if (error) {
                reject(new StatusError(500, "Error accessing the DB", error.message));
                return;
            }

            resolve();
        });
    });
}

/**
 * @summary Get the tutorial-progress for a plant.
 * @param username The username of the actual user.
 * @param plantName The name of the plant.
 */
export function getTutorialProgress(username: string, plantName: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        CONFIG.pool.query(
            'SELECT tutorial_progress ' +
            'FROM user_garden_table ' +
            'WHERE username=\'' + username + '\' and plant_name=\'' + plantName + '\';', (error, results) => {
            if (error) {
                reject(new StatusError(500, "Error accessing the DB", error.message));
                return;
            }

            if (results.rows.length > 1) {
                reject(new StatusError(500, "Error accessing the DB", "More than one entry was returned!"));
                return;
            }

            if (results.rows.length == 0) {
                reject(new StatusError(404, "Not found",
                    "There is no plant called '" + plantName + "' in your favourites."));
                return;
            }
            resolve(results.rows[0].tutorial_progress);
        });
    });
}

/**
 * @summary Update the tutorial-progress of a plant.
 * @param username The username of the actual user.
 * @param plantName The name of the plant to be updated.
 * @param tutorialProgress The new tutorial-progress.
 */
export function updateTutorialProgress(username: string, plantName: string, tutorialProgress: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        CONFIG.pool.query('UPDATE user_garden_table ' +
            'SET tutorial_progress=\'' + tutorialProgress + '\'' +
            'WHERE username=\'' + username + '\' and plant_name=\'' + plantName + '\';', (error) => {
            if (error) {
                reject(new StatusError(500, "Error accessing the DB", error.message));
                return;
            }

            resolve();
        });
    });
}