import * as CONFIG from "./config";
import {User} from "../model/User";

/**
 * Some functions to access the user table.
 */
export {
    getUser, addUser
}

/**
 * Get the user specified by username.
 * @param username The username of the actual user.
 */
function getUser(username: string): Promise<User> {
    return new Promise<User>(function(resolve, reject) {
        CONFIG.pool.query('SELECT hashed_pw FROM user_table WHERE username = \'' + username + '\'', (error, results) => {
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

            resolve(new User(username, results.rows[0].hashed_pw));
        });
    });
}

/**
 * Add a new user.
 * @param username The username of the actual user.
 * @param hashedPw The hashed password of the new user.
 */
function addUser(username: String, hashedPw: String): Promise<boolean> {
    return new Promise<boolean>(function(resolve, reject) {
        CONFIG.pool.query(
            'INSERT INTO user_table (username, hashed_pw)' +
            'VALUES (\'' + username + '\', \'' + hashedPw + '\')' , (error) => {
                if (error) {
                    reject(error);
                    return
                }
                resolve(true);
            })
    });
}