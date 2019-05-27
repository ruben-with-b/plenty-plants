import * as UserTable from '../database/UserTable'
import {User} from '../model/User'
import bcrypt = require('bcrypt')


const saltRounds = 10;

export {
    signUp
}

const signUp = (request: any, response: any) => {
    let email: String = request.query.email;
    let pw: String = request.query.pw;

    UserTable.getUser(email).then((user: User) => {
        if (user === undefined) {
            bcrypt.hash(pw, saltRounds).then((hashedPw: String) => {
                UserTable.addUser(email, hashedPw).then(() => {
                    response.status(200).send();
                }).catch(error => {
                    console.log(error);
                    response.status(500).send('Creating new user failed!');
                });
            }).catch(error => {
                console.log(error);
                response.status(500).send('Password encryption failed!');
            });
        } else {
            let msg: String = 'A user with the email \'' + email + '\' already exists!';
            console.log(msg);
            response.status(409).send(msg);
        }
    }).catch(error => {
        console.log(error);
        response.status(500).send('DB access failed!');
    });
};


// bcrypt.hash(myPlaintextPassword, saltRounds).then((hashedPw: String) => {});