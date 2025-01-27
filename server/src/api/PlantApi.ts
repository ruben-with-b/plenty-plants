import {Controller, Get, Response, Route, Tags} from "tsoa";
import {TimePeriod} from "../model/TimePeriod";
import * as PlantTable from "../database/PlantTable"
import * as PlantTutorialTable from "../database/PlantTutorialTable"
import {PlantSummary} from "../model/PlantSummary";
import {TutorialStep} from "../model/TutorialStep";

/**
 * Offers some information about plants.
 */
@Tags('Plants')
@Route('plant')
export class PlantApi extends Controller {

    /**
     * @summary Obtaining all available plants.
     */
    @Get('all')
    public async getAvailablePlants(): Promise<string[]> {
        return PlantTable.getAvailablePlants();
    }

    /**
     * @summary Obtaining the sowing period for a plant
     * @param {string} plant The plant for which the sow period should be determined.
     */
    @Response('404', 'The specified plant does not exist')
    @Get('{plant}/sowPeriod')
    public async getSowPeriod(plant: string): Promise<TimePeriod> {
        return PlantTable.getSowPeriod(plant);
    }

    /**
     * @summary Obtaining the planting period for a plant
     * @param {string} plant The plant for which the plant period should be determined.
     */
    @Response('404', 'The specified plant does not exist')
    @Get('{plant}/plantPeriod')
    public async getPlantPeriod(plant: string): Promise<TimePeriod> {
        return PlantTable.getPlantPeriod(plant);
    }

    /**
     * @summary Obtaining the harvest period for a plant
     * @param {string} plant The plant for which the harvest period should be determined.
     */
    @Response('404', 'The specified plant does not exist')
    @Get('{plant}/harvestPeriod')
    public async getHarvestPeriod(plant: string): Promise<TimePeriod> {
        return PlantTable.getHarvestPeriod(plant);
    }

    /**
     * @summary Obtaining the summary for a plant.
     * @param {string} plant The plant for which the summary should be fetched.
     */
    @Response('404', 'The specified plant does not exist')
    @Get('{plant}/summary')
    public async getSummary(plant: string): Promise<PlantSummary> {
        return PlantTable.getPlantSummary(plant);
    }

    /**
     * @summary Obtaining the tutorial steps for a plant.
     * @param {string} plant The plant for which the steps should be fetched.
     */
    @Get('{plant}/tutorial-steps')
    public async getTutorialSteps(plant: string): Promise<TutorialStep[]> {
        return PlantTutorialTable.getTutorialSteps(plant);
    }
}