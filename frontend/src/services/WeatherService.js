import axios from "axios"
import Console from "console"

/**
 * Get the current location.
 * @return {Promise<Position>} The current location.
 */
function getPosition() {
    return new Promise((resolve, reject) => {
        if(!navigator.geolocation) {
            reject('Geolocation wird vom Browser nicht unterstüzt.');
        }

        navigator.geolocation.getCurrentPosition((position) => {
            resolve(position);
        }, (error) => {
            reject(error);
        });
    });
}

export function getWeather() {
    return new Promise((resolve, reject) => {
        getPosition().then((position) => {
            return axios.get("/api/v1/weather?latitude=" + position.coords.latitude
                + "&longitude=" + position.coords.longitude);
        }).then((response) => {
            Console.log(response.data);
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

