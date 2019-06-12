import * as CONFIG from "./config";
import {TimePeriod} from "../model/TimePeriod";
import {StatusError} from "../api/StatusError";


/**
 * @summary Get the sow period for a plant.
 * @param {string} plant The plant for which the sow period should be determined.
 */
export function getSowPeriod(plant: string): Promise<TimePeriod> {
    return new Promise<TimePeriod>((resolve, reject) => {
        CONFIG.pool.query('SELECT SowPeriod_Begin, SowPeriod_End FROM plant_table WHERE plant_name = \'' + plant + '\'', (error, results) => {
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
            resolve(new TimePeriod(results.rows[0].sowperiod_begin, results.rows[0].sowperiod_end));
        });
    });
}

/**
 * @summary Get the plant period for a plant.
 * @param {string} plant The plant for which the plant period should be determined.
 */
export function getPlantPeriod(plant: string): Promise<TimePeriod> {
    return new Promise<TimePeriod>((resolve, reject) => {
        CONFIG.pool.query('SELECT PlantPeriod_Begin, PlantPeriod_End FROM plant_table WHERE plant_name = \'' + plant + '\'', (error, results) => {
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
            resolve(new TimePeriod(results.rows[0].plantperiod_begin, results.rows[0].plantperiod_end));
        });
    });
}

/**
 * @summary Get the harvest period for a plant.
 * @param {string} plant The plant for which the harvest period should be determined.
 */
export function getHarvestPeriod(plant: string): Promise<TimePeriod> {
    return new Promise<TimePeriod>((resolve, reject) => {
        CONFIG.pool.query('SELECT HarvestPeriod_Begin, HarvestPeriod_End FROM plant_table WHERE plant_name = \'' + plant + '\'', (error, results) => {
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
            resolve(new TimePeriod(results.rows[0].harvestperiod_begin, results.rows[0].harvestperiod_end));
        });
    });
}