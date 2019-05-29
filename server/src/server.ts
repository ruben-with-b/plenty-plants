import express = require('express');
import dotenv = require('dotenv');
import cookieSession = require('cookie-session');
import bodyParser = require('body-parser');
import passport = require('passport');
import * as AuthApi from './api/AuthApi';
import * as AuthService from './service/AuthService'

const app: express.Application = express();
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
// Add endpoints concerning authentication
app.post("/api/login", AuthApi.login);
app.get("/api/logout", AuthApi.logout);
app.get("/api/user", AuthService.middleware, AuthApi.getUser);

app.listen(port);
console.log('Server started! see: http://localhost:' + port);