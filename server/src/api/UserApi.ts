import * as UserTable from '../database/UserTable';
import { Request, Response } from "express";

/**
 * Offers some functions to get user information.
 */
export {
    getUser
}

/**
 * Get the currently registered user.
 * @param req The request.
 * @param res The response.
 */
const getUser = (req: Request, res: Response) => {
    if(req.session) {
        UserTable.getUser(req.session.passport.user).then((user) => {
            res.send({user: user});
        }).catch(() => {
            let msg: String = "Failed to fetch user data.";
            console.log(msg);
            res.status(500).send(msg);
        });
    } else {
        console.log("Session broken (req.session === null)");
        res.status(500).send("Session broken");
    }
};