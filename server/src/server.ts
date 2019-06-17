import express from 'express';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import * as AuthService from './service/AuthService'
import { RegisterRoutes } from './routes';
import './api/UserApi';
import './api/AuthApi';
import './api/WeatherApi';
import './api/PlantApi';
import './api/NotificationApi';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./dist/swagger.yaml');

const app: express.Express = express();
dotenv.config();
let port: string;
let distFolder: string;
let devModeEnabled: boolean;

// Fetch some environment variables
if (process.env.PORT_BE) {
    port = process.env.PORT_BE;
} else {
    throw new Error("Environment variable PORT_SERVER undefined!");
}
if (process.env.DIST_FOLDER) {
    distFolder = process.env.DIST_FOLDER;
} else {
    throw new Error("Environment variable DIST_FOLDER undefined!");
}
if (process.env.DEV_MODE_ENABLED) {
    devModeEnabled = (process.env.DEV_MODE_ENABLED === 'true');
} else {
    throw new Error("Environment variable DEV_MODE_ENABLED undefined!");
}

// Deploy frontend?
if (!devModeEnabled) {
    app.use(express.static(__dirname + distFolder));
}

// Add libs for authentication
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Configure authentication
app.use(passport.initialize());
app.use(passport.session());
AuthService.initAuthentication();

RegisterRoutes(app);

// It's important that this come after the main routes are registered
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const status = err.status || 500;
    const body: any = {
        fields: err.fields || undefined,
        message: err.message || 'An error occurred during the request.',
        name: err.name,
        status,
    };
    res.status(status).json(body);
});


// Deploy api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port);
console.log('Server started! see: http://localhost:' + port);