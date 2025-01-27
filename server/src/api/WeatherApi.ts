import {Controller, Get, Query, Response, Route, Tags} from "tsoa";
import {Weather} from "../model/Weather";
import * as WeatherService from "../service/WeatherService"

/**
 * Offers some weather information.
 */
@Tags('Weather')
@Route('weather')
export class WeatherApi extends Controller {

    /**
     * @summary Get the actual weather for the specified location.
     * @param {string} latitude The coordinates (latitude) of the location for which the weather should be determined.
     * @param {string} longitude The coordinates (longitude) of the location for which the weather should be determined.
     */
    @Response('404', 'Invalid coordinates')
    @Get()
    public async getWeather(@Query() latitude: string, @Query() longitude: string): Promise<Weather> {
        return WeatherService.getWeather(latitude, longitude);
    }
}