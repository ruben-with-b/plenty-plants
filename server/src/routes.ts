/* tslint:disable */
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { UserApi } from './api/UserApi';
import { AuthApi } from './api/AuthApi';
import { WeatherApi } from './api/WeatherApi';
import { PlantApi } from './api/PlantApi';
import { NotificationApi } from './api/NotificationApi';
import { expressAuthentication } from './service/AuthService';
import * as express from 'express';

const models: TsoaRoute.Models = {
    "User": {
        "properties": {
            "username": { "dataType": "string", "required": true },
            "hashedPw": { "dataType": "string", "required": true },
        },
    },
    "TutorialProgress": {
        "properties": {
            "progress": { "dataType": "double", "required": true },
        },
    },
    "Condition": {
        "enums": ["CLEAR", "CLOUDY", "RAINY"],
    },
    "Weather": {
        "properties": {
            "condition": { "ref": "Condition", "required": true },
            "temperature": { "dataType": "double", "required": true },
            "precipitation": { "dataType": "double", "required": true },
        },
    },
    "TimePeriod": {
        "properties": {
            "firstMonth": { "dataType": "double", "required": true },
            "lastMonth": { "dataType": "double", "required": true },
        },
    },
    "Species": {
        "enums": ["Fruit", "Vegetables", "Herbs"],
    },
    "Difficulty": {
        "enums": ["Simple", "Moderate", "Serious"],
    },
    "PlantSummary": {
        "properties": {
            "name": { "dataType": "string", "required": true },
            "species": { "ref": "Species", "required": true },
            "sowingDistance": { "dataType": "double", "required": true },
            "sowingDepth": { "dataType": "double", "required": true },
            "soilCondition": { "dataType": "string", "required": true },
            "germinationTime": { "dataType": "double", "required": true },
            "numberOfHarvests": { "dataType": "string", "required": true },
            "difficulty": { "ref": "Difficulty", "required": true },
            "sowPeriodBegin": { "dataType": "double", "required": true },
            "harvestPeriodEnd": { "dataType": "double", "required": true },
        },
    },
    "TutorialStep": {
        "properties": {
            "heading": { "dataType": "string", "required": true },
            "body": { "dataType": "string", "required": true },
        },
    },
    "PushSubscription": {
        "properties": {
            "endpoint": { "dataType": "string", "required": true },
            "keys": { "dataType": "any", "required": true },
        },
    },
};
const validationService = new ValidationService(models);

export function RegisterRoutes(app: express.Express) {
    app.get('/api/v1/user',
        authenticateMiddleware([{ "basicAuth": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserApi();


            const promise = controller.getUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/user/my-plants',
        authenticateMiddleware([{ "basicAuth": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserApi();


            const promise = controller.getMyPlants.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/v1/user/my-plants/:plant',
        authenticateMiddleware([{ "basicAuth": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
                plant: { "in": "path", "name": "plant", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserApi();


            const promise = controller.addPlant.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/api/v1/user/my-plants/:plant',
        authenticateMiddleware([{ "basicAuth": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
                plant: { "in": "path", "name": "plant", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserApi();


            const promise = controller.removePlant.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/user/my-plants/:plant/tutorial-progress',
        authenticateMiddleware([{ "basicAuth": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
                plant: { "in": "path", "name": "plant", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserApi();


            const promise = controller.getTutorialProgress.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.put('/api/v1/user/my-plants/:plant/tutorial-progress',
        authenticateMiddleware([{ "basicAuth": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
                plant: { "in": "path", "name": "plant", "required": true, "dataType": "string" },
                tutorialProgress: { "in": "body", "name": "tutorialProgress", "required": true, "ref": "TutorialProgress" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserApi();


            const promise = controller.updateTutorialProgress.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/v1/auth/login',
        authenticateMiddleware([{ "basicAuth": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthApi();


            const promise = controller.login.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/auth/is-authenticated',
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthApi();


            const promise = controller.isAuthenticated.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/auth/logout',
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthApi();


            const promise = controller.logout.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/auth/signup',
        function(request: any, response: any, next: any) {
            const args = {
                username: { "in": "query", "name": "username", "required": true, "dataType": "string" },
                password: { "in": "query", "name": "password", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthApi();


            const promise = controller.signUp.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/weather',
        function(request: any, response: any, next: any) {
            const args = {
                latitude: { "in": "query", "name": "latitude", "required": true, "dataType": "string" },
                longitude: { "in": "query", "name": "longitude", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WeatherApi();


            const promise = controller.getWeather.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/plant/all',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlantApi();


            const promise = controller.getAvailablePlants.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/plant/:plant/sowPeriod',
        function(request: any, response: any, next: any) {
            const args = {
                plant: { "in": "path", "name": "plant", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlantApi();


            const promise = controller.getSowPeriod.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/plant/:plant/plantPeriod',
        function(request: any, response: any, next: any) {
            const args = {
                plant: { "in": "path", "name": "plant", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlantApi();


            const promise = controller.getPlantPeriod.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/plant/:plant/harvestPeriod',
        function(request: any, response: any, next: any) {
            const args = {
                plant: { "in": "path", "name": "plant", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlantApi();


            const promise = controller.getHarvestPeriod.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/plant/:plant/summary',
        function(request: any, response: any, next: any) {
            const args = {
                plant: { "in": "path", "name": "plant", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlantApi();


            const promise = controller.getSummary.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/plant/:plant/tutorial-steps',
        function(request: any, response: any, next: any) {
            const args = {
                plant: { "in": "path", "name": "plant", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlantApi();


            const promise = controller.getTutorialSteps.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/v1/notification/add',
        authenticateMiddleware([{ "basicAuth": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
                pushSubscription: { "in": "body", "name": "pushSubscription", "required": true, "ref": "PushSubscription" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NotificationApi();


            const promise = controller.addSubscription.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/v1/notification/send-frost-warning',
        authenticateMiddleware([{ "basicAuth": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NotificationApi();


            const promise = controller.sendFrostWarning.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return (request: any, _response: any, next: any) => {
            let responded = 0;
            let success = false;

            const succeed = function(user: any) {
                if (!success) {
                    success = true;
                    responded++;
                    request['user'] = user;
                    next();
                }
            }

            const fail = function(error: any) {
                responded++;
                if (responded == security.length && !success) {
                    error.status = 401;
                    next(error)
                }
            }

            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    let promises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        promises.push(expressAuthentication(request, name, secMethod[name]));
                    }

                    Promise.all(promises)
                        .then((users) => { succeed(users[0]); })
                        .catch(fail);
                } else {
                    for (const name in secMethod) {
                        expressAuthentication(request, name, secMethod[name])
                            .then(succeed)
                            .catch(fail);
                    }
                }
            }
        }
    }

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors);
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors);
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors);
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, name + '.');
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
