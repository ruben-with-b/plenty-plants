/**
 * Some basic information about a plant. Currently this information is
 * shown in the "Katalog"
 */
export class PlantSummary {

    /**
     * @param name              The name of the plant.
     * @param sowingDistance    The sowing distance between the individual plants. (unit: cm)
     * @param sowingDepth       The sowing depth preferred by the plant. (unit: cm)
     * @param soilCondition     The preferred soil condition.
     * @param germinationTime   The germination time of the plant. (unit: days)
     * @param numberOfHarvests  The number of harvests. (unit: string)
     * @param difficulty        The difficulty to grow this plant. (A number
     *                          from the set [1, 3]. 3 is the highest level of difficulty.)
     * @param sowPeriodBegin    The begin of the sow period. (unit: month)
     * @param harvestPeriodEnd  The end of the harvest period. (unit: month)
     */
    constructor(readonly name: string,
                readonly sowingDistance: number, readonly sowingDepth: number,
                readonly soilCondition: string, germinationTime: number,
                readonly numberOfHarvests: string, readonly difficulty: number,
                readonly sowPeriodBegin: number, readonly harvestPeriodEnd: number){ };
}