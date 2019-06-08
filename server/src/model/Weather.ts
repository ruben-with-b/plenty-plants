/**
 * Describes the overall weather condition.
 */
export enum Condition {
    /**
     * The sky is clear.
     */
    Clear = "CLEAR",
    /**
     * The sky is cloudy.
     */
    Cloudy = "CLOUDY",
    /**
     * It is raining.
     */
    Rainy = "RAINY"
}

/**
 * Represents the predicted weather status.
 */
export class Weather {

    /**
     * @param condition The overall condition.
     * @param temperature The temperature in celsius.
     * @param precipitation The precipitation in millimeters per square meter.
     */
    constructor(readonly condition: Condition, readonly temperature: number, readonly precipitation: number){ };
}