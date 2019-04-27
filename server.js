let express = require('express'),
    app = express(),
    port;

// Read port from the environment variables. If there is no environment variable specifying the port, use the default port.
require('dotenv').config();
if (process.env.PORT) {
    port = process.env.PORT;
} else {
    // Default port is 3000.
    port = 3000;
}

app.use(express.static(__dirname + '/dist'));

app.listen(port);
console.log('Application started! see: http://localhost:' + port);
