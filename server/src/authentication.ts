import * as express from 'express';

export function expressAuthentication(req: express.Request, name: string, scopes?: string[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        if(req.isAuthenticated()) {
            resolve({});
        } else {
            reject({});
        }
    });
}