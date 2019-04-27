import express = require("express");
import dotenv = require("dotenv");
import * as DemoTable from "./database/demo-table"

const app: express.Application = express();
let port: string;

// Load environment variables.
dotenv.config();

// Fetch the port from the environment variables. If the port is not defined
// in the environment variables, the default port (3000) is used.
if(process.env.PORT) {
    port = process.env.PORT;
} else {
    port = "3000";
}

app.use(express.static(__dirname + "/../dist"));

app.get("/api", DemoTable.getDemos);

app.listen(port); 
console.log("Application started! see: http://localhost:" + port); 