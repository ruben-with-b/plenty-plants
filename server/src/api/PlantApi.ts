import {Controller, Get, Route} from "tsoa";
import {TimePeriod} from "../model/TimePeriod";

/**
 * Offers some information about plants.
 */
@Route('plant')
export class PlantApi extends Controller {

    /**
     * @summary Get the sow period for a plant.
     * @param {string} plant The plant for which the sow period should be determined.
     */
    @Get('{plant}/sowPeriod')
    public async getSowPeriod(plant: string): Promise<TimePeriod> {
        return Promise.resolve(new TimePeriod(0, 4)); // TODO Fetch real data.
    }

    /**
     * @summary Get the plant period for a plant.
     * @param {string} plant The plant for which the plant period should be determined.
     */
    @Get('{plant}/plantPeriod')
    public async getPlantPeriod(plant: string): Promise<TimePeriod> {
        return Promise.resolve(new TimePeriod(5, 8)); // TODO Fetch real data.
    }

    /**
     * @summary Get the harvest period for a plant.
     * @param {string} plant The plant for which the harvest period should be determined.
     */
    @Get('{plant}/harvestPeriod')
    public async getHarvestPeriod(plant: string): Promise<TimePeriod> {
        return Promise.resolve(new TimePeriod(9, 12)); // TODO Fetch real data.
    }
}