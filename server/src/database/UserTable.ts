import * as CONFIG from "./config";
import {User} from "../model/User";

function getUser(email: String): Promise<User> {
    return new Promise<User>(function(resolve, reject) {
        CONFIG.pool.query('SELECT hashedPw FROM user_table WHERE email = \'' + email + '\'', (error, results) => {
            if (error) {
                reject(error);
                return;
            }

            if(results.rows.length > 1) {
                reject('More than one user was returned!');
                return;
            }

            if(results.rows.length == 0) {
                resolve(undefined);
                return;
            }

            resolve(new User(email, results.rows[0].hashedpw));
        });
    });
}

function addUser(email: String, hashedPw: String): Promise<boolean> {
    return new Promise<boolean>(function(resolve, reject) {
        CONFIG.pool.query(
            'INSERT INTO user_table (email, hashedPw)' +
            'VALUES (\'' + email + '\', \'' + hashedPw + '\')' , (error, results) => {
                if (error) {
                    reject(error);
                    return
                }
                resolve(true);
            })
    });
}


export {
    getUser, addUser
}