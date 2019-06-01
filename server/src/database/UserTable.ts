import * as CONFIG from "./config";
import {User} from "../model/User";

/**
 * Some functions to access the user table.
 */
export {
    getUser, addUser
}

/**
 * Get the user specified by email.
 * @param email The email address of the user.
 */
function getUser(email: string): Promise<User> {
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

/**
 * Add a new user.
 * @param email The email address of the new user.
 * @param hashedPw The hashed password of the new user.
 */
function addUser(email: String, hashedPw: String): Promise<boolean> {
    return new Promise<boolean>(function(resolve, reject) {
        CONFIG.pool.query(
            'INSERT INTO user_table (email, hashedPw)' +
            'VALUES (\'' + email + '\', \'' + hashedPw + '\')' , (error) => {
                if (error) {
                    reject(error);
                    return
                }
                resolve(true);
            })
    });
}