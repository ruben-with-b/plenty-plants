import express = require('express');
import dotenv = require('dotenv');
import cookieSession = require('cookie-session');
import bodyParser = require('body-parser');
import passport = require('passport');
import LocalStrategy = require('passport-local');
import * as DemoTable from './database/demo-table';

const app: express.Application = express();
dotenv.config();
let port: string;
let distFolder: string;
let devModeEnabled: boolean;

// Fetch some environment variables
if(process.env.PORT_BE) {
    port = process.env.PORT_BE;
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

// Deploy frontend?
if(!devModeEnabled) {
    app.use(express.static(__dirname + distFolder));
}

// Add libs for authentication
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure authentication
passport.use(
    new LocalStrategy.Strategy(
        {
            usernameField: "email",
            passwordField: "password"
        },

        (username, password, done) => {
            let user = users.find((user) => {
                return user.email === username && user.password === password
            });

            if (user) {
                done(null, user)
            } else {
                done(null, false, { message: 'Incorrect username or password'})
            }
        }
    )
);
passport.serializeUser((user: User, done) => {
    done(null, user.id)
});
passport.deserializeUser((id, done) => {
    let user = users.find((user) => {
        return user.id === id
    });

    done(null, user)
});

// TODO fetch users from DB ---------------------------------------------------
class User {
    constructor(
        public id: number,
        public  name: string,
        public email: string,
        public password: string) {
    }
}

let users = [
    new User(1, "Ronja", "mail@ronja-weber.de", "password"),
    new User(2, "Ruben", "ruben.santoro@hs-augsburg.de", "password"),
    new User(3, "Rudi", "rudi.loderer@outlook.de", "passwordx"),
];
// ----------------------------------------------------------------------------

// Create middleware to protect endpoints
const authMiddleware = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
};

// Add endpoints concerning authentication
app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).send([user, "Cannot log in", info]);
        }

        req.login(user, err => {
            res.send("Logged in");
        });
    })(req, res, next);
});

app.get("/api/logout", function(req, res) {
    req.logout();

    console.log("logged out");

    return res.send();
});

app.get("/api/user", authMiddleware, (req: any, res: any) => {
    let user = users.find(user => {
        return user.id === req.session.passport.user
    });

    console.log([user, req.session]);

    res.send({ user: user });
});

app.get('/api', DemoTable.getDemos);

app.listen(port); 
console.log('Server started! see: http://localhost:' + port);