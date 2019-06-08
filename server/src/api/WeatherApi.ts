import {Controller, Get, Query, Route} from "tsoa";
import {Condition, Weather} from "../model/Weather";

/**
 * Offers some weather information.
 */
@Route('weather')
export class WeatherApi extends Controller {

    /**
     * @summary Get the weather-forecast (next day) for the specified location.
     * @param {string} latitude The coordinates (latitude) of the location for which the weather should be determined.
     * @param {string} longitude The coordinates (longitude) of the location for which the weather should be determined.
     */
    @Get()
    public async getWeather(@Query() latitude: string, @Query() longitude: string): Promise<Weather> {
        return Promise.resolve(new Weather(Condition.Clear, 22, 0)); // TODO Fetch real data.
    }
}