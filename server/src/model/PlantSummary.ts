/**
 * A plants species.
 */
export enum Species {
    /** The plant is a fruit. */
    Fruit = "Fruit",
    /** The plant is a vegetable. */
    Vegetables = "Vegetables",
    /** The plant is a herb. */
    Herbs = "Herbs"
}

/**
 * The difficulty to grow a plant.
 */
export enum Difficulty {
    /** The plant is simple to grow. */
    Simple = "Simple",
    /** The plant is moderate difficult to grow. */
    Moderate = "Moderate",
    /** The plant is serious difficult to grow. */
    Serious = "Serious"
}

/**
 * Some basic information about a plant. Currently this information is
 * shown in the "Katalog"
 */
export class PlantSummary {

    /**
     * @param name              The name of the plant.
     * @param species           The species of the plant.
     * @param sowingDistance    The sowing distance between the individual plants. (unit: cm)
     * @param sowingDepth       The sowing depth preferred by the plant. (unit: cm)
     * @param soilCondition     The preferred soil condition.
     * @param germinationTime   The germination time of the plant. (unit: days)
     * @param numberOfHarvests  The number of harvests. (unit: string)
     * @param difficulty        The difficulty to grow this plant.
     * @param sowPeriodBegin    The begin of the sow period. (unit: month)
     * @param harvestPeriodEnd  The end of the harvest period. (unit: month)
     * @param location          The plants preferred location.
     */
    constructor(readonly name: string, readonly species: Species,
                readonly sowingDistance: number, readonly sowingDepth: number,
                readonly soilCondition: string, readonly germinationTime: number,
                readonly numberOfHarvests: string, readonly difficulty: Difficulty,
                readonly sowPeriodBegin: number, readonly harvestPeriodEnd: number,
                readonly location: string){ };
}