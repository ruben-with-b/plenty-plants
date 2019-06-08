import {Controller, Get, Response, Route} from "tsoa";
import {TimePeriod} from "../model/TimePeriod";
import * as PlantTable from "../database/PlantTable"

/**
 * Offers some information about plants.
 */
@Route('plant')
export class PlantApi extends Controller {

    /**
     * @summary Get the sow period for a plant.
     * @param {string} plant The plant for which the sow period should be determined.
     */
    @Response('404', 'The specified plant does not exist')
    @Get('{plant}/sowPeriod')
    public async getSowPeriod(plant: string): Promise<TimePeriod> {
        return PlantTable.getSowPeriod(plant);
    }

    /**
     * @summary Get the plant period for a plant.
     * @param {string} plant The plant for which the plant period should be determined.
     */
    @Response('404', 'The specified plant does not exist')
    @Get('{plant}/plantPeriod')
    public async getPlantPeriod(plant: string): Promise<TimePeriod> {
        return PlantTable.getPlantPeriod(plant);
    }

    /**
     * @summary Get the harvest period for a plant.
     * @param {string} plant The plant for which the harvest period should be determined.
     */
    @Response('404', 'The specified plant does not exist')
    @Get('{plant}/harvestPeriod')
    public async getHarvestPeriod(plant: string): Promise<TimePeriod> {
        return PlantTable.getHarvestPeriod(plant);
    }
}