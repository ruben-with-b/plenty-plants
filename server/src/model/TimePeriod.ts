/**
 * Represents a period of time (on a monthly basis).
 * 1 == january
 * 2 == february
 * 3 == march
 * ...
 * 12 == december
 */
export class TimePeriod {

    /**
     * @param firstMonth The first month of the period.
     * @param lastMonth The last month of the period.
     */
    constructor(readonly firstMonth: number, readonly lastMonth: number){ };
}