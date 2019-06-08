import {Condition, Weather} from "../model/Weather";
import * as http from "http";
import {StatusError} from "../api/StatusError";

/**
 * Get the weather at the specified location.
 * @param latitude {string} Latitude-coordinates of the location.
 * @param longitude {string} Longitude-coordinates of the location.
 * @return {Weather} The weather at the specified location.
 */
export function getWeather(latitude: string, longitude: string): Promise<Weather> {
    return new Promise<Weather>((resolve, reject) => {
        let apiResponse = callApi(latitude, longitude);
        apiResponse.then((apiResponse: any) => {
            if (apiResponse.cod != 200) {
                reject(new StatusError(apiResponse.cod, "Error accessing weather API", apiResponse.message));
            } else {
                console.log(apiResponse);
                let condition: Condition;
                if (apiResponse && apiResponse.weather && apiResponse.weather[0] && apiResponse.weather[0].id) {
                    condition = getCondition(apiResponse.weather[0].id);
                } else {
                    reject(new StatusError(500, "Internal error", "Unexpected response from weather-API!"));
                    return;
                }

                let temperature: number = 22;
                if (apiResponse.main.temp) {
                    temperature = apiResponse.main.temp;
                    temperature = Math.round(temperature);
                }

                let precipitation: number = 0;
                if (apiResponse.rain && apiResponse.rain['3h']) {
                    precipitation = apiResponse.rain['3h'];
                }

                resolve(new Weather(condition, temperature, precipitation));
            }
        }).catch((error) => {
            reject(new StatusError(500, "Internal error", error));
        });
    })
}

/**
 * Request weather api.
 * @param {string} latitude The coordinates of the location to be requested.
 * @param {string} longitude The coordinates of the location to be requested.
 * @return The json object returned by the weather api.
 */
function callApi(latitude: string, longitude: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        if (!process.env.WEATHER_API_KEY) {
            reject("Environment-Variable \'WEATHER_API_KEY\' undefined!");
            return;
        }

        http.get({
            host: 'api.openweathermap.org',
            path: '/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=' + process.env.WEATHER_API_KEY,
        }, (response: http.IncomingMessage) => {
            let body: string = '';
            response.on('data', function (d: string) {
                body += d;
            });
            response.on('end', function () {
                resolve(JSON.parse(body));
            });
        });
    });
}

/**
 * Resolve weather id.
 * @param {number} weatherId The Weather-ID to be resolved.
 * @return {Condition} Condition matching the weather-ID.
 */
function getCondition(weatherId: number): Condition {
    let condition: Condition;

    if (weatherId < 300) {
        condition = Condition.Rainy;
    } else if (weatherId == 800) {
        condition = Condition.Clear;
    } else {
        condition = Condition.Cloudy;
    }

    return condition;
}