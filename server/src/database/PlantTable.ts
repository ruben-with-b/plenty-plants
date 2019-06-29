import * as CONFIG from "./config";
import {TimePeriod} from "../model/TimePeriod";
import {StatusError} from "../api/StatusError";


/**
 * @summary Get all available plants.
 */
export function getAvailablePlants(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        CONFIG.pool.query('SELECT plant_name FROM plant_table', (error, results) => {
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
 * @summary Get the sow period for a plant.
 * @param {string} plant The plant for which the sow period should be determined.
 */
export function getSowPeriod(plant: string): Promise<TimePeriod> {
    return new Promise<TimePeriod>((resolve, reject) => {
        CONFIG.pool.query('SELECT sow_period_begin, sow_period_end FROM plant_table WHERE plant_name = \'' + plant + '\'', (error, results) => {
            if (error) {
                reject(new StatusError(500, "Error accessing the DB", error.message));
                return;
            }

            if (results.rows.length > 1) {
                reject(new StatusError(500, "Error accessing the DB", "More than one plant was returned!"));
                return;
            }

            if (results.rows.length == 0) {
                reject(new StatusError(404, "Not found", "There is no plant called '" + plant + "'"));
                return;
            }
            resolve(new TimePeriod(results.rows[0].sow_period_begin, results.rows[0].sow_period_end));
        });
    });
}

/**
 * @summary Get the plant period for a plant.
 * @param {string} plant The plant for which the plant period should be determined.
 */
export function getPlantPeriod(plant: string): Promise<TimePeriod> {
    return new Promise<TimePeriod>((resolve, reject) => {
        CONFIG.pool.query('SELECT plant_period_begin, plant_period_end FROM plant_table WHERE plant_name = \'' + plant + '\'', (error, results) => {
            if (error) {
                reject(new StatusError(500, "Error accessing the DB", error.message));
                return;
            }

            if (results.rows.length > 1) {
                reject(new StatusError(500, "Error accessing the DB", "More than one plant was returned!"));
                return;
            }

            if (results.rows.length == 0) {
                reject(new StatusError(404, "Not found", "There is no plant called '" + plant + "'"));
                return;
            }
            resolve(new TimePeriod(results.rows[0].plant_period_begin, results.rows[0].plant_period_end));
        });
    });
}

/**
 * @summary Get the harvest period for a plant.
 * @param {string} plant The plant for which the harvest period should be determined.
 */
export function getHarvestPeriod(plant: string): Promise<TimePeriod> {
    return new Promise<TimePeriod>((resolve, reject) => {
        CONFIG.pool.query('SELECT harvest_period_begin, harvest_period_end FROM plant_table WHERE plant_name = \'' + plant + '\'', (error, results) => {
            if (error) {
                reject(new StatusError(500, "Error accessing the DB", error.message));
                return;
            }

            if (results.rows.length > 1) {
                reject(new StatusError(500, "Error accessing the DB", "More than one plant was returned!"));
                return;
            }

            if (results.rows.length == 0) {
                reject(new StatusError(404, "Not found", "There is no plant called '" + plant + "'"));
                return;
            }
            resolve(new TimePeriod(results.rows[0].harvest_period_begin, results.rows[0].harvest_period_end));
        });
    });
}