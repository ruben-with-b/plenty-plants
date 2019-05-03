import express = require('express');
import dotenv = require('dotenv');
import * as DemoTable from './database/demo-table'

const app: express.Application = express();
dotenv.config();
let port: string;
let distFolder: string;
let devModeEnabled: boolean;

if(process.env.PORT_SERVER) {
    port = process.env.PORT_SERVER;
} else {
    throw new Error("Environment variable PORT_SERVER undefined!");
}
if(process.env.DIST_FOLDER) {
    distFolder = process.env.DIST_FOLDER;
} else {
    throw new Error("Environment variable DIST_FOLDER undefined!");
}
if(process.env.DEV_MODE_ENABLED) {
    devModeEnabled = (process.env.DEV_MODE_ENABLED === 'true');
} else {
    throw new Error("Environment variable DEV_MODE_ENABLED undefined!");
}

if(devModeEnabled) {

} else {
    app.use(express.static(__dirname + distFolder));
}

app.get('/api', DemoTable.getDemos);

app.listen(port); 
console.log('Server started! see: http://localhost:' + port);