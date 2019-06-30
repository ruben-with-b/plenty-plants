import * as CONFIG from "./config";
import {StatusError} from "../model/StatusError";
import {TutorialStep} from "../model/TutorialStep";

/**
 * @summary Get the tutorial steps for a plant.
 * @param {string} plant The plant for which the tutorial steps should be fetched.
 */
export function getTutorialSteps(plant: string): Promise<TutorialStep[]> {
    return new Promise<TutorialStep[]>((resolve, reject) => {
        CONFIG.pool.query('SELECT ' +
            'heading, ' +
            'body ' +
            'FROM plant_tutorial_table ' +
            'WHERE plant_name = \'' + plant + '\' ' +
            'ORDER BY step_number ASC ', (error, results) => {
            if (error) {
                reject(new StatusError(500, "Error accessing the DB", error.message));
                return;
            }

            console.log("got here");

            let tutorialSteps: TutorialStep[] = [];

            results.rows.forEach((row: any) => {
                tutorialSteps.push(new TutorialStep(row.heading, row.body));
            });

            resolve(tutorialSteps);
        });
    });
}