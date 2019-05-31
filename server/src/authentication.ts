import * as express from 'express';
import passport from 'passport';
import {StatusError} from "./api/StatusError";
import {rejects} from "assert";

export function expressAuthentication(req: express.Request, name: string, scopes?: string[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        if(req.isAuthenticated) {
            resolve();
        } else {
            reject();
        }
    });
}