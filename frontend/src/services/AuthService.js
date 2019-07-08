import axios from "axios"

export function isUserAuthenticated() {
    return new Promise((resolve, reject) => {
        axios.get("/api/v1/auth/is-authenticated")
            .then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
        });
    });
}

export function logout() {
    return new Promise((resolve, reject) => {
        axios.get("/api/v1/auth/logout").then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
}
